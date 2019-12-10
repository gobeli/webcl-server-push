const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(cors());

let state = [];

app.get('/', function (req, res) {
  res.json(state);
});


app.post('/', function(req, res) {
  const todo = JSON.parse(req.body);
  state = [...state, todo];
  res.status(204).end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});