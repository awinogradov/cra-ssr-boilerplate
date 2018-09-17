require('ignore-styles');
process.env.NODE_ENV === 'development' 
    ? require(`./bootstrap/index.development`)
    : require(`./bootstrap/index`);
