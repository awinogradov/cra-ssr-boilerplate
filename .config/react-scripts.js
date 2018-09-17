const cpx = require('cpx');
const rewireTypescript = require('react-app-rewire-typescript')
const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer')

// drop checking for required files
const checkPath = require.resolve('react-dev-utils/checkRequiredFiles.js')
require.cache[checkPath] = { exports: () => true }

module.exports = function override(config, env) {
    config = rewireTypescript(config, env)

    // remove html plugins
    config.plugins.shift()
    config.plugins.shift()

    if (env === 'production') {
        config = rewireWebpackBundleAnalyzer(config, env, {
            analyzerMode: 'static',
            reportFilename: 'report.html'
        })

        cpx.copySync('src/**/*.css', 'dist/src')
    }

    return config
}
