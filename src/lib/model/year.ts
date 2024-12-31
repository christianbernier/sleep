import type { Month } from "./month";

/**
 * Represents sleep data for a given year.
 */
export interface Year {
  months: Array<Month | undefined>;
}
