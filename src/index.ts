import { setConfig } from './config'
import { lazyReport } from './utils/report'
import behavior from './behavior/index'
import error from './error/index'
import performance from './performance/index'

interface InitData {
  url: string
  appid: string
  isDev?: boolean
}

const app = {
  init({ url = 'http://127.0.0.1:7001/report', appid = '', isDev = false }: InitData) {
    if (!window.navigator.sendBeacon) {
      throw Error('sendBeacon is not supported, please use Chrome or Firefox')
    }
    setConfig(url, appid, isDev)

    behavior()
    error()
    performance()
  },
  error(error: unknown, errorInfo: string) {
    lazyReport({
      type: 'error',
      subType: 'api',
      pageUrl: window.location.href,
      error: JSON.stringify(error),
      errorInfo,
    })
  },
}

export default app
