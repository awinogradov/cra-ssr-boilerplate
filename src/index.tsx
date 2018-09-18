import * as React from 'react';
import * as ReactDOM from 'react-dom'

import { register } from './registerServiceWorker';
import { App } from './view/App'

import './index.css'

register()

const render = (Component: React.ComponentType) => {
    ReactDOM.hydrate(<Component />, document.getElementById('root'))
}

render(App)

module.hot && module.hot.accept('./view/App', () => render(require('./view/App').App))
