import { WS_BASE_URL } from './util';

let todos, ws;

const connect = todoStore => {
  ws = new WebSocket(WS_BASE_URL);
  todos = todoStore;
  ws.addEventListener('message', msg => {
    todos.set(JSON.parse(msg.data));
  });
  ws.addEventListener('error', console.warn)
}

const addTodo = text => {
  if (!todos) {
    throw 'Service not initialized!';
  }
  ws.send(JSON.stringify({ text, done: false }));
}

const disconnect = () => {
  ws.close();
}

export default {
  name: 'Web Socket',
  connect,
  disconnect,
  addTodo
}