import { existsSync } from 'node:fs';
import type { PageServerLoad } from './$types';
import { getFilename } from '$lib/server';
import { redirect } from '@sveltejs/kit';

/**
 * Starting from now, find the last month for which sleep data exists.
 */
export const load = (async () => {
	const now = new Date();
	let year = now.getFullYear();
	let month = now.getMonth() + 1;

	let filename = getFilename(year, month);
	while (!existsSync(filename)) {
		month--;

		if (month === 0) {
			year--;
			month = 12;
		}

		filename = getFilename(year, month);
	}

	redirect(302, `/${year}/${month}`);
}) satisfies PageServerLoad;
