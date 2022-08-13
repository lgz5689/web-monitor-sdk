import { lazyReport } from '../utils/report'

export const dns = () => {
  const PerformanceNavigationTiming: any = window.performance.getEntries()[0]
  const start = PerformanceNavigationTiming.domainLookupStart
  const end = PerformanceNavigationTiming.domainLookupEnd
  const time = end - start
  // dns
  lazyReport({
    type: 'performance',
    subType: 'dns',
    pageUrl: window.location.href,
    time,
  })
}
