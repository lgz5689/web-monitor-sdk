import config from '../config'
import { addCache, getCache, clearCache } from './cache'

export const report = (data: any, isImmediate: boolean = false) => {
  const { appid, url } = config

  const reportData = JSON.stringify({
    appid,
    reportTime: new Date().getTime(),
    data: [...data],
  })

  if (isImmediate) {
    window.navigator.sendBeacon(url, reportData)
    return
  }

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
