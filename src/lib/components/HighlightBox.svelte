<script lang="ts">
	import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<div>
  {@render children?.()}
</div>

<style>
  div {
    background-color: var(--light);
    color: var(--dark);
    display: flex;
    flex-direction: column;
    gap: var(--margin-lg);
    align-items: center;
    border-radius: var(--border-xl);
    padding: var(--margin-lg);
  }
</style>
