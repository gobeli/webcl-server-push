import { BASE_URL } from './util';

let todos, polling;

const poll = async () => {
  const state = await fetch(BASE_URL).then(res => res.json());
  todos.set(state);
  if (polling) {
    setTimeout(poll, 1000);
  }
}

const connect = todoStore => {
  todos = todoStore;
  polling = true;
  poll();
}

const addTodo = async text => {
  if (!todos) {
    throw 'Service not initialized!';
  }
  await fetch(BASE_URL, { method: 'POST', body: JSON.stringify({ text, done: false }) });
}

const disconnect = () => {
  polling = false;
  todos = null;
}

export default {
  name: 'Polling',
  connect,
  disconnect,
  addTodo
}