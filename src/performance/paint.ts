import { lazyReport } from '../utils/report'

export const paint = () => {
  const pageUrl = window.location.href

  const entryHandler = function (entryList: PerformanceObserverEntryList) {
    for (const entry of entryList.getEntries()) {
      // 监听 fcp
      if (entry.name === 'first-contentful-paint') {
        lazyReport({
          type: 'performance',
          subType: 'first-contentful-paint',
          pageUrl,
          time: entry.startTime,
        })
      }
      // 监听 fp
      if (entry.name === 'first-paint') {
        lazyReport({
          type: 'performance',
          subType: 'first-paint',
          pageUrl,
          time: entry.startTime,
        })
      }
    }
  }

  const observer = new PerformanceObserver(entryHandler)
  observer.observe({ type: 'paint', buffered: true })
}
