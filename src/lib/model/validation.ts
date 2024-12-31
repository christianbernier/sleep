/**
 * Returns whether the provided input can represent a valid year.
 * @param maybeYear the possible year to analyze
 * @returns Whether `maybeYear` can be cast to a valid year (for which
 * there is data) using {@link Number.parseInt}.
 */
export function isValidYear(maybeYear: string): boolean {
	const year = Number.parseInt(maybeYear);

	if (Number.isNaN(year)) {
		return false;
	} else if (year < 2019 || year > 2024) {
		return false;
	}

	return true;
}

/**
 * Returns whether the provided input can represent a valid month.
 * @param maybeMonth the possible month to analyze
 * @returns Whether `maybeMonth` can be cast to a valid month index
 * (1-12) using {@link Number.parseInt}.
 */
export function isValidMonth(maybeMonth: string): boolean {
	const month = Number.parseInt(maybeMonth);

	if (Number.isNaN(month)) {
		return false;
	} else if (month < 1 || month > 12) {
		return false;
	}

	return true;
}

/**
 * Checks whether data exists for the provided month.
 * @param fetch the method to use to call the API
 * @param year the year of the month
 * @param month the month index (1-12), but also 0 will be corrected to 12 the previous
 * year and 13 will be corrected to 1 the next year
 * @returns A promise that will resolve to the link to the month's page, or undefined
 * if that month has no data.
 */
export async function monthLink(
	fetch: {
		(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
		(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
	},
	year: number,
	month: number
) {
	if (month === 0) {
		month = 12;
		year--;
	} else if (month === 13) {
		month = 1;
		year++;
	}

	const monthSearchParams = new URLSearchParams({
		year: year.toString(),
		month: month.toString()
	});

	const res = await fetch(`/api/hasData?${monthSearchParams.toString()}`);

	return res.ok ? `/${year}/${month}` : undefined;
}
