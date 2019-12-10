let todos, polling;

const poll = async () => {
  const state = await fetch('http://localhost:3000/').then(res => res.json());
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

const disconnect = () => {
  polling = false;
  todos = null;
}

const addTodo = async text => {
  if (!todos) {
    throw 'Service not initialized!';
  }
  await fetch('http://localhost:3000/', { method: 'POST', body: JSON.stringify({ text, done: false }) });
}

export default {
  name: 'Polling Service',
  connect,
  disconnect,
  addTodo
}