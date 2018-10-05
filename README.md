# Create React App (improved)

[![Greenkeeper badge](https://badges.greenkeeper.io/awinogradov/cra-ssr-boilerplate.svg)](https://greenkeeper.io/)

## What's inside?

- [create-react-app](https://github.com/facebook/create-react-app) as base and `react-scripts` without ejecting;
- [express](https://github.com/expressjs/express) as a server;
- [stream rendering](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) because it's fast;
- [react-app-rewired](https://github.com/timarney/react-app-rewired) for improving base `react-scripts`;
- [TypeScript](https://www.typescriptlang.org/) as a main language for client and server;

## Usage

``` bash
❯ git clone git@github.com:awinogradov/cra-ssr-boilerplate.git react-ssr
❯ cd react-ssr
❯ npm i
❯ npm start
```

Point your browser to [http://localhost:3000/](http://localhost:3000/). 
### How it works

`react-scripts` uses `webpack-dev-server` for incremental building and HMR, it works fine and the only one way to use it with SSR it's proxy. `webpack-dev-server` compiles all static files, but `Express` renders `html` on the different port. It's the reason why we need to use the proxy for static files and ws to `webpack-dev-server` from `Express`.

## Building

``` bash
❯ npm run build
```

## Production

``` bash
❯ npm run start:production
```

Point your browser to [http://localhost:3000/](http://localhost:3000/).

### License [MIT](LICENSE)
