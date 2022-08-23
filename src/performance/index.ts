import { dns } from './dns'
import { handleFetch } from './fetch'
import { onLoad } from './onLoad'
import { paint } from './paint'
import { handleXHR } from './xhr'

export default function performance() {
  dns()
  handleFetch()
  onLoad()
  paint()
  handleXHR()
}
