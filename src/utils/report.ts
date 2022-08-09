import config from '../config'
import { addCache, getCache, clearCache } from './cache'

const url = config.url + config.appid

export function xhr(data: any) {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.send(JSON.stringify(data))
}

export const report = (data: any) => {
  const sendBeacon = window.navigator.sendBeacon ? window.navigator.sendBeacon : xhr

  if (window.requestIdleCallback) {
    window.requestIdleCallback(
      () => {
        sendBeacon(url, JSON.stringify(data))
      },
      { timeout: 3000 }
    )
  } else {
    setTimeout(() => {
      sendBeacon(url, JSON.stringify(data))
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
