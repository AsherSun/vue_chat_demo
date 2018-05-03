import Dom from './dom'
/*
 * DOM操作类库
 * @param { DOM } el ===> DOM对象
 */
let dom = el => new Dom(el)
/*
 * 移动端 rem 设置 ---- iphone6 1rem === 50px
 * @param { String } grid ===> 将移动端设备宽度分成几份，默认7.5份
 */
const rem = (grid = 7.5) => {
  let html = document.documentElement
  let equipmentWidth = html.getBoundingClientRect().width
  if (equipmentWidth > 640) {
    equipmentWidth = 640
  }
  html.style.fontSize = (equipmentWidth / grid) + 'px'
}

export default {
  dom,
  rem
}
