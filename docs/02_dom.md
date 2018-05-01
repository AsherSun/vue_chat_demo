# dom常用操作方法封装
## 全栈技术交流：
***
QQ: 135170291
微信公众号：前端邦邦堂（WebBBT）
***
## 前言
> 首先非常感谢开源项目[vuechat](https://github.com/clm960227/vuechat), 本项目是基于[vuechat](https://github.com/clm960227/vuechat)的基础之上开发的。项目主要立意：学习、分享。学习开源项目[vuechat](https://github.com/clm960227/vuechat)所用到的技术并且分享学习过程中的所得，所想。

## dom.js 文件会封装的方法：
> addClass、removeClass、siblings

## AsherDom 类的创建
> AsherDom 类的说明：
```javascript
/**
 * DOM 的简单操作 类库
 * @Author asher_sun
 * @export AsherDom
 * @class AsherDom
 * @param el ===> 接收的DOM标签的className或者id或者 DOM 对象
 * @returns AsherDom
 */
```
> AsherDom 类的构建：
```javascript
export default class AsherDom {
  constructor(el) {
    this.dom = null
    if (typeof el === 'string') {
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
}
```
### 首先我们分析下AsherDom类的constructor函数的内部逻辑
> - 参数el --- 用于接收className或者id或或者单个DOM对象
> - 判断传过来的参数是不是string类型，如果是则验证是不是className或者id。如果是，则获取DOM对象，否则提示报错信息
> - 判断传过来的参数是不是object类型，并且改参数的数据类型是不是 HTMLElement 节点，如果是则获取DOM对象，否则提示报错信息
> - 返回AsherDom类
### constructor函数中的正则验证遇坑记：
> - 符号 ‘.’（点）在正则中有代表的意思：（小数点）匹配除换行符之外的任何单个字符
> - 于是正则这样写：/^(#|.)/.test(str) 只要给任意字符串，返回的总是true
> - 所以我们应该将匹配规则改成这样: /^(#|\\.)/.test(str), 只有当第一个字符为符合‘#’或者‘.’的时候才为true
### 静态方法 isArr 内部逻辑
> - 判断是不是类数组，如果是则返回对象，如果不是则返回源数据
> - es6类的静态方法说明(个人理解)：对象的私有方法，而不是挂载在prototype原型上的动态方法。只能允许该对象访问。比如：
```javascript
  class Fn {
    static a () {}
  }
  // 可以这样调用：
  Fn.a()
  // 而不能这样调用：
  Fn().a()
```
### isArr 方法中的类数组转数组的常用方法总结：
> - Array.from方法[MDN飞机票](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
```javascript
  console.log('from', Array.from(nodeDom) instanceof Array, Array.from(nodeDom))
```
> - 扩展运算符[es6扩展运算符飞机票](http://es6.ruanyifeng.com/#docs/destructuring) 
```javascript
console.log('扩展运算符', Array.isArray([...nodeDom]), [...nodeDom])
```
> - [].slice.call()
```javascript
console.log('slice.call()', Array.isArray([].slice.call(nodeDom)), [].slice.call(nodeDom))
```
> - [].slice.apply()
```javascript
console.log('slice.apply()', Array.isArray([].slice.apply(nodeDom)), [].slice.apply(nodeDom))
```

> - es6的Symbol配合[].concat() 方法 [Symbol飞机票](https://segmentfault.com/a/1190000010754245)
```javascript
nodeDom[Symbol.isConcatSpreadable] = true
console.log('Symbol', Array.isArray([].concat(nodeDom)), [].concat(nodeDom))
```

## addClass 方法
> - 看名字就清楚了这个方法的意思。给DOM元素添加className类名
> - 方法的内部逻辑分为两种情况，一种是给单个DOM元素添加className名，另一种情况是给一个集合的DOM元素添加className名
> - 返回AsherDom实例对象。用于链式调用
### 单个DOM元素添加类名的逻辑：
> 1. 先拿到DOM对象的className属性的值
> 2. 拿到值之后以' '(空格)进行字符串切割（''.split(' ')）返回数组（如果拿到值的数据类型为String, 进行这步操作，反之则直接操作第三步）
> 3. 判断数组中每一项的值有没有与用户给的重复, 重复不添加，反之不添加
### 拿到DOM对象的className属性的值，常用方式：
```javascript
// DOM.className ===> 返回一个字符串
console.log(this.dom.className)
// DOM.getAttribute(attr) ===> 返回一个字符串
console.log(this.dom.getAttribute('class'))
// DOM.classList ===> 返回一个数组
console.log(this.dom.classList)
```
### addClass方法中单个DOM对象的情况下的逻辑代码:
```javascript
let nameArr = [...this.dom.classList]
let i = 0
let len = nameArr.length
for (; i < len; i++) {
  if (nameArr[i] === className) return false
}
nameArr.push(className)
this.dom.className = nameArr.join(' ')
```
### forEach循环遇坑记：
> 在写上面那段代码之前，用的不是for循环，而是for循环的语法糖：forEach方法。但是在开发过程中遇到了一个问题，当匹配到当前className 与 要添加的className相等时。并没有阻止后续代码的执行，这就造成了一个bug。类名会重复添加，即使已经存在。虽然没有太大问题，但是这样会平白消耗页面性能，并且每个码农都是追求完美的人嘛~。以下是BUG代码重现：
```javascript
nameArr.forEach(item => {
  if (item === className) return false
})
nameArr.push(className)
this.dom.className = nameArr.join(' ')
```
> - 上面forEach代码的理想逻辑是：如果遇到数组中的item与className相等就阻止下面的代码执行
> - 可是事与愿违，forEach循环之后，还是会往nameArr中添加内容，并不会阻止代码。阻止的只是forEach代码中的即时函数（箭头函数）的内部的逻辑
> - forEach循环接收一个回调函数，每一次循环都会有一个回调函数，函数会有作用域。
> - 所以forEach循环中的即时函数是子作用域，return 阻止的也是子作用域内的代码执行而不会影响到forEach方法所在的作用域内的代码逻辑
> - 以下代码是简单模拟Array.prototype.forEach()方法的内部逻辑：
```javascript
let forEach = (arr, fn) => {
  for (let i = 0, len = arr.length; i < len; i++) {
     fn && fn(arr[i], i)
  }
}
forEach([10, 9, 8, 7, 6, 5, 4, 3, 2, 1], (item, index) => {
  console.log(`index：${index}`, `item：${item}`)
})
```
### 多个DOM添加className (数组集合)的情况
> 上面的代码是单个DOM对象添加className,逻辑还是非常的简单的。而多个DOM添加className,只是比单个DOM对象添加className多了一个步骤：从数组中拿出每一个DOM，然后给每一个DOM添加className
> - 依据上述这种逻辑，我们可以把单个DOM对象添加className封装成一个函数
> - 这样就可以减少重复臃肿的代码。再说了，不会偷懒的程序猿不是一个好程序猿
### DOM添加className的封装
```javascript
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
```
> 该方法接收两个参数，一个是className(需要添加的className名称)，另一个参数为DOM对象
> 方法封装完成之后我们只需要在多个DOM对象的情况下调用就可了。下面我们来看下AsherDom类的整体逻辑
```javascript
export default class AsherDom {
  constructor(el) {
    this.dom = null
    if (typeof el === 'string') {
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

  // 判断是不是类数组，如果是则返回数组，如果不是则返回源对象
  static isArr(nodeDom) {
    if (nodeDom.length) {
      nodeDom[Symbol.isConcatSpreadable] = true
      return [].concat(nodeDom)
    }
    return false
  }
}
```