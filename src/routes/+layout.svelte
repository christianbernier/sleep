<script lang="ts">
	import { ComparisonMode } from '$lib';
	import RadioSelector from '$lib/components/RadioSelector.svelte';
	import { setContext, type Snippet } from 'svelte';

	let { children, comparisonMode }: { children?: Snippet; comparisonMode: ComparisonMode } =
		$props();
	setContext('comparisonMode', () => comparisonMode);

	$effect(() => {
		comparisonMode = ComparisonMode.ASLEEP_DURATION;
	});
</script>

<div id="page-wrapper">
	<RadioSelector
		title="Color nights based on..."
		name="formatting"
		options={[
			{ value: ComparisonMode.ASLEEP_DURATION, label: 'Time Asleep' },
			{ value: ComparisonMode.IN_BED_TIME, label: 'Bedtime' },
			{ value: ComparisonMode.WAKE_UP_TIME, label: 'Wake time' }
		]}
		bind:selected={comparisonMode}
	/>
	<div id="child-wrapper">
		{@render children?.()}
	</div>
</div>

<style>
	#page-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--margin-lg);
	}

	#child-wrapper {
		width: min(80%, 1000px);
		display: flex;
		flex-direction: row;
		gap: var(--margin-lg);
		justify-content: center;
	}
</style>
