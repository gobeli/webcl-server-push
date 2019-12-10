<script>
  import { onMount } from 'svelte';
  let todos = [];

  $: service && service.todos.subscribe(t => {
    todos = t;
  });

  export let service;
</script>
<ul>
  {#each todos as todo}
    <li>{todo.text}</li>
  {/each}
</ul>
