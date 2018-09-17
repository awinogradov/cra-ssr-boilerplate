import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as express from 'express';
import * as config from 'config';

import { App } from '../../view/App';

const render = express();
const router = express.Router();

const meta = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">`;
const title = `<title>${config.get('title')}</title>`;
const styles = `<link rel="stylesheet" type="text/css" href="${config.get('static.css')}">`;
const scripts = `<script type="text/javascript" src="${config.get('static.js')}"></script>`;

router.get(`/${config.get('root')}`, (_, res) => {
    res.write(`<!DOCTYPE html><html lang="en"><head>${meta}${title}${styles}</head><body><div id="root">`);

    const stream = ReactDOMServer.renderToNodeStream(<App/>);
    stream.pipe(res, { end: false });

    stream.on('end', () => {
        res.write(`</div>${scripts}</body></html>`);

        res.end();
    });
});

render.use(router);

export { render };
