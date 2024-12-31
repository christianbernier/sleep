import { error, json } from '@sveltejs/kit';
import { type Month, type Year } from '$lib';
import { isValidYear } from '$lib/model/validation.js';

export async function GET({ fetch, params }) {
  if (!isValidYear(params.id)) {
    error(400, { message: 'Invalid year.' })
  }

  const year = Number.parseInt(params.id);
  const months: Array<Month | undefined> = [];
  let atLeastOneOk = false;
  for (let i = 0; i < 12; i++) {
    const monthSearchParams = new URLSearchParams({
      'year': year.toString(),
      'month': (i + 1).toString(),
    })
    let month = await fetch(`/api/month?${monthSearchParams.toString()}`);
    if (month.ok) {
      atLeastOneOk = true;
      months.push(await month.json()); 
    } else {
      months.push(undefined);
    }
  }

  if (!atLeastOneOk) {
    error(404, { message: 'No data found for year.' })
  }

  return json({
    months,
  } satisfies Year);
}