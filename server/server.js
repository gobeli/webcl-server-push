const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

let state = [];

app.get('/', function (req, res) {
  res.json(state);
});

app.post('/', function(req, res) {
  console.log(req.body)
  state = [...state, req.body];
  res.status(204).end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});