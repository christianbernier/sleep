<script lang="ts">
	import AwaitButton from './AwaitButton.svelte';
	import LinkButton from './LinkButton.svelte';

	let {
		previousMonthLink,
		nextMonthLink,
		currentMonthDisplayString,
		currentYear
	}: {
		previousMonthLink: Promise<string | undefined>;
		nextMonthLink: Promise<string | undefined>;
		currentMonthDisplayString: string;
		currentYear: number;
	} = $props();
</script>

<div>
	<AwaitButton href={previousMonthLink} text="Last" />
	<LinkButton href={`/${currentYear}`}>{currentMonthDisplayString}</LinkButton>
	<AwaitButton href={nextMonthLink} text="Next" />
</div>

<style>
	div {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>
