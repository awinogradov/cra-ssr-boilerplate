import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import * as got from 'got';
import * as express from 'express';
import { StaticRouter as Router } from 'react-router';

import { App } from '../view/App';

const script = (url: string) => `<script type="text/javascript" src="${url}"></script>`;
const style = (url: string) => `<link rel="stylesheet" href="${url}">`;

export function setup(manifest: string) {
    const app = express();
    const router = express.Router();

    const assets = async (host?: string) => {
        const assetsManifest = await got(`http://${host}/${manifest}`, { json: true });
        const assetsMap = assetsManifest.body;
    
        const chunks: string[] = [];
        const bundle: string[] = [];
        const styles: string[] = [];
    
        for (const key in assetsMap) {
            const asset = assetsMap[key];
            if (!asset.endsWith('.map') && asset.endsWith('.js')) {
                const tag = script(asset);
                asset.includes('.chunk') ? chunks.push(tag) : bundle.push(tag);
            }

            if (!asset.endsWith('.map') && asset.endsWith('chunk.css')) {
                styles.push(style(asset));
            }
        }
    
        return { 
            styles,
            scripts: bundle.concat(chunks.shift() as string, chunks.reverse()[0])
        };
    }
    
    router.get(['/', '/intro'], async (req, res, next) => {
        const { styles, scripts } = await assets(req.headers.host);

        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <title>Title</title>
                ${styles.join('')}
            </head>
            <body><div id="root">`);
    
        const stream = renderToNodeStream(
            <Router location={req.url} context={{}}>
                <App/>
            </Router>
        );
    
        stream.pipe(res, { end: false });
    
        stream.on('end', () => {
            res.write(`</div>${scripts.join('')}</body></html>`);
    
            res.end();
            next();
        });
    });
    
    app.use(router);

    return app;
}
