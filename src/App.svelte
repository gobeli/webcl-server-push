<script>
  import { onMount } from 'svelte';
	import TodoList from './TodoList.svelte';
	import LocalService from './services/local';

	const services = [LocalService];
	let selectedService, todoText;

	onMount(() => {
		selectService(LocalService);
	});

	const selectService = service  => {
		if (selectedService) {
			selectedService.disconnect();
		}
		service.connect();
		selectedService = service;
	}

	const submit = evt => {
		evt.preventDefault();
		selectedService.addTodo(todoText);
	}
</script>

<main>
	<select name="services">
		{#each services as service}
			<option value={service} on:change={() => selectService(service)}>{service.name}</option>
		{/each}
	</select>
	<form on:submit={evt => submit(evt)}>
		<input type="text" name="text" bind:value={todoText} placeholder="Todo">
		<input type="submit" />
	</form>
	<TodoList service={selectedService}  />
</main>