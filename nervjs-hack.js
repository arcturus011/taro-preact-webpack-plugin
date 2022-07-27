import * as compat from 'preact/compat'
import PropTypes from 'prop-types'
import * as preact from 'preact'
import _wrap from 'lodash.wrap'

const options = preact.options
const Current = {
  current: null,
  index: 0
}

preact.Component.prototype.setState = _wrap(preact.Component.prototype.setState, function (fn, state, cb) {
  if (!this.__v) {
    Promise.resolve().then(cb)
  }
  return fn.call(this, state, cb)
})

function nextTick(fn) {
  setTimeout(fn)
}

function getHooks(index) {
  if (!Current.current.hooks) {
    Current.current.hooks = []
  }
  const hooks = Current.current.hooks
  if (index >= hooks.length) {
    hooks.push({})
  }
  return hooks[index]
}

Object.defineProperty(compat, 'PropTypes', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: PropTypes
})

Object.defineProperty(compat, 'nextTick', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: nextTick
})

Object.defineProperty(compat, 'options', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: options
})

Object.defineProperty(compat, 'Current', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: Current
})

Object.defineProperty(compat, 'getHooks', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: getHooks
})

options._diff = options.__b /*_diff*/ = _wrap(
  options._diff || options.__b,
  (fn, vnode) => {
    fn && fn(vnode)
    Current.current = null
  }
)

options._render = options.__r /*_render*/ = _wrap(
  options._render || options.__r,
  (fn, vnode) => {
    fn && fn(vnode)
    Current.current = vnode
    Current.index = 0
  }
)

options._hook = options.__h /*_hook*/ = _wrap(
  options._hook || options.__h,
  (fn, vnode) => {
    fn && fn(vnode)
    Current.current = vnode
  }
)

options.diffed = _wrap(options.diffed, (fn, vnode) => {
  fn && fn(vnode)
  Current.current = null
})

options.vnode = _wrap(options.vnode, (fn, vnode) => {
  fn && fn(vnode)
  
  Object.defineProperty(vnode, 'name', {
    get() {
      return vnode.type.name
    }
  })
  
  Object.defineProperty(vnode, 'dom', {
    get() {
      return vnode.__e
    }
  })
  
  if (vnode.key) {
    vnode.props.key = vnode.key
  }
})

export default compat
export * from 'preact/compat'
export { PropTypes, nextTick, options, Current, getHooks }
