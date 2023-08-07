# kevin-monitor-sdk

自动收集、上报Web页面关键数据。包括异常监控、关键性能数据监控、用户行为数据、http请求监控。

[数据上报类型](https://github.com/lgz5689/web-monitor-sdk/blob/main/report.md)

## 使用

### HTML 中引入使用
```html
<script src="../dist/monitor.js"></script>
<script>
  // 初始化 填写appid
  _monitor.init('xxxxxx')
</script>
```

### 在 npm 中使用
安装依赖
```
yarn add kevin-monitor-sdk
```
引入
```javascript
import _monitor from 'kevin-monitor-sdk'

// 初始化 填写appid
_monitor.init('xxxxxx')
```

### 手动上报错误API
- 用于 Vue/React 框架错误捕获或者其他需要手动上报错误的地方。

```javascript
// Vue
// https://cn.vuejs.org/api/application.html#app-config-errorhandler
const app = createApp(App)
app.config.errorHandler = (err, instance, info) => {
  _monitor.error(err,info)
}

// React
// https://zh-hans.reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends React.Component {
  ...
  componentDidCatch(error, errorInfo) {
    _monitor.error(err,info)
  }
  ...
}

// 手动上报错误
try{
  ...
}catch(err){
  _monitor.error('xx捕获错误',err)
}
```

## 开发

### 配置服务器 url
- 修改 src 目录下的 config.ts
```javascript
const config = {
  // 修改 url 为真实服务器地址
  url: '',
  appid: '',
}
```

### 安装依赖
```
yarn install
```

### 打包
```
yarn build
```