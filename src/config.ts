const config = {
  // 修改 url 为真实服务器地址
  url: '',
  // 所以数据上报都会携带 appid
  appid: '',
  // dev模式 开启后，取消上报数据到服务器，改为控制台打印出来
  isDev: false,
}

export const setConfig = (url: string, appid: string, isDev: boolean) => {
  config.url = url
  config.appid = appid
  config.isDev = isDev
}

export default config
