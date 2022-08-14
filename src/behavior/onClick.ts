import { lazyReport } from '../utils/report'

export const onClick = () => {
  const url = window.location.href
  const arr = ['mousedown', 'touchstart']

  arr.forEach((item) => {
    let time: NodeJS.Timeout
    window.addEventListener(item, (event: any) => {
      clearTimeout(time)

      time = setTimeout(() => {
        const target = event.target
        const { top, left } = target?.getBoundingClientRect()

        lazyReport({
          type: 'behavior',
          subType: 'click',
          eventType: item,
          pageUrl: url,
          pageHeight: document.documentElement.scrollHeight || document.body.scrollHeight,
          scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
          tagName: target?.tagName,
          paths: event.path?.map((item: any) => item.tagName).filter(Boolean),
          startTime: event.timeStamp,
          outerHTML: target?.outerHTML,
          innerHTML: target?.innerHTML,
          position: {
            top,
            left,
          },
          style: {
            width: target?.offsetWidth,
            height: target?.offsetHeight,
          },
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
        })
      }, 500)
    })
  })
}
