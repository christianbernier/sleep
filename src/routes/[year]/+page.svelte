<script lang="ts">
	import HighlightBox from '$lib/components/HighlightBox.svelte';
	import Message from '$lib/components/Message.svelte';
	import YearBar from '$lib/components/YearBar.svelte';
	import YearView from '$lib/components/YearView.svelte';

	export let data;
</script>

<svelte:head>
	<title>Sleep data for {data.year}</title>
</svelte:head>
<HighlightBox>
	<YearBar year={data.year} />
	{#await data.yearData}
		<Message message={`Loading sleep data for ${data.year}...`} />
	{:then year}
		{#if year}
			<YearView {year} />
		{:else}
			<Message message="There was an error with retrieving the year's sleep data." />
		{/if}
	{/await}
</HighlightBox>
