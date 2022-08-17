import { onClick } from './onClick'
import { pageDuration } from './pageDuration'
import { pageHide } from './pageHide'
import { pageView } from './pageView'

export default function behavior() {
  pageView()
  pageDuration()
  onClick()
  pageHide()
}
