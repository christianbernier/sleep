<script lang="ts">
	import {
		ComparisonMode,
		getDayComparisonMetric,
		getGradientForMode,
		getMonthGradientParameters,
		type Month
	} from '$lib/model';
	import { getContext } from 'svelte';
	import Gradient from './Gradient.svelte';

	let {
		month,
		onSelectDate = () => undefined,
		mini = false
	}: {
		month: Month;
		onSelectDate?: (weekIdx: number, dayIdx: number) => void;
		mini?: boolean;
	} = $props();

	let selectedWeekIdx = $state(-1);
	let selectedDayIdx = $state(-1);
	const comparisonMode: () => ComparisonMode = getContext('comparisonMode');

	function select(weekIdx: number, dayIdx: number) {
		if (mini) {
			return;
		}

		selectedWeekIdx = weekIdx;
		selectedDayIdx = dayIdx;
		onSelectDate(weekIdx, dayIdx);
	}
</script>

<div class={`wrapper ${mini ? 'mini' : ''}`}>
	<table>
		{#if !mini}
			<thead>
				<tr>
					{#each ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as dayOfWeek}
						<th>{dayOfWeek}</th>
					{/each}
				</tr>
			</thead>
		{/if}
		<tbody>
			{#each month.weeks as week, weekIdx}
				<tr>
					{#each week as day, dayIdx}
						{#if day}
							<td>
								{#if mini}
									<div
										class="day-box"
										style={`background-color: ${getGradientForMode(comparisonMode())(getDayComparisonMetric(day, comparisonMode()))};`}
									></div>
								{:else}
									<button
										class={`
                      day-box
                      ${selectedWeekIdx === weekIdx && selectedDayIdx === dayIdx ? 'day-selected' : ''}
                    `}
										onclick={() => select(weekIdx, dayIdx)}
										title={day.note || undefined}
										style={`background-color: ${getGradientForMode(comparisonMode())(getDayComparisonMetric(day, comparisonMode()))};`}
									>
										{day.date}
									</button>
								{/if}
								{#if day.note && !mini}
									<div class="day-with-note"></div>
								{/if}
							</td>
						{:else}
							<td> </td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	{#if !mini}
		<Gradient
			gradient={getGradientForMode(comparisonMode())}
			params={getMonthGradientParameters(month, comparisonMode())}
		/>
	{/if}
</div>

<style>
	.wrapper {
		--cal-width: min(70vw, 400px);
		display: flex;
		flex-direction: column;
		align-items: center;
		width: var(--cal-width);
		gap: var(--margin-md);
	}

	.mini.wrapper {
		--cal-width: min(18vw, 100px);
		gap: 0;
	}

	table {
		width: 100%;
		--cal-gap: var(--margin-md);
		border-spacing: var(--cal-gap) var(--cal-gap);
	}

	.mini table {
		--cal-gap: calc(var(--cal-width) / 40);
	}

	th {
		font-weight: normal;
	}

	td {
		position: relative;
		padding: 0;
		--cal-cell-size: calc((var(--cal-width) - 6 * var(--cal-gap)) / 7);
		width: var(--cal-cell-size);
	}

	.day-box {
		width: 100%;
		text-align: center;
		font-family: var(--sans-serif);
		aspect-ratio: 1;
		color: var(--light);
		border-radius: var(--border-xl);
		border-width: 0;
		outline: var(--border-xs) solid var(--dark);
		cursor: pointer;
	}

	.mini .day-box {
		border-radius: var(--border-lg);
		outline: none;
	}

	.day-selected {
		outline-width: var(--border-sm) !important;
	}

	.day-with-note {
		--cal-note-size: calc(var(--cal-cell-size) / 4);
		--cal-note-offset: calc(-1 * var(--cal-note-size) / 2);
		position: absolute;
		width: var(--cal-note-size);
		height: var(--cal-note-size);
		top: var(--cal-note-offset);
		right: var(--cal-note-offset);
		background: #e90707;
		border-radius: var(--cal-note-size);
	}
</style>
