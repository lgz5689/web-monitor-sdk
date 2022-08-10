import { setAppid } from './config'
import { error } from './error/index'

const app = {
  init(appid: string) {
    setAppid(appid)
    error()
  },
}

export default app
