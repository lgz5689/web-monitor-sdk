import { clearCache, getCache } from '../utils/cache'
import { report } from '../utils/report'

const immediatelyReport = () => {
  const data = getCache()
  if (data.length) {
    report(data, true)
    clearCache()
  }
}

export const pageHide = () => {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      immediatelyReport()
    }
  })

  // visibilityState 为 hidden 时，Safari不触发
  window.addEventListener('pagehide', () => {
    immediatelyReport()
  })
}
