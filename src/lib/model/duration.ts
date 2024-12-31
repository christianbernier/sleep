import type { Range } from "./range";

/**
 * Represents a duration of time, in hours and minutes.
 */
export interface Duration {
  hours: number;
  minutes: number;
}

/**
 * Calculates the number of minutes in the provided duration.
 * @param duration the duration of time
 * @returns The total number of minutes in the provided duration.
 */
export function durationInMinutes(duration: Duration) {
  return duration.hours * 60 + duration.minutes;
}

/**
 * Compares two durations.
 * @param d1 the first duration
 * @param d2 the second duration
 * @returns A positive number if `d1` represents more time than `d2`,
 * zero if `d1` and `d2` represent the same amount of time, and a negative
 * number if `d1` represents less time than `d2`.
 */
export function durationComparator(d1: Duration, d2: Duration) {
  const d1Minutes = durationInMinutes(d1);
  const d2Minutes = durationInMinutes(d2);
  return d1Minutes - d2Minutes;
}

/**
 * Calculates the percentage of a duration range this duration represents.
 * @param duration the duration to be converted into a percentage
 * @param range the range on which to base the percentage
 * @returns A number between 0 and 1 (assuming the duration is within the range bounds)
 * representing the fraction of the way from the range min to the range max the provided
 * duration represents.
 */
export function getDurationFractionOfRange(duration: Duration, range: Range<Duration>) {
  return (durationInMinutes(duration) - durationInMinutes(range.min)) / (durationInMinutes(range.max) - durationInMinutes(range.min));
}

/**
 * Gets a user-friendly string to display a duration. Does not display the minutes if it
 * is exactly 0.
 * @param duration the duration to display
 * @returns A string such as "6h 32m" for 6 hours, 32 minutes.
 */
export function getDurationString(duration: Duration) {
  if (duration.hours === 0) {
    return `${duration.minutes}m`;
  }

  return `${duration.hours}h ${duration.minutes}m`;
}
