'use strict';

const express = require('express');
const { getStream, parseWebsite } = require('./crawl');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Return true if site contains a stream
app.get('/parse', async (req, res) => {
  const resp = await parseWebsite(req.query.url);
  res.send(resp);
})

// Returns m3u8 and mediafile address
app.get('/stream', async (req, res) => {
  const resp = await getStream(req.query.url);
  res.send(resp);
})

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
