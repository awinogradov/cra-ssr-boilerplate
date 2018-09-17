import * as React from 'react';
import * as ReactDOM from 'react-dom'

import { App } from './view/App'

import './index.css'

const registerServiceWorker = require('./registerServiceWorker')

ReactDOM.hydrate(<App />, document.getElementById('root'))

registerServiceWorker()
