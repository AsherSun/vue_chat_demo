/**
 * DOM 的简单操作 类库
 * @Author asher_sun
 * @export AsherDom
 * @class AsherDom
 * @param el ===> 接收的DOM标签的className或者id或者 DOM 对象
 * @returns AsherDom
 */
export default class AsherDom {
  constructor(el) {
    this.dom = null
    if (typeof el === 'string') {
      /*
       * 正则匹配遇坑记:
       * 符号 ‘.’（点）在正则中有代表的意思：（小数点）匹配除换行符之外的任何单个字符
       * 于是正则这样写：/^(#|.)/.test(str) 只要给任意字符串，返回的总是true
       * 所以我们应该将匹配规则改成这样: /^(#|\.)/.test(str), 只有当第一个字符为符合‘#’或者‘.’的时候才为true
       */
      if (/^(#|\.)/.test(el)) {
        this.dom = el[0] === '#' ? document.querySelectorAll(el)[0] : document.querySelectorAll(el)
        return this
      }
      throw new RangeError('给的值不是一个有效的DOM元素的className或者id')
    } else if (typeof el === 'object' && el instanceof HTMLElement) {
      this.dom = el
    } else {
      throw new TypeError('不是一个DOM对象,请检查传入的值数据类型')
    }
    return this
  }
  // 判断是不是类数组，如果是则返回数组，如果不是则返回源对象
  static isArr(nodeDom) {
    if (nodeDom.length) {
      nodeDom[Symbol.isConcatSpreadable] = true
      return [].concat(nodeDom)
    }
    return false
  }
  // 添加类名
  addClass(className) {
    if (AsherDom.isArr(this.dom)) { // 数组的情况下
      this.dom.forEach((item, index) => {
        this.addClassItem(className, item)
      })
      return this
    }
    // 单个DOM 对象的情况下
    this.addClassItem(className)
    return this
  }
  // dom 添加className的方法
  addClassItem(className, dom = this.dom) {
    let nameArr = [...dom.classList]
    let i = 0
    let len = nameArr.length
    for (; i < len; i++) {
      if (nameArr[i] === className) return false
    }
    nameArr.push(className)
    dom.className = nameArr.join(' ')
  }
  // 删除类名
  removeClass(className) {
    if (AsherDom.isArr(this.dom)) { // 数组的情况下
      this.dom.forEach((item, index) => {
        this.removeClassItem(className, item)
      })
      return this
    }
    // 单个DOM 对象的情况下
    this.removeClassItem(className)
    return this
  }
  removeClassItem(className, dom = this.dom) {
    let nameArr = [...dom.classList]
    for (let i = 0, len = nameArr.length; i < len; i++) {
      if (className === nameArr[i]) {
        nameArr.splice(i, 1)
        dom.className = nameArr.join(' ')
      }
    }
  }
  // 获取兄弟节点
  siblings() {
    if (AsherDom.isArr(this.dom)) return false
    let allChild = this.dom.parentNode.children
    let arr = []
    for (let i = 0, len = allChild.length; i < len; i++) {
      if (this.dom !== allChild[i]) arr.push(allChild[i])
    }
    this.dom = arr
    return this
  }
}
