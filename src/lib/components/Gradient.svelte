<script lang="ts">
	import type { GradientParameters } from "$lib/model";
	import type chroma from "chroma-js";

  let { gradient, params }: { gradient: chroma.Scale, params: GradientParameters } = $props();

  let values: Array<number> = $derived.by(() => {
    const toReturn: Array<number> = [];
    const count = 100;
    const step = (params.maxValue - params.minValue) / (count - 1);
    let val = params.minValue;
    for (let i = 0; i < count; i++) {
      toReturn.push(val);
      val += step;
    }
    return toReturn;
  });

</script>

<div class="wrapper">
  {params.minLabel}
  <div id="gradient-display">
    {#each values as value}
      <span
        class="gradient-display-segment"
        style={`background-color: ${gradient(value)}`}
      ></span>
    {/each}
  </div>
  {params.maxLabel}
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: row;
    gap: var(--margin-md);
    align-items: center;
  }

  #gradient-display {
    height: var(--margin-md);
    width: 100px;
    border-radius: var(--border-md);
    display: flex;
    flex-direction: row;
    overflow: hidden;
    white-space: nowrap;
  }

  .gradient-display-segment {
    display: inline-block;
    height: 100%;
    width: 1%;
  }
</style>
