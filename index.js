const path = require('path')

class TaroPreactWebpackPlugin {
    apply(compiler) {
      compiler.hooks.watchRun.tapAsync('TaroPreactWebpackPlugin', (compilation, callback) => {
        // Explore each chunk (build output):
        // compiler.options
        Object.assign(compiler.options.resolve.alias, {
          'nervjs': path.resolve(__dirname, 'nervjs-hack.js'),
          'react': path.resolve(__dirname, 'nervjs-hack.js'),
          'react-dom': path.resolve(__dirname, 'nervjs-hack.js'),
        })
  
        callback();
      });
    }
  }
  module.exports = TaroPreactWebpackPlugin;
