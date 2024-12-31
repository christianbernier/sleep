import { ComparisonMode } from './comparisonMode';
import { durationInMinutes, type Duration } from './duration';
import { minutesPast9pm, type Time } from './time';

/**
 * Represents a single day of sleep data.
 */
export interface Day {
	displayString: string; // user-friendly string, like "Saturday, December 28, 2024"
	iso: string; // ISO string representing a time within this day
	date: number; // date number within the month of when this night ended
	inBedTime: Time | null; // time asleep; null for non-sleep nights
	wakeUpTime: Time | null; // time awoken; null for non-sleep nights
	asleepDuration: Duration; // amount of time slept
	note?: string; // anomaly explained (optional)
}

/**
 * Gets a numeric value representing this day based on the comparison mode.
 * @param day the day whose value to get
 * @param mode the type of value to get, depending on the comparison mode
 * @returns A number representing the appropriate value on the scale for the
 * provided comparison mode. For instance, gets the asleep duration in minutes
 * if the comparison mode is `ComparisonMode.ASLEEP_DURATION`.
 */
export function getDayComparisonMetric(day: Day, mode: ComparisonMode) {
	switch (mode) {
		case ComparisonMode.IN_BED_TIME:
			return minutesPast9pm(day.inBedTime);
		case ComparisonMode.WAKE_UP_TIME:
			return minutesPast9pm(day.wakeUpTime);
		case ComparisonMode.ASLEEP_DURATION:
			return durationInMinutes(day.asleepDuration);
	}
}
