<script lang="ts">
	import { getMonthName, type Year } from '$lib/model';
	import MonthView from './MonthView.svelte';

	let { year }: { year: Year } = $props();
</script>

<div id="year-wrapper">
	{#each year.months as month, monthIdx}
		{#if month}
			<MonthView {month} label={getMonthName(monthIdx + 1)} />
		{:else}
			<div class="empty-month"></div>
		{/if}
	{/each}
</div>

<style>
	#year-wrapper {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: var(--margin-xl);
	}

	@media only screen and (max-width: 900px) {
		#year-wrapper {
			gap: var(--margin-md);
		}
	}

	.empty-month {
		width: 100%;
		height: 100%;
	}
</style>
