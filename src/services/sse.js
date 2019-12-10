import { BASE_URL } from './util';

let todos, eventSource;

const onMessage = evt => {
  todos.set(JSON.parse(evt.data));
}

const connect = async (todoStore) => {
  todos = todoStore;
  const state = await fetch(BASE_URL).then(res => res.json());
  todos.set(state);

  eventSource = new EventSource(`${BASE_URL}/sse`);
  eventSource.addEventListener('message', onMessage);
}

const addTodo = async text => {
  if (!todos) {
    throw 'Service not initialized!';
  }
  await fetch(BASE_URL, { method: 'POST', body: JSON.stringify({ text, done: false }) });
}

const disconnect = () => {
  todos = null;
  eventSource.close();
}

export default {
  name: 'Server Sent Events',
  connect,
  disconnect,
  addTodo
}