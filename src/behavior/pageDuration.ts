import { report } from '../utils/report'

// 页面停留时间
export function pageDuration() {
  const url = window.location.href

  // 监听浏览器关闭事件
  window.addEventListener(
    'beforeunload',
    () => {
      report([
        {
          type: 'behavior',
          subType: 'pageDuration',
          pageUrl: url,
          duration: performance.now(),
        },
      ])
    },
    true
  )
}
