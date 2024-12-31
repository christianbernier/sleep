<script lang="ts">
	import { getDurationString, getTimeString, type Day } from "$lib/model";
	import EmojiText from "./EmojiText.svelte";

  let { day } : { day: Day } = $props();
</script>

<div class="container">
  <h2>{day.displayString}</h2>
  <EmojiText emoji="😴" emojiHint="Bedtime" label={day.inBedTime ? getTimeString(day.inBedTime) : '—'} />
  <EmojiText emoji="⏰" emojiHint="Wake time" label={day.wakeUpTime ? getTimeString(day.wakeUpTime) : '—'} />
  <EmojiText emoji="⏱️" emojiHint="Time asleep" label={getDurationString(day.asleepDuration)} />
  
  {#if day.note}
    <EmojiText emoji="📝" emojiHint="Note" label={day.note} />
  {/if}
</div>

<style>
  .container {
    width: 400px;
  }

  h2 {
    font-family: var(--serif);
  }
</style>
