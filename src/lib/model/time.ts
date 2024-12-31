import type { Range } from './range';

/**
 * Represents a time of day according to its hours, minutes, and meridiem
 * (either AM or PM).
 */
export interface Time {
	hour: number;
	minute: number;
	meridiem: 'am' | 'pm';
}

/**
 * Extracts the time information from a JavaScript {@link Date} object.
 * @param date the JavaScript {@link Date} object to extract the time from,
 * or `undefined` for a null time.
 * @returns A {@link Time} object representing the time of the date provided,
 * or `null` if the provided date is undefined.
 */
export function getTimeFromDate(date: Date | undefined): Time | null {
	if (!date) {
		return null;
	}

	let hour = date.getHours() % 12;

	if (hour === 0) {
		hour = 12;
	}

	return {
		hour,
		minute: date.getMinutes(),
		meridiem: date.getHours() < 12 ? 'am' : 'pm'
	} satisfies Time;
}

/**
 * Calculates the number of minutes the provided time is past 9pm. If the time
 * could be interpreted as the same day before 9pm, assumes it is the next day.
 * @param time the time whose minutes past 9pm should be calculated, or `null`
 * for an invalid time measurement
 * @returns The number of minutes from 9pm to the provided time, assuming the
 * provided time is either 9pm (in which case 0 will be returned) or occurs after
 * 9pm (so something like 12pm assumes noon the following day). Returns -1 if a
 * `null` time was provided.
 */
export function minutesPast9pm(time: Time | null): number {
	if (time === null) {
		return -1;
	}

	if (time.meridiem === 'pm' && time.hour >= 9 && time.hour < 12) {
		// between 9pm and midnight, so just count those minutes
		return (time.hour - 9) * 60 + time.minute;
	} else if (time.meridiem === 'am') {
		// between midnight and 11:59am
		// count the three hours from 9pm to midnight and extra hours
		return 3 * 60 + (time.hour % 12) * 60 + time.minute;
	} else {
		// between noon and 8:59pm
		// count the fifteen hours from 9pm to noon and extra hours
		return 15 * 60 + (time.hour % 12) * 60 + time.minute;
	}
}

/**
 * Compares two times, measured past 9pm.
 * @see {@link minutesPast9pm} for information about "past 9pm"
 * @param t1 the first time
 * @param t2 the second time
 * @returns A positive number if `t1` represents more minutes past 9pm
 * than `t2`, zero if `t1` and `t2` represent the same number of minutes
 * past 9pm, and a negative number if `t1` represents fewer minutes past
 * 9pm than `t2`.
 */
export function timeComparator(t1: Time | null, t2: Time | null) {
	const t1Minutes = minutesPast9pm(t1);
	const t2Minutes = minutesPast9pm(t2);
	return t1Minutes - t2Minutes;
}

/**
 * Calculates the percentage of a time range this time represents.
 * @param time the time to be converted into a percentage
 * @param range the range on which to base the percentage
 * @returns A number between 0 and 1 (assuming the time is within the range bounds)
 * representing the fraction of the way from the range min to the range max the provided
 * time represents. The numeric value of times is based on the "past 9pm" principle.
 * @see {@link minutesPast9pm} for information about "past 9pm"
 */
export function getTimeFractionOfRange(time: Time, range: Range<Time>) {
	return (
		(minutesPast9pm(time) - minutesPast9pm(range.min)) /
		(minutesPast9pm(range.max) - minutesPast9pm(range.min))
	);
}

/**
 * Gets a user-friendly string to display a time.
 * @param time the time to display
 * @returns A string such as "8:02pm".
 */
export function getTimeString(time: Time) {
	const minuteStr = time.minute.toString().padStart(2, '0');
	return `${time.hour}:${minuteStr}${time.meridiem}`;
}
