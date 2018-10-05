const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
const hotResolve = 'webpack/hot/poll?1000';

const entry = ['./src/server/index'];
isDev && entry.unshift(hotResolve);

const externalsOptions = isDev ? { whitelist: [hotResolve] } : {};

const plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            PORT: JSON.stringify(process.env.PORT)
        }
    })
];
isDev && plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new StartServerPlugin('index.js')
);

const optimization = isDev ? undefined : {
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                parse: {
                    ecma: 8
                },
                compress: {
                    ecma: 6,
                    warnings: false,
                    comparisons: false,
                    inline: 2
                },
                output: {
                    ecma: 6,
                    comments: false,
                    ascii_only: true
                }
            },
            parallel: true,
            cache: true,
            sourceMap: true
        })
    ]
}

module.exports = {
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    devtool: 'source-map',
    bail: true,
    mode,
    entry,
    optimization,
    output: {
        publicPath: './',
        path: path.resolve('./dist/server'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    externals: [
        nodeExternals(externalsOptions)
    ],
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300
    },
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loaders: 'ts-loader',
        }, {
            test: /\.css$/,
            loaders: 'null-loader'
        }]
    },
    plugins
};
