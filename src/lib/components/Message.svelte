<script lang="ts">
  let { message }: { message: string } = $props();
</script>

<div>
  <p>{message}</p>
</div>

<style>
  div {
    min-width: 400px;
    min-height: 300px;
    padding: var(--margin-lg) var(--margin-xl);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    color: var(--dark);
    font-size: var(--font-md);
  }
</style>