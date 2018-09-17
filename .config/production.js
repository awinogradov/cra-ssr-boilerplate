const { resolve } = require('path');    
const assets = require('../build/asset-manifest');

module.exports = {
    port: process.env.PORT || 3000,
    root: '',
    static: {
        js: `/${assets['main.js']}`,
        css: `/${assets['main.css']}`,
        assets: resolve(__dirname, '..', 'build')
    }
}
