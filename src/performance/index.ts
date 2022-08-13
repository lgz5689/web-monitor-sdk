import { dns } from './dns'
import { onLoad } from './onLoad'
import { paint } from './paint'

export default function performance() {
  dns()
  onLoad()
  paint()
}
