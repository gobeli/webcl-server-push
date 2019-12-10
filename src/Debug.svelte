<script>
  import { onMount } from 'svelte';

  let debugText = '';

  onMount(() => {
    todos$.subscribe(todos => {
      debugText = `Received new state: \n${JSON.stringify(todos, undefined, 2)}\n\n${debugText}`;
    });

    service$.subscribe(service => {
      if (service) {
        debugText = `New service selected: ${service.name}`;
      }
    });
  });

  export let todos$, service$;
</script>
<pre>{debugText}</pre>
<style>
  pre {
    max-height: 100vh;
    height: 100%;
    overflow: auto;
    background-color: lightgray;
    border: 2px solid #444;
    padding: 1rem;
    margin: 0;
  }
</style>