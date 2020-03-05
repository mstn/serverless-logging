const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.text())

const logger = require('./logger');

app.post('/', async (req, res) => {
  const response = await logger.handler(req);
  res.send(response.body);
});

app.listen(3000, () => console.log('Listening on port 3000!'));