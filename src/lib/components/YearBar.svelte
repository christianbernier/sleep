<script lang="ts">
  let { year }: { year: number } = $props();

  let previous = $derived(year - 1);
  let next = $derived(year + 1);
  let previousDisabled = $derived(previous < 2019);
  let nextDisabled = $derived(next > 2024);
</script>

<div>
  {#if previousDisabled}
    <p class="disabled">{previous}</p>
  {:else}
    <a href={previousDisabled ? '' : `/${previous}`}>
      {previous}
    </a>
  {/if}
  <p id="current-year">Sleep in {year}</p>
  {#if nextDisabled}
    <p class="disabled">{next}</p>
  {:else}
    <a href={nextDisabled ? '' : `/${next}`}>
      {next}
    </a>
  {/if}
</div>

<style>
  div {
    width: 100%;
    background-color: var(--dark);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: var(--margin-md);
    border-radius: var(--margin-sm);
  }

  a, p {
    color: var(--light);
    font-family: var(--sans-serif);
    padding: 0;
    margin: 0;
  }

  #current-year {
    font-family: var(--serif);
    font-style: italic;
    font-size: var(--font-lg);
  }

  .disabled {
    cursor: not-allowed;
    color: #4d4d4d;
  }
</style>
