const cache: any[] = []

export function getCache() {
  return JSON.parse(JSON.stringify(cache))
}

export function addCache(data: any) {
  cache.push(data)
}

export function clearCache() {
  cache.length = 0
}
