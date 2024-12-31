import type { Day, Range } from "$lib/model";

/**
 * Converts a list of days into a list of weeks, each of which start with a Monday.
 * If there should be a gap, `undefined` in inserted.
 * @param days the list of days to be converted into weeks, expected from a single month
 * @returns A 2D array, representing weeks of the provided days. Starting with the first
 * entry in `days`, adds days or undefined (if a day is missing) until either the date
 * 31 is reached or `days` runs out of elements.
 */
export function parseWeeksFromDays(days: Array<Day>): Array<Array<Day | undefined>> {
  const weeks: Array<Array<Day | undefined>> = [[]];

  const firstDay = new Date(days[0].iso); // first day with data, not necessarily the first of the month

  // adds the number of gaps so the first day lines up with the correct weekday
  let paddedDays: Array<Day | undefined> = Array((firstDay.getDay() + 6) % 7).map(_ => undefined);

  let daysIdx = 0; // where are we in the list of days?

  // going from the first date to 31 (max date in a month), check if the next entry in days gives
  // us that date. if it does, add it to the list of days. otherwise, there was a gap, so add an undefined
  // and move on to the next date.
  for (let date = firstDay.getDate(); date <= 31 && daysIdx < days.length; date++) {
    const nextDate = new Date(days[daysIdx].iso).getDate();
    if (nextDate === date) {
      paddedDays.push(days[daysIdx++])
    } else {
      paddedDays.push(undefined)
    }
  }

  // divide days into an array of 7-day weeks
  while (paddedDays.length > 0) {
    weeks.push(paddedDays.splice(0, 7))
  }

  return weeks;
}

/**
 * From a list of days, extracts the range of some quantity, depending on the provided selector.
 * @param T the type of {@link Range} to extract
 * @param days the list of days
 * @param selector a function that selects the quantity from a day object
 * @param comparator a function which can compare two objects of type `T`
 * @returns A {@link Range} represented in the list of days for the quantity specified by the selector.
 * @throws if `days` is empty
 */
export function createRange<T extends object>(
  days: Array<Day>, 
  selector: (day: Day) => T | null | undefined, 
  comparator: (t1: T, t2: T) => number
): Range<T> {
  const sortedArray = days
    .map(selector)
    .filter((a: T | null | undefined) => !!a);
    sortedArray.sort(comparator);

  if (sortedArray.length === 0) {
    throw new Error('Tried to get range of empty list.');
  }

  return {
    min: sortedArray.at(0)!,
    max: sortedArray.at(-1)!,
  } satisfies Range<T>;
}
