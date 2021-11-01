const path = require('path')

class TaroPreactWebpackPlugin {
  apply(compiler) {
    const modifier = (compilation, callback) => {
      Object.assign(compiler.options.resolve.alias, {
        'nervjs': path.resolve(__dirname, 'nervjs-hack.js'),
        'react': path.resolve(__dirname, 'nervjs-hack.js'),
        'react-dom': path.resolve(__dirname, 'nervjs-hack.js'),
      })

      callback();
    }
    compiler.hooks.watchRun.tapAsync('TaroPreactWebpackPlugin',modifier);
    compiler.hooks.run.tapAsync('TaroPreactWebpackPlugin',modifier);
  }
}
module.exports = TaroPreactWebpackPlugin;
