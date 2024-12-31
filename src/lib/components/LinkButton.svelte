<script lang="ts">
	import type { Snippet } from "svelte";

  let {
    children,
    href = undefined,
    disabled = false,
  } : {
    children?: Snippet,
    href?: string | undefined,
    disabled?: boolean,
  } = $props();
</script>

<a
  {href}
  class={disabled ? 'disabled' : ''}
>
  {@render children?.()}
</a>

<style>
  a {
    background-color: var(--dark);
    color: var(--light);
    padding: var(--margin-md);
    border-radius: var(--border-xl);

    font-family: var(--sans-serif);
    text-decoration: none;
  }

  a.disabled {
    background-color: #4d4d4d;
    cursor: not-allowed;
  }
</style>
