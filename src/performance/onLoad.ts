import { lazyReport } from '../utils/report'

export const onLoad = () => {
  const arr = ['load', 'DOMContentLoaded']

  arr.forEach((event) => {
    window.addEventListener(event, () => {
      lazyReport({
        pageUrl: window.location.href,
        type: 'performance',
        subType: event,
        startTime: performance.now(),
      })
    })
  })
}
