import { error, json } from '@sveltejs/kit';
import { durationComparator, timeComparator, type Day, type Month } from '$lib';
import { isValidMonth, isValidYear } from '$lib/model/validation.js';
import {
	assertFileExists,
	createRange,
	getFilename,
	parseFile,
	parseWeeksFromDays
} from '$lib/server';

export async function GET({ url }) {
	const monthParam = url.searchParams.get('month') || '';
	const yearParam = url.searchParams.get('year') || '';

	if (!isValidYear(yearParam)) {
		error(400, { message: 'Invalid year.' });
	}

	if (!isValidMonth(monthParam)) {
		error(400, { message: 'Invalid month.' });
	}

	const year = Number.parseInt(yearParam);
	const month = Number.parseInt(monthParam);
	const filename = getFilename(year, month);

	assertFileExists(filename);

	const days = await parseFile(filename);

	// calculate the ranges for this month
	const inBedRange = createRange(days, (day: Day) => day.inBedTime, timeComparator);
	const wakeUpRange = createRange(days, (day: Day) => day.wakeUpTime, timeComparator);
	const asleepDurationRange = createRange(
		days,
		(day: Day) => day.asleepDuration,
		durationComparator
	);

	const weeks: Array<Array<Day | undefined>> = parseWeeksFromDays(days);

	return json({
		month,
		year,
		weeks,
		inBedRange,
		wakeUpRange,
		asleepDurationRange
	} satisfies Month);
}
