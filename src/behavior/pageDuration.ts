import { report } from '../utils/report'

export function pageDuration() {
  const url = window.location.href

  window.addEventListener(
    'beforeunload',
    () => {
      report({
        type: 'behavior',
        subType: 'pageDuration',
        pageUrl: url,
        duration: performance.now(),
      })
    },
    true
  )
}
