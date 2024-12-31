<script lang="ts">
	let {
		emoji,
		label,
		emojiHint = ''
	}: {
		emoji: string;
		label: string;
		emojiHint?: string;
	} = $props();
</script>

<p>
	<span title={emojiHint}>{emoji}</span>
	{label}
</p>

<style>
	p {
		font-size: var(--font-md);
		display: flex;
		align-items: center;
		gap: var(--margin-md);
	}

	span {
		font-size: 2rem;
		cursor: default;
	}
</style>
