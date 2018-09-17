import { render } from '../render';
import { run } from '../run';

(async () => {
    await run(render);

    process.argv.push('--config-overrides');
    process.argv.push('./.config/react-scripts.js');

    require('react-app-rewired/scripts/start');
})();
