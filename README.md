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

## 备注

开发该插件主要是为了解决两个问题：

1. nervjs 对 Fragment 支持不好，有时候 diff 会报错
2. devtools 不可用，调试起来只能手动打断点

对于问题1，以下代码可以复现

```js
import Taro from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import shuffle from 'lodash/shuffle'

const Comp = props => {
  if (Math.random() > 0.5) return null
  
  return <Block>
    {props.text}
    {Math.random() > 0.5 ? 'haha' : undefined}
  </Block>
}

export default class TestPage extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [1, 2, 3, 4, 5]
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        list: shuffle(this.state.list)
      })
    }, 800)

  }

  render() {
    const { list } = this.state

    return <Block>
      {list.map(v => {
        return <View>
          <Comp text={v}></Comp>
        </View>
      })}
    </Block>
  }
}
```

在使用 nervjs 的情况下，可以稳定复现 `Uncaught TypeError: Cannot read properties of null (reading 'insertBefore')` 的报错，替换成了 preact 就没有问题