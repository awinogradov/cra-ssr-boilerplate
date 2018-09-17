
import { Express } from 'express';
import * as config from 'config';

const port = config.get('port');

const run = (app: Express) => new Promise(resolve => app.listen(port, (err: string) => {
  if (err) {
    return console.log(err);
  }

  resolve();

  return console.log(`server is listening on ${port}`);
}));

export { run };
