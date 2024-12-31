<script lang="ts">
	import { type Month } from "$lib/model";
	import Calendar from "./Calendar.svelte";

  let { month, label }: { month: Month, label: string } = $props();
</script>

<a href={`/${month.year}/${month.month}`}>
  <p>{label}</p>
  <Calendar {month} mini/>
</a>

<style>
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--dark);
    text-decoration: none;
  }

  p {
    font-style: italic;
    font-size: var(--font-sm);
  }
</style>
