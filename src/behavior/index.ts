import { onClick } from './onClick'
import { pageDuration } from './pageDuration'
import { pageView } from './pageView'

export default function behavior() {
  pageView()
  pageDuration()
  onClick()
}
