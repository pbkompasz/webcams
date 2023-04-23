'use strict';

const express = require('express');
const { crawl } = require('./crawl');
console.log(crawl);
crawl();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/crawl', (req, res) => {
  res.send('registered');
})

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
