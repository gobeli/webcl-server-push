import { BASE_URL } from './util';

let todos, polling, controller, signal;

const poll = async () => {
  const state = await fetch(`${BASE_URL}/longpoll`,{signal}).then(res => res.json()).catch(_ => null);
  if (polling) {
    if(state != null){
      todos.set(state);
    }
    poll();
  }
}

const connect = async (todoStore) => {
  controller = new AbortController();
  signal = controller.signal;
  todos = todoStore;
  const state = await fetch(BASE_URL).then(res => res.json());
  todos.set(state);
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
  todos = null;
  polling = false;
  controller.abort();
}

export default {
  name: 'Longpolling',
  connect,
  disconnect,
  addTodo
}