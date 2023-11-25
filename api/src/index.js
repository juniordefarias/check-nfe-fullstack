const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(routes);

app.listen(3001, () => console.log('Server started at http://localhost:3001'));
