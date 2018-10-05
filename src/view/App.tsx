import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import * as Loadable from 'react-loadable';

import './App.css';

export const Intro = Loadable.Map({
    loader: {
        chunk: () => import('./Intro'),
    },
    loading: () => <i>Loading...</i>,
    render: ({ chunk }) => {
        const Intro = chunk.Intro;

        return <Intro/>;
    }
});

export const App = () => (
    <div className="App">
        <header className="App-header">
            <span className="App-logo" />
            <h1 className="App-title">Welcome to React!</h1>
        </header>
        <Link to="/intro">Go to intro!</Link>
        <Route path="/intro" component={Intro} />
    </div>
);
