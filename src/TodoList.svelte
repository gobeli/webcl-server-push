<script>
  import { onMount } from 'svelte';
  let todos = [];

  $: todos$.subscribe(t => {
    todos = t;
  });

  export let todos$;
</script>
<ul>
  {#each todos as todo}
    <li>{todo.text}</li>
  {/each}
</ul>
