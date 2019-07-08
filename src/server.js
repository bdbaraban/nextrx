const express = require('express');
const http = require('http');
const next = require('next');
const api = require('./api');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  dir: './src'
});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(api);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    http.createServer(server).listen(process.env.PORT, () => {
      console.log(`> Ready on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
