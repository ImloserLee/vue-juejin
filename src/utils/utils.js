export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

/**
 * 获取url中参数POSTID的值
 * @params url {string} 请求地址
 */
export function getUrlParam(url) {
  let urlArr = url.split('//')
  let start = urlArr[1].indexOf('/') + 1
  let relUrl = urlArr[1].substring(start)
  if (relUrl.indexOf('?') !== -1) {
    relUrl = relUrl.split('?')[0]
  }
  let postId = relUrl.split('/').slice(-1)[0]
  return postId
}