import { lazyReport } from '../utils/report'

const originalFetch = window.fetch

export function handleFetch() {
  window.fetch = function newFetch(url, config) {
    const startTime = Date.now()
    const reportData = {
      startTime,
      endTime: 0,
      duration: 0,
      status: 0,
      success: false,
      url,
      pageUrl: window.location.href,
      method: (config?.method || 'GET').toUpperCase(),
      subType: 'fetch',
      type: 'performance',
    }

    return originalFetch(url, config)
      .then((res) => {
        reportData.endTime = Date.now()
        reportData.duration = reportData.endTime - reportData.startTime

        const data = res.clone()
        reportData.status = data.status
        reportData.success = data.ok

        lazyReport(reportData)

        return res
      })
      .catch((err) => {
        reportData.endTime = Date.now()
        reportData.duration = reportData.endTime - reportData.startTime
        reportData.status = 0
        reportData.success = false

        lazyReport(reportData)

        throw err
      })
  }
}
