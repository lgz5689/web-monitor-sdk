import { lazyReport } from '../utils/report'

export function pageDuration() {
  const url = window.location.href

  window.addEventListener(
    'beforeunload',
    () => {
      lazyReport({
        type: 'behavior',
        subType: 'pageDuration',
        pageUrl: url,
        duration: performance.now(),
      })
    },
    true
  )
}
