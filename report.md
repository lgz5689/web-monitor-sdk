# 1. 数据上报文档

## 1.1 上报说明

- 数据返回格式统一使用 JSON

### 1.1.1 请求类型
- POST（CREATE）：在服务器新建一个资源。

### 1.1.2 通用上报参数

| *参数名*     | *类型*                | *说明*                                 |
| ----------- | --------------------- | -------------------------------------- |
| appid       | string                | appid会随每次上报带上                   |
| reportTime  | number                | 也可以由服务端收集，误差0-3s             |


## 1.2 异常监控

### 1.2.1. 资源异常

- 请求参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string |  error          |
| subType      | 详细类型     | string | resource(资源)   |
| resourceUrl  | 资源地址     | string |                 |
| resourceHtml | html元素     | string |                 |
| resourceType | 元素类型     | string | html标签，如IMG  |
| startTime    | 时间         | number | 毫秒             |

- 请求数据

```json
{
    "pageUrl": "http://127.0.0.1:5500/examples/error.html",
    "type": "error",
    "subType": "resource",
    "resourceUrl": "http://xxxss.ss.com/a.jpg",
    "resourceHtml": "<img src=\"http://xxxss.ss.com/a.jpg\" alt=\"\">",
    "resourceType": "IMG",
    "startTime": 641.1000000014901
}
```

### 1.2.2 Promise异常

- 上报参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string |  error          |
| subType      | 详细类型     | string | promise         |
| reason       | 原因         | string | 原因和堆栈信息，带换行符 |
| startTime    | 时间         | number | 毫秒             |

- 上报数据

```json
{
    "pageUrl": "http://127.0.0.1:5500/examples/error.html",
    "type": "error",
    "subType": "promise",
    "reason": "Error: promise\n    at test (http://127.0.0.1:5500/examples/error.html:61:29)\n    at http://127.0.0.1:5500/examples/error.html:64:5",
    "startTime": 129.40000000223517
}
```

### 1.2.2 javascript异常

- 上报参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string |  error          |
| subType      | 详细类型     | string | js               |
| msg          | 错误信息      | string |                  |
| line         | 行           | number |              |
| column       | 列           | number |              |
| error        | 错误对象     | string | 错误信息和堆栈信息，带换行符|
| startTime    | 时间         | number | 毫秒             |

- 上报数据

```json
{
    "pageUrl": "http://127.0.0.1:5500/examples/error.html",
    "type": "error",
    "subType": "js",
    "msg": "Uncaught Error: test",
    "line": 68,
    "column": 11,
    "error": "Error: test\n    at http://127.0.0.1:5500/examples/error.html:68:11",
    "startTime": 130.10000000149012
}
```

### 1.2.3 用户自定义错误

- 上报参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string |  error          |
| subType      | 详细类型     | string | api               |
| errorInfo    | 错误信息      | string |                  |
| error        | 错误对象     | string |  |

- 上报数据

```json
{
    "pageUrl": "http://127.0.0.1:5500/examples/error.html",
    "type": "error",
    "subType": "api",
    "errorInfo": "Uncaught Error: test",
    "error": "Error: test\n    at http://127.0.0.1:5500/examples/error.html:68:11",
}
```

## 1.3 用户行为数据

### 1.3.1 点击行为

- 请求参数

| 参数名       | 参数说明         | 类型   | 备注            |
| ------------ | -------------- |-------| --------------- |
| pageUrl      | 地址           | string |                 |
| type         | 类型           | string | behavior          |
| subType      | 详细类型       | string | click    |
| eventType    | 事件类型       | string | 'mousedown'电脑端, 'touchstart'移动端 |
| pageHeight   | 页面高度       | number |                 |
| scrollTop    | 滚动条滚动距离  | number |                |
| tagName      | 元素类型        | string | html标签，如DIV |
| paths        | 冒泡顺序        | string[] |   |
| startTime    | 时间            | number | 毫秒  |
| outerHTML    | 被点击元素        | string |   |
| innerHTML    | 元素内容        | string |   |
| position     | 元素定位        | { top:number, left:number } |    |
| style        | 元素长宽        | { width:number, height:number } |    |
| viewport     | 视口大小        | { width:number, height:number } |    |

- 请求数据

```json
{
    "type": "behavior",
    "subType": "click",
    "eventType": "mousedown",
    "pageURL": "http://127.0.0.1:5500/examples/behavior/onClick.html",
    "pageHeight": 1016,
    "scrollTop": 88,
    "tagName": "DIV",
    "paths": [
        "DIV",
        "BODY",
        "HTML"
    ],
    "startTime": 2140.300000000745,
    "outerHTML": "<div style=\"width: 200px;height: 300px;background: forestgreen  ;\">\n    123\n  </div>",
    "innerHTML": "\n    123\n  ",
    "position": {
        "top": -80,
        "left": 8
    },
    "style": {
        "width": 200,
        "height": 300
    },
    "viewport": {
        "width": 726,
        "height": 928
    }
}
```

### 1.3.2 页面停留时间

- 上报参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string |  behavior          |
| subType      | 详细类型     | string | pageDuration       |
| duration     | 停留时间      | number | 毫秒             |

- 上报数据

```json
{
    "pageUrl": "http://127.0.0.1:5500/examples/error.html",
    "type": "behavior",
    "subType": "pageDuration",
    "duration": 130.10000000149012
}
```

### 1.3.3 页面浏览量pv

- 上报参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string |  behavior          |
| subType      | 详细类型     | string | pageView       |

- 上报数据

```json
{
    "pageUrl": "http://127.0.0.1:5500/examples/error.html",
    "type": "behavior",
    "subType": "pageView",
}
```


## 1.4 关键性能数据

### 1.4.1 DNS耗时

- 请求参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string | performance          |
| subType      | 详细类型     | string | dns   |
| time    | 时间         | number | 毫秒             |

- 请求数据

```json
{
    "pageUrl": "http://127.0.0.1:5500/examples/error.html",
    "type": "performance",
    "subType": "dns",
    "time": 130.10000000149012
}
```

### 1.4.2 白屏时间fp

- 请求参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string | performance          |
| subType      | 详细类型     | string | first-paint   |
| time         | 时间         | number | 毫秒             |

- 请求数据

```json
{
    "type": "performance",
    "subType": "first-paint",
    "pageUrl": "http://127.0.0.1:5500/examples/performance/fcp.html",
    "time": 819.5999999940395
}
```

### 1.4.3 第一个元素渲染完成fcp

- 请求参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string | performance          |
| subType      | 详细类型     | string | first-contentful-paint   |
| time         | 时间         | number | 毫秒             |

- 请求数据

```json
{
    "type": "performance",
    "subType": "first-contentful-paint",
    "pageUrl": "http://127.0.0.1:5500/examples/performance/fcp.html",
    "time": 110.59999999403954
}
```

### 1.4.4 页面所有资源加载完毕

- 请求参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string | performance          |
| subType      | 详细类型     | string | load   |
| startTime         | 时间         | number | 毫秒             |

- 请求数据

```json
{
    "pageUrl": "http://127.0.0.1:5500/examples/performance/onLoad.html",
    "type": "performance",
    "subType": "load",
    "startTime": 143.59999999403954
}
```

### 1.4.5 DOM渲染完成

- 请求参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string | performance          |
| subType      | 详细类型     | string | DOMContentLoaded   |
| startTime    | 时间         | number | 毫秒             |

- 请求数据

```json
{
    "pageUrl": "http://127.0.0.1:5500/examples/performance/onLoad.html",
    "type": "performance",
    "subType": "DOMContentLoaded",
    "startTime": 117.80000000447035
}
```

### 1.4.6 fetch

- 请求参数

| 参数名       | 参数说明      | 类型   | 备注            |
| ------------ | ------------ |-------| --------------- |
| pageUrl      | 地址         | string |                 |
| type         | 类型         | string | performance          |
| subType      | 详细类型     | string | fetch   |
| startTime    | 开始时间         | number | 毫秒             |
| endTime      | 结束时间         | number | 毫秒             |
| duration     | 耗时         | number | 毫秒             |
| success      | 请求是否成功         | boolean |              |
| url          | 请求地址        | string |              |
| method       | 请求方法         | string |              |

- 请求数据

```json
{
    "pageUrl": "http://127.0.0.1:5500/examples/performance/onLoad.html",
    "startTime": 1660745060832,
    "endTime": 1660745060926,
    "duration": 94,
    "status": 200,
    "success": true,
    "url": "https://mock.presstime.cn/mock/62fcf50e119c3300714fc01b/example/mock",
    "method": "GET",
    "subType": "fetch",
    "type": "performance"
}
```
