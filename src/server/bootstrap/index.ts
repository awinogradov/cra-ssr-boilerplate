import * as express from 'express';
import * as compression from 'compression';
import * as config from 'config';

import { render } from '../render';
import { run } from '../run';

render.use(compression());
render.use(express.static(config.get('static.assets')));

(async () => await run(render))();
