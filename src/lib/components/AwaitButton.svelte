<script lang="ts">
	import LinkButton from "./LinkButton.svelte";

  let { href, text } : { href: Promise<string | undefined>, text: string } = $props();
</script>

{#await href}
  <LinkButton disabled>{text}</LinkButton>
{:then resolvedHref}
  <LinkButton
    href={resolvedHref}
    disabled={!resolvedHref}
  >{text}</LinkButton>
{/await}
