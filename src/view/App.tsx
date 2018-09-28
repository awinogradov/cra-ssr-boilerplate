import * as React from 'react';
import * as Loadable from 'react-loadable';

import './App.css';

const LoadableIntro = Loadable.Map({
  loader: {
    chunk: () => import('./Intro')
  },
  loading() {
    return <div>Loading...</div>
  },
  render({ chunk }) {
    const Intro = chunk.Intro;
    return <Intro />;
  }
});

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <LoadableIntro />
      </div>
    );
  }
}
