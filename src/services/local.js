let todos, interval;

const connect = todoStore => {
  todos = todoStore;
  interval = setInterval(() => {
    addTodo('bla');
  }, 3000);
}

const disconnect = () => {
  clearInterval(interval);
  todos = null;
}

const addTodo = text => {
  if (!todos) {
    throw 'Service not initialized!';
  }
  todos.update(todos => {
    return [...todos, { text: text, done: false }]
  });
}

export default {
  name: 'Local Service',
  connect,
  disconnect,
  addTodo
}