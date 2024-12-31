import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { type Year } from '$lib';
import { isValidYear } from '$lib/model/validation';

export const load = (async (
	event
): Promise<{
	year: number;
	yearData: Promise<Year | undefined>;
}> => {
	if (!isValidYear(event.params.year)) {
		error(400, { message: 'Invalid year.' });
	}

	const year = Number.parseInt(event.params.year);

	return {
		year,
		yearData: event.fetch(`/api/year/${year}`).then((data) => {
			if (!data.ok) {
				return new Promise((resolve) => resolve(undefined));
			}
			return data.json();
		})
	};
}) satisfies PageServerLoad;
