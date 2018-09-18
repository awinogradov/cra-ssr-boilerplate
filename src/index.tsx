import * as React from 'react';
import * as ReactDOM from 'react-dom'

import { App } from './view/App'
import './index.css'

require('./registerServiceWorker')()

const render = (Component: React.ComponentType) => {
    ReactDOM.hydrate(<Component />, document.getElementById('root'))
}

render(App);

if (module.hot) {
    module.hot.accept('./view/App', () => render(require('./view/App').App));
}
