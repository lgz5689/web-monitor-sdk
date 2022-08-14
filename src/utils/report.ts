import config from '../config'
import { addCache, getCache, clearCache } from './cache'

const url = config.url + config.appid

export const report = (data: any, isImmediate: boolean = false) => {
  const sendBeacon = window.navigator.sendBeacon

  const reportData = {
    appid: config.appid,
    reportTime: new Date().getTime(),
    ...data,
  }

  if (isImmediate) {
    sendBeacon(config.url, reportData)
    return
  }

  if (window.requestIdleCallback) {
    window.requestIdleCallback(
      () => {
        sendBeacon(url, JSON.stringify(reportData))
      },
      { timeout: 3000 }
    )
  } else {
    setTimeout(() => {
      sendBeacon(url, JSON.stringify(reportData))
    })
  }
}

let timer: any = null
export const lazyReport = (data: any, time = 3000) => {
  addCache(data)

  clearTimeout(timer)
  timer = setTimeout(() => {
    const data = getCache()
    if (data.length) {
      report(data)
      clearCache()
    }
  }, time)
}
