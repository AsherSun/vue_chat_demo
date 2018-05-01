import Vue from 'vue'
import './index.scss'
class Alert {
  constructor(options) {
    this.div = document.createElement('div')
    return this.render()
  }
  render() {
    return new Promise((resolve, reject) => new Vue({
      el: this.div,
      created() {
      }
    }))
  }
}
Alert.install = function (Vue, options) {
  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
  })
  Vue.prototype.$alert = function (methodOptions) {
    return new Alert()
    // 逻辑...
  }
}
export default Alert
