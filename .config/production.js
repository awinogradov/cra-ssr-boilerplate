const assets = require('../build/asset-manifest');

module.exports = {
    root: '',
    static: {
        js: `/${assets['main.js']}`,
        css: `/${assets['main.css']}`
    }
}
