const config = {
  url: 'http://localhost:3000/api/v1/',
  appid: '',
}

export const setAppid = (appid: string) => {
  config.appid = appid
}

export default config
