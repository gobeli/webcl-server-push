const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const EventEmitter = require('events');

const emitter = new EventEmitter();

const app = express();
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

app.post('/', function(req, res) {
  const todo = JSON.parse(req.body);
  state = [...state, todo];
  emitter.emit('stateChanged', state);
  res.status(204).end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});