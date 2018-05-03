import Vue from 'vue'
import './index.scss'
class Alert {
  constructor(config) {
    this.title = config.title || '提示'
    this.msg = config.msg || '我是消息'
    this.btn = config.btn || '确定'
    this.isCancel = config.isCancel || false
    this.created()
    return this.render()
  }
  // 渲染函数
  render() {
    return new Promise((resolve, reject) => new Vue({
      el: this.div,
      data: {
        title: this.title,
        msg: this.msg,
        btn: this.btn,
        isCancel: this.isCancel
      },
      methods: {},
      render(h) {
        return h('div', {
          attrs: {
            class: 'a-alert'
          },
          domProps: {
            innerHTML: this.title
          }
        })
      }
    }))
  }
  // 创建盒子
  created() {
    this.body = document.body
    this.mask = document.createElement('div')
    this.mask.className = 'a-mask'
    this.div = document.createElement('div')
    this.body.appendChild(this.mask)
    this.body.appendChild(this.div)
  }
}
Alert.install = function (Vue, options) {
  // 3. 注入组件
  Vue.mixin({
    created: function () {}
  })
  Vue.prototype.$alert = function (methodOptions) {
    return new Alert(methodOptions)
    // 逻辑...
  }
}
export default Alert
