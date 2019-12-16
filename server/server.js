const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const EventEmitter = require('events');
const http = require('http');

const emitter = new EventEmitter();

const app = express();
const server = http.createServer(app);
const expressWs = require('express-ws')(app, server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(cors());

let state = [];

app.get('/', function (req, res) {
  res.json(state);
});

app.get('/sse', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  res.write('\n');
  emitter.on('stateChanged', state => res.write('data: ' + JSON.stringify(state) + '\n\n'));
});

app.get('/longpoll', (req, res) => {
  var responded = false;
  const listener = _ => { 
    responded = true;
    res.json(state);
  };
  
  emitter.once('stateChanged', listener);

  req.on("abort", function() { //I tried also "aborted", "close", "closed", "finish", "finished"..no luck
    emitter.removeListener("stateChanged", listener);
  });

  setTimeout(() => {
    if (!responded) {
      emitter.removeListener("stateChanged", listener);
      res.status(204).end();
    }
  }, 30000);
});

app.ws('/ws', (ws, req) => {
  const onStateChanged = state => {
    ws.send(JSON.stringify(state));
  };
  emitter.on('stateChanged', onStateChanged);

  ws.on('message', msg => {
    const state = JSON.parse(msg);
    state = [...state, todo];
    emitter.emit('stateChanged', state);
  });

  ws.on('close', () => {
    emitter.off('stateChanged', onStateChanged);
  });
});

app.post('/', function(req, res) {
  const todo = JSON.parse(req.body);
  state = [...state, todo];
  emitter.emit('stateChanged', state);
  res.status(204).end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});