import { lazyReport } from '../utils/report'

export default function error() {
  const url = window.location.href

  // handle resource error
  window.addEventListener(
    'error',
    (e: any) => {
      if (!e.target) return

      if (e.target.src || e.target.href) {
        lazyReport({
          pageUrl: url,
          type: 'error',
          subType: 'resource',
          resourceUrl: e.target.src || e.target.href,
          resourceHtml: e.target.outerHTML,
          resourceType: e.target.tagName,
          startTime: e.timeStamp,
        })
      }
    },
    true
  )

  // handle unhandledrejection
  window.addEventListener('unhandledrejection', (e) => {
    lazyReport({
      pageUrl: url,
      type: 'error',
      subType: 'promise',
      reason: e.reason?.stack,
      startTime: performance.now(),
    })
  })

  // handle js error
  window.onerror = (msg, url, line, column, error) => {
    lazyReport({
      pageUrl: url,
      type: 'error',
      subType: 'js',
      msg,
      line,
      column,
      error: error?.stack,
      startTime: performance.now(),
    })
  }
}
