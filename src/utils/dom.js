/**
 * DOM 的简单操作 类库
 * @Author asher_sun
 * @export
 * @class Dom
 * @param el ===> 接收的DOM标签的className或者id或者 DOM 对象
 */
export default class Dom {
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

  // 添加类名
  addClass() {
    console.log(this.dom.length)
  }

  // 判断是不是类数组，如果是则返回数组，如果不是则返回源对象
  isArr() {
  }
}
