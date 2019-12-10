<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store'
	import TodoList from './TodoList.svelte';
	import LocalService from './services/local';
	import PollingService from './services/polling';

	const services = [LocalService, PollingService];
	const todos = writable([]);
	let todoText, selectedService;

	onMount(() => {
		selectService(LocalService.name);
	});

	const selectService = serviceName  => {
		if (selectedService) {
			selectedService.disconnect();
			console.log(`${selectedService.name} disconnected`);
		}
		const service = services.find(s => s.name === serviceName);
		selectedService = service;
		service.connect(todos);
		console.log(`${service.name} connected`);
	}

	const submit = evt => {
		evt.preventDefault();
		selectedService.addTodo(todoText);
	}
</script>

<main>
	<select name="services" on:change={evt => selectService(evt.target.value)}>
		{#each services as service}
			<option value={service.name}>{service.name}</option>
		{/each}
	</select>
	<form on:submit={evt => submit(evt)}>
		<input type="text" name="text" bind:value={todoText} placeholder="Todo">
		<input type="submit" />
	</form>
	<TodoList todos$={todos}  />
</main>