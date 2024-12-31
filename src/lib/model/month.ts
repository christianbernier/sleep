import { ComparisonMode } from './comparisonMode';
import type { Day } from './day';
import { durationInMinutes, getDurationString, type Duration } from './duration';
import type { GradientParameters } from './gradient';
import type { Range } from './range';
import { getTimeString, minutesPast9pm, type Time } from './time';

/**
 * Represents a specific month's worth of sleep data.
 */
export interface Month {
	year: number; // what year is this month in?
	month: number; // which month (1-12) is this?
	weeks: Array<Array<Day | undefined>>; // sleep data, divided into weeks
	// (undefined represents no sleep or a gap)
	inBedRange: Range<Time>; // extrema for the bedtime
	wakeUpRange: Range<Time>; // extrema for the wake time
	asleepDurationRange: Range<Duration>; // extrema for the sleep duration
}

/**
 * Gets the user-friendly name of a month.
 * @param monthIndex index of the month, from 1 for January to 12 for December
 * @returns A user-friendly string like "January".
 */
export function getMonthName(monthIndex: number) {
	const dateTimeFormat = new Intl.DateTimeFormat('en-US', { month: 'long' });
	const date = new Date(Date.UTC(2024, (monthIndex - 1) % 12, 15));
	return dateTimeFormat.format(date);
}

/**
 * Gets the gradient parameters for the provided month, based on the comparison mode.
 * @param month the month to analyze
 * @param mode the mode in which to analyze
 * @returns A {@link GradientParameters} object representing the numeric versions of the
 * extrema of this month, using the correct range based on the comparison mode.
 */
export function getMonthGradientParameters(month: Month, mode: ComparisonMode): GradientParameters {
	switch (mode) {
		case ComparisonMode.IN_BED_TIME:
			return {
				minValue: minutesPast9pm(month.inBedRange.min),
				maxValue: minutesPast9pm(month.inBedRange.max),
				minLabel: getTimeString(month.inBedRange.min),
				maxLabel: getTimeString(month.inBedRange.max)
			};
		case ComparisonMode.WAKE_UP_TIME:
			return {
				minValue: minutesPast9pm(month.wakeUpRange.min),
				maxValue: minutesPast9pm(month.wakeUpRange.max),
				minLabel: getTimeString(month.wakeUpRange.min),
				maxLabel: getTimeString(month.wakeUpRange.max)
			};
		case ComparisonMode.ASLEEP_DURATION:
			return {
				minValue: durationInMinutes(month.asleepDurationRange.min),
				maxValue: durationInMinutes(month.asleepDurationRange.max),
				minLabel: getDurationString(month.asleepDurationRange.min),
				maxLabel: getDurationString(month.asleepDurationRange.max)
			};
	}
}
