<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store'
	import TodoList from './TodoList.svelte';
	import Debug from './Debug.svelte';
	import LocalService from './services/local';
	import PollingService from './services/polling';
	import LongpollingService from './services/longpolling';
	import ServerSentEventsService from './services/sse';
	import WebSocketEventsService from './services/ws';

	const services = [LocalService, PollingService, LongpollingService, ServerSentEventsService, WebSocketEventsService];
	const todos$ = writable([]);
	const service$ = writable(null);
	let todoText, selectedService;

	onMount(() => {
		selectService(LocalService.name);
	});

	const selectService = serviceName  => {
		if (selectedService) {
			selectedService.disconnect();
		}
		const service = services.find(s => s.name === serviceName);
		selectedService = service;
		service.connect(todos$);
		service$.set(service);
	}

	const submit = evt => {
		evt.preventDefault();
		selectedService.addTodo(todoText);
	}
</script>

<main>
	<section>
		<label for="services">Choose service</label>
		<select name="services" on:change={evt => selectService(evt.target.value)}>
			{#each services as service}
				<option value={service.name}>{service.name}</option>
			{/each}
		</select>
		<form on:submit={evt => submit(evt)}>
			<label for="text">Todo</label>
			<div />
			<input type="text" name="text" bind:value={todoText} placeholder="Todo">
			<input type="submit" />
		</form>
		<TodoList todos$={todos$}  />
	</section>
	<section>
		<Debug {todos$} {service$}  />
	</section>
</main>

<style>
	main {
		display: grid;
		max-width: 900px;
		margin: auto;
		grid-template-columns: 1fr 1fr;
		grid-gap: 2rem;
		height: 100%;
	}
	section {
		height: 100%;
	}
	form {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto auto;
		grid-column-gap: 0.5rem;
	}
	label {
		font-size: .8rem;
	}
	select {
		width: 100%;
	}
</style>