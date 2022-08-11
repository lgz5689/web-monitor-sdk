import { lazyReport } from '../utils/report'

export const onLoad = () => {
  const arr = ['load', 'DOMContentLoaded']

  arr.forEach((event) => {
    window.addEventListener(event, () => {
      lazyReport({
        type: 'performance',
        subType: event,
        startTime: performance.now(),
      })
    })
  })
}
