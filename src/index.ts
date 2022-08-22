import { setAppid } from './config'
import { lazyReport } from './utils/report'
import behavior from './behavior/index'
import error from './error/index'
import performance from './performance/index'

const app = {
  init(appid: string) {
    if (!window.navigator.sendBeacon) {
      throw Error('sendBeacon is not supported, please use Chrome or Firefox')
    }
    setAppid(appid)

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
