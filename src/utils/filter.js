import Vue from 'vue'

Vue.filter('timeBefore', (date) => {
  if (!date) {
    return ''
  }
  let dateee = new Date(date).toJSON()
  let dateTimeStamp  = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'') 
  let sTime = new Date(dateTimeStamp).getTime()
  let now = new Date().getTime()
  let dvalue = now - sTime
  let minTime = 60 * 1000
  let hourTime = 60 * 60 * 1000
  let dayTime = 24 * hourTime
  let monthTime = 30 * dayTime
  let yearTime = 12 * monthTime
  if (dvalue < minTime) {
    return '刚刚'
  } else if (dvalue >= minTime && dvalue < hourTime) {
    return parseInt(dvalue / minTime) + '分钟前'
  } else if (dvalue >= hourTime && dvalue < dayTime) {
    return parseInt(dvalue / hourTime) + '小时前'
  } else if (dvalue >= dayTime && dvalue < monthTime) {
    return parseInt(dvalue / dayTime) + '天前'
  } else if (dvalue >= monthTime && dvalue < yearTime) {
    return parseInt(dvalue / monthTime) + '月前'
  } else if (dvalue >= yearTime) {
    return parseInt(dvalue / yearTime) + '年前'
  }
})