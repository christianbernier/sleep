<script lang="ts">
	import { page } from "$app/stores";
	import HighlightBox from "$lib/components/HighlightBox.svelte";
	import LinkButton from "$lib/components/LinkButton.svelte";


	import Message from "$lib/components/Message.svelte";

</script>

<HighlightBox>
  <h2>There was an error!</h2>
  <Message message={`Error: ${$page.error?.message || 'Unknown error'}`} />
  <LinkButton href='/'>Go home</LinkButton>
</HighlightBox>
