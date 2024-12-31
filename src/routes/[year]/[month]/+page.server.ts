import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMonthName, type Month } from '$lib';
import { isValidMonth, isValidYear, monthLink } from '$lib/model/validation';

export const load = (async (
	event
): Promise<{
	year: number;
	monthDisplayString: string;
	previousMonthLink: Promise<string | undefined>;
	nextMonthLink: Promise<string | undefined>;
	monthData: Promise<Month | undefined>;
}> => {
	if (!isValidYear(event.params.year)) {
		error(400, { message: 'Invalid year.' });
	}

	if (!isValidMonth(event.params.month)) {
		error(400, { message: 'Invalid month.' });
	}

	const year = Number.parseInt(event.params.year);
	const month = Number.parseInt(event.params.month);

	const monthDisplayString = `${getMonthName(month)} ${year}`; // something like "December 2024"

	const urlParams = new URLSearchParams({
		year: year.toString(),
		month: month.toString()
	});

	return {
		year,
		monthDisplayString,
		previousMonthLink: monthLink(event.fetch, year, month - 1),
		nextMonthLink: monthLink(event.fetch, year, month + 1),
		monthData: event.fetch(`/api/month?${urlParams.toString()}`).then((data) => {
			if (!data.ok) {
				return new Promise((resolve) => resolve(undefined));
			}
			return data.json();
		})
	};
}) satisfies PageServerLoad;
