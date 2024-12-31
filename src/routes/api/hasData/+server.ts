import { error, json } from '@sveltejs/kit';
import { isValidMonth, isValidYear } from '$lib/model/validation.js';
import { assertFileExists, getFilename } from '$lib/server';

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

	return json({
		result: true
	});
}
