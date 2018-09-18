import * as proxy from 'http-proxy-middleware';

import { render } from '../render';
import { run } from '../run';

(async () => {
    const webpackDevServerProxy = proxy({ 
        target: 'http://localhost:3001', 
        changeOrigin: true,
        ws: true 
    });

    render.use('/static', webpackDevServerProxy);
    render.use('/sockjs-node', webpackDevServerProxy);
    render.use('/*.hot-update.js*', webpackDevServerProxy);
    render.use('/service-worker.js', webpackDevServerProxy);

    await run(render);

    process.argv.push('--config-overrides');
    process.argv.push('./.config/react-scripts.js');

    require('react-app-rewired/scripts/start');
})();
