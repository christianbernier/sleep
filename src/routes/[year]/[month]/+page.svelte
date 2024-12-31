<script lang="ts">
	import type { Day } from '$lib';
	import Calendar from '$lib/components/Calendar.svelte';
	import DayDetails from '$lib/components/DayDetails.svelte';
	import HighlightBox from '$lib/components/HighlightBox.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import Message from '$lib/components/Message.svelte';
	import MonthBar from '$lib/components/MonthBar.svelte';

	export let data;

	let selectedDate: Day | undefined = undefined;
</script>

<svelte:head>
	<title>Sleep data for {data.monthDisplayString}</title>
</svelte:head>
<div>
	<HighlightBox>
		<MonthBar
			currentMonthDisplayString={data.monthDisplayString}
			currentYear={data.year}
			previousMonthLink={data.previousMonthLink}
			nextMonthLink={data.nextMonthLink}
		/>
		{#await data.monthData}
			<Message message={`Loading sleep data for ${data.monthDisplayString}...`} />
		{:then month}
			{#if month}
				<Calendar
					{month}
					onSelectDate={(weekIdx, dayIdx) => (selectedDate = month.weeks[weekIdx][dayIdx])}
				/>
			{:else}
				<Message message="There was an error with retrieving the month's sleep data." />
			{/if}
		{/await}
	</HighlightBox>

	{#if selectedDate}
		<DayDetails day={selectedDate} />
	{/if}
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		gap: var(--margin-lg);
		width: 100%;
		justify-content: center;
	}

	@media only screen and (max-width: 900px) {
		div {
			flex-direction: column;
		}
	}
</style>
