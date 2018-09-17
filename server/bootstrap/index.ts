import * as express from 'express';
import { resolve } from 'path';

import { render } from '../render';
import { run } from '../run';

const staticStorage = resolve(__dirname, '..', '..', '..', 'build');

render.use(express.static(staticStorage));

(async () => await run(render))();
