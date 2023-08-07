import { lazyReport } from '../utils/report'

const originalProto = XMLHttpRequest.prototype
const originalOpen = originalProto.open
const originalSend = originalProto.send

interface OriginalOpen extends XMLHttpRequest {
  method?: string
  url?: string
}

interface OriginalSend extends XMLHttpRequest {
  method?: string
  url?: string
  startTime?: number
  endTime?: number
  duration?: number
}

export function handleXHR() {
  originalProto.open = function newOpen(method: string, url: string) {
    const that: OriginalOpen = this
    that.method = method
    that.url = url
    originalOpen.call(that, method, url, true)
  }

  originalProto.send = function newSend(...res) {
    const body = res[0]
    const that: OriginalSend = this
    that.startTime = Date.now()
    const onLoadend = () => {
      that.endTime = Date.now()
      that.duration = that.endTime - (that.startTime || 0)
      const reportData = {
        pageUrl: window.location.href,
        method: that.method,
        status: that.status,
        duration: that.duration,
        startTime: that.startTime,
        endTime: that.endTime,
        url: that.url,
        success: that.status >= 200 && that.status < 300,
        subType: 'xhr',
        type: 'performance',
      }
      lazyReport(reportData)

      this.removeEventListener('loadend', onLoadend, true)
    }

    this.addEventListener('loadend', onLoadend, true)
    originalSend.call(this, body)
  }
}
