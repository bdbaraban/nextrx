import express from 'express';
import { createServer } from 'http';
import next from 'next';
import { connectClient, closeClient } from '../db/utils';
import api from '../api';

const app = next({
  dev: process.env.NODE_ENV !== 'production'
});
const handle = app.getRequestHandler();

connectClient(process.env.MONGODB, (err): void => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('*** MongoDB mongoing on nextrx_db. ***');

  app
    .prepare()
    .then((): void => {
      const server = express();

      server.use(api);

      server.get(
        '*',
        (req, res): Promise<void> => {
          return handle(req, res);
        }
      );

      createServer(server).listen(process.env.PORT, (): void => {
        console.log(
          `*** Server serving on http://localhost:${process.env.PORT} ***`
        );
      });
    })
    .catch((ex): void => {
      console.error(ex.stack);
      closeClient();
      process.exit(1);
    });
});
