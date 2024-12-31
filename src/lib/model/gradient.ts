import chroma from 'chroma-js';
import { ComparisonMode } from './comparisonMode';
import { Color } from './color';

/**
 * Represents the values and labels for the extremes of a gradient.
 */
export interface GradientParameters {
	minValue: number;
	maxValue: number;
	minLabel: string;
	maxLabel: string;
}

const inBedTimeGradient = chroma
	.scale([Color.BLACK, Color.BLUE, Color.GREEN, Color.RED, Color.BLACK, Color.BLACK])
	//       no time      9pm         12am         3am        9am          9pm
	.domain([-1, 0, 180, 360, 720, 1440]) // in minutes after 9pm
	.mode('hsl');

const wakeUpTimeGradient = chroma
	.scale([Color.BLACK, Color.BLACK, Color.BLUE, Color.GREEN, Color.PINK, Color.BLACK])
	//       no time      9pm          6am         9am          12pm        9pm
	.domain([-1, 0, 540, 720, 900, 1440]) // in minutes after 9pm
	.mode('hsl');

const asleepDurationGradient = chroma
	.scale([Color.BLACK, Color.RED, Color.YELLOW, Color.GREEN, Color.BLUE, Color.PINK])
	.domain([0, 240, 420, 540, 720, 1440]) // in minutes
	.mode('hsl');

/**
 * Gets the appropriate gradient for the comparison mode.
 * @param mode the comparison mode
 * @returns One of the pre-selected gradients, based on the mode.
 */
export function getGradientForMode(mode: ComparisonMode) {
	switch (mode) {
		case ComparisonMode.IN_BED_TIME:
			return inBedTimeGradient;
		case ComparisonMode.WAKE_UP_TIME:
			return wakeUpTimeGradient;
		case ComparisonMode.ASLEEP_DURATION:
			return asleepDurationGradient;
	}
}
