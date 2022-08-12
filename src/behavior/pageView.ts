import { lazyReport } from '../utils/report'

export function pageView() {
  const url = window.location.href

  window.addEventListener(
    'load',
    () => {
      lazyReport({
        type: 'behavior',
        subType: 'pageView',
        pageUrl: url,
      })
    },
    true
  )
}
