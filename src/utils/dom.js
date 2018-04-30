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

  // 添加类名
  addClass(className) {
    if (AsherDom.isArr(this.dom)) { // 数组的情况下
      /*
       * 1.先拿到这个数组集合中的每一个DOM对象
       * 2.给每一个DOM对象的className属性值
       * ...(逻辑重复单个DOM对象的情况)
       */
    } else { // 单个DOM 对象的情况下
      /*
       * 1.先拿到DOM对象的className属性的值
       * 2.拿到值之后以' '(空格)进行字符串切割（''.split(' ')）返回数组（如果拿到值的数据类型为String, 进行这步操作，反之则直接操作第三步）
       * 3.判断数组中每一项的值有没有与用户给的重复, 重复不添加，反之
       * 4.返回AsherDom实例对象。用于链式调用
       */
      /*
       * 拿到DOM对象的className属性的常用方式：
       * 1. DOM.className ===> 返回一个字符串
       *  console.log(this.dom.className)
       * 2. DOM.getAttribute(attr)
       *  console.log(this.dom.getAttribute('class'))
       * 3. DOM.classList
       *  console.log(this.dom.classList)
       */
      let nameArr = [...this.dom.classList]
      /*
       * forEach循环遇坑记：
       * nameArr.forEach(item => {
       *  if (item === className) return false
       * })
       * nameArr.push(className)
       * this.dom.className = nameArr.join(' ')
       * 上面forEach代码的理想逻辑是：如果遇到数组中的item与className相等就阻止下面的代码执行
       * 可是事与愿违，forEach循环之后，还是会往nameArr中添加内容，并不会阻止代码。阻止的只是forEach代码中的即时函数（箭头函数）的内部的逻辑
       * forEach循环接收一个回调函数，每一次循环都会有一个回调函数，函数会有作用域。所以forEach循环中的即时函数是子作用域，return 阻止的也是子作用域内的代码执行而不会影响到forEach方法所在的作用域内的代码逻辑
       * 以下代码是简单模拟Array.prototype.forEach()方法的内部逻辑：
       * let forEach = (arr, fn) => {
       *  for (let i = 0, len = arr.length; i < len; i++) {
       *     fn && fn(arr[i], i)
       *  }
       * }
       * forEach([10, 9, 8, 7, 6, 5, 4, 3, 2, 1], (item, index) => {
       *  console.log(`index：${index}`, `item：${item}`)
       * })
       */
      let i = 0
      let len = nameArr.length
      for (; i < len; i++) {
        if (nameArr[i] === className) return false
      }
      nameArr.push(className)
      this.dom.className = nameArr.join(' ')
      return this
    }
  }

  // 判断是不是类数组，如果是则返回数组，如果不是则返回源对象
  static isArr(nodeDom) {
    if (nodeDom.length) {
      // return nodeDom.slice.call()
      /*
       * 类数组转数组的常用方法：
       * console.log('from', Array.from(nodeDom) instanceof Array, Array.from(nodeDom))
       * console.log('扩展运算符', Array.isArray([...nodeDom]), [...nodeDom])
       * console.log('slice.call()', Array.isArray([].slice.call(nodeDom)), [].slice.call(nodeDom))
       * console.log('slice.apply()', Array.isArray([].slice.apply(nodeDom)), [].slice.apply(nodeDom))
       * 上面几个比较通俗易懂
       * 下面的使用了es6的Symbol配合[].concat() 方法
       * nodeDom[Symbol.isConcatSpreadable] = true
       * console.log('Symbol', Array.isArray([].concat(nodeDom)), [].concat(nodeDom))
       * Symbol.isConcatSpreadable飞机票：https://segmentfault.com/a/1190000010754245
       */
      nodeDom[Symbol.isConcatSpreadable] = true
      return [].concat(nodeDom)
    }
    return false
  }
}
