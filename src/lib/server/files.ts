import type { Day } from "$lib";
import { error } from "@sveltejs/kit";
import { createReadStream, existsSync } from "node:fs";
import { convertRowIntoDay, type AutoSleepCsvRow } from "./csv";
import * as csv from 'fast-csv';

/**
 * Gets the filename for a specific year/month combination.
 * @param year the year of the month
 * @param month the month index (1-12) of the month
 * @returns A path to where the file should exist for that specific month.
 */
export function getFilename(year: number, month: number) {
  return `static/data/${year}/${year}-${month.toString().padStart(2, '0')}.csv`;
}

/**
 * Checks if a file with the provided filename exists.
 * @param filename the path to the file
 */
export function assertFileExists(filename: string) {
  const doesExist = existsSync(filename);

  if (!doesExist) {
    error(404, `File not found: ${filename}.`);
  }
}

/**
 * Parses a file with the provided filename into a list of {@link Day}s.
 * @param filename the path to the file
 * @returns A promise which will resolve to the list of {@link Day} objects,
 * or reject if an error is encountered.
 */
export function parseFile(filename: string) {
  return new Promise<Array<Day>>((resolve, reject) => {
    const rows: Array<Day> = [];
    createReadStream(filename)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', (row: AutoSleepCsvRow) => rows.push(convertRowIntoDay(row)))
      .on('end', () => resolve(rows));
  });
}
