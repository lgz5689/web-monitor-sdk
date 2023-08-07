import config from '../config'
import { addCache, getCache, clearCache } from './cache'

// 数据上报
export const report = (data: any, isImmediate: boolean = false) => {
  const { appid, url, isDev } = config

  const reportData = JSON.stringify({
    appid,
    reportTime: new Date().getTime(),
    data: [...data],
  })

  // dev模式 改为全部使用console.log打印
  if (isDev) {
    console.log(JSON.parse(reportData))
    return
  }

  // 立即上报数据
  if (isImmediate) {
    window.navigator.sendBeacon(url, reportData)
    return
  }

  // 延迟上报数据
  if (window.requestIdleCallback) {
    window.requestIdleCallback(
      () => {
        window.navigator.sendBeacon(url, reportData)
      },
      { timeout: 3000 }
    )
  } else {
    setTimeout(() => {
      window.navigator.sendBeacon(url, reportData)
    })
  }
}

let timer: NodeJS.Timeout | null = null
// 延迟上报
export const lazyReport = (data: any, time = 3000) => {
  addCache(data)

  clearTimeout(Number(timer))
  timer = setTimeout(() => {
    const data = getCache()
    if (data.length) {
      report(data)
      clearCache()
    }
  }, time)
}
