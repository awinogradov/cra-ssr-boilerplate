import * as express from 'express';
import * as config from 'config';

import { render } from '../render';
import { run } from '../run';

render.use(express.static(config.get('static.assets')));

(async () => await run(render))();
