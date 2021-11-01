# taro-preact-webpack-plugin

注意，仅支持 taro 2.x 版本

## usage

> yarn add preact
>
> yarn add taro-preact-webpack-plugin -D

修改 `config/index.js`，[增加 h5.webpackChain 配置](http://taro-docs.jd.com/taro/docs/2.x/config-detail#h5webpackchain)

```
const TaroPreactWebpackPlugin = require('taro-preact-webpack-plugin')

// ...
webpackChain(chain) {
      chain.plugin('TaroPreactWebpackPlugin')
      .use(TaroPreactWebpackPlugin)
}
```