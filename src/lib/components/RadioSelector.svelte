<script lang="ts" generics="T">
	let {
		title = '',
		name,
		options,
		selected = $bindable()
	}: {
		title?: string;
		name: string;
		options: Array<{ value: T; label: string }>;
		selected: T;
	} = $props();

	function getIdForLabel(label: string) {
		return label.toLowerCase().split(/\W/g).join('_');
	}
</script>

<div class="wrapper">
	<p>{title}</p>
	<div class="options">
		{#each options as option}
			<input
				type="radio"
				{name}
				value={option.value}
				id={getIdForLabel(option.label)}
				onclick={() => (selected = option.value)}
				checked={selected === option.value}
			/>
			<label for={getIdForLabel(option.label)} class={selected === option.value ? 'selected' : ''}>
				{option.label}
			</label>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--margin-sm);
	}

	p {
		padding: 0;
		margin: 0;
	}

	.options {
		border: var(--border-xs) solid var(--light);
		border-radius: var(--margin-xl);
		display: flex;
		flex-direction: row;
		overflow: hidden;
	}

	input {
		display: none;
	}

	label {
		padding: var(--margin-sm) var(--margin-md);
		color: var(--light);
		background-color: var(--dark);
	}

	label.selected {
		background-color: var(--light);
		color: var(--dark);
	}
</style>
