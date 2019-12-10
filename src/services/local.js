import { writable } from 'svelte/store';

let todos = writable([]), interval;

const connect = () => {
  interval = setInterval(() => {
    addTodo('bla');
  }, 3000);
}

const disconnect = () => {
  clearImmediate(interval);
  todos.set([]);
}

const addTodo = text => {
  todos.update(todos => {
    return [...todos, { text: text, done: false }]
  });
}

export default {
  name: 'Local Service',
  todos,
  connect,
  disconnect,
  addTodo
}