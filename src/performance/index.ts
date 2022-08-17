import { dns } from './dns'
import { handleFetch } from './fetch'
import { onLoad } from './onLoad'
import { paint } from './paint'

export default function performance() {
  dns()
  handleFetch()
  onLoad()
  paint()
}
