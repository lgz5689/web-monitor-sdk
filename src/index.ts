import { setAppid } from './config'
import { error } from './error/index'
import performance from './performance/index'

const app = {
  init(appid: string) {
    if (!window.navigator.sendBeacon) {
      throw Error('sendBeacon is not supported, please use Chrome or Firefox')
    }
    setAppid(appid)

    error()
    performance()
  },
}

export default app
