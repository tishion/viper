# 多媒体处理系统

## 环境要求

- 安装nodejs
- 安装MongoDB
- 修改config.js文件中的配置
```javascript
"use strict";

module.exports = {
  // 并行执行的任务数量
  CONCURRENT_RUNS: 20,

  // MongoDB连接字符串
  MONGO_DB_CONN_STRING: "mongodb://127.0.0.1/video-processing",

  // 工作控件根目录
  WORK_SPACE_ROOT: "C:\\media-process\\workspace",
};

```

## 启动服务

以开发预览模式启动服务：

 `npm run dev`


以生产环境模式启动服务：

`npm start`


## 任务Dashboard

浏览器中打开：[http://localhost:3000/dash/](http://localhost:3000/dash/)

## 任务API：

### 获取可用Filter列表
GET   /api/filter

反回:
```json

```

### 添加新的JOB
POST /api/filter/job/create

BODY:
```json
{
  "url": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_10MB.mp4",
  "filter": "flip-h",
  "test-field": "自定义字段"
}
```

返回：
```json
{
  "id": "c2b20625-d299-49c8-a6bc-398b859263ea",
  "stage": "queued",
  "createdAt": "2022-10-25T15:29:45.079Z",
  "params":{
    "url": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_10MB.mp4",
    "filter": "flip-h",
    "test-field": "自定义字段"
  }
}
```

### 获取JOB信息
GET   /api/filter/job/{id}
- id： 任务id

返回：
```json
{
  "id": "af5ffb47-efc2-46b0-b895-dca6c77e4d50",
  "stage": "completed",
  "createdAt": "2022-10-24T17:25:56.761Z",
  "startedAt": "2022-10-24T17:25:56.959Z",
  "status": "succeeded",
  "finishedAt": "2022-10-24T17:35:29.876Z",
  "params":{
    "url": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_10MB.mp4",
    "filter": "flip-h",
    "test-field": "自定义字段"
  },
  "result":{
    "link": "C:\\Users\\sheen\\Projects\\media-process\\workspace\\af5ffb47-efc2-46b0-b895-dca6c77e4d50\\out_caminandes_llamigos_480p.mp4"
   }
}
```

### 禁止JOB
POST /api/filter/job/disable

BODY:
```json
{
  "id": "4a843fac-9bc6-43c1-ad58-e0d2f2356dcd"
}
```

返回：
```json
{
  "count": 0
}
```

### 查询JOB
POST /api/filter/job/find

BODY:
```json
{
  "filter": {
    "status": "succeeded"
  },
  "sort": {
    "finishedAt": -1
  }
}
```

返回：
```json
[
  {
    "id":"af5ffb47-efc2-46b0-b895-dca6c77e4d50",
    "stage":"completed",
    "createdAt":"2022-10-24T17:25:56.761Z",
    "startedAt":"2022-10-24T17:25:56.959Z",
    "status":"succeeded",
    "finishedAt":"2022-10-24T17:35:29.876Z",
    "params":{
      "url": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_10MB.mp4",
      "filter": "flip-h",
    },
    "result":{
      "link":"C:\\Users\\sheen\\Projects\\media-process\\workspace\\af5ffb47-efc2-46b0-b895-dca6c77e4d50\\out_caminandes_llamigos_480p.mp4"
    }
  },
  {
    "id":"ab826604-7c5c-468f-92bb-36c6c4bec151",
    "stage":"completed",
    "createdAt":"2022-10-24T17:25:48.562Z",
    "startedAt":"2022-10-24T17:25:48.568Z",
    "status":"succeeded",
    "finishedAt":"2022-10-24T17:35:14.042Z",
    "params":{
      "url": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_10MB.mp4",
      "filter": "flip-h",
    },
    "result":{
      "link":"C:\\Users\\sheen\\Projects\\media-process\\workspace\\ab826604-7c5c-468f-92bb-36c6c4bec151\\out_caminandes_llamigos_480p.mp4"
    }
  },
  {
    "id":"d75a6be8-4f9a-45ca-be8c-30e43700f972",
    "stage":"completed",
    "createdAt":"2022-10-24T17:25:41.088Z",
    "startedAt":"2022-10-24T17:25:41.097Z",
    "status":"succeeded",
    "finishedAt":"2022-10-24T17:31:45.986Z",
    "params":{
      "url": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_10MB.mp4",
      "filter": "flip-h",
    },
    "result":{
      "link":"C:\\Users\\sheen\\Projects\\media-process\\workspace\\d75a6be8-4f9a-45ca-be8c-30e43700f972\\out_caminandes_llamigos_480p.mp4"
    }
  },
  {
    "id":"6a51ba44-05e4-40b5-be66-db5d489fa184",
    "stage":"completed",
    "createdAt":"2022-10-24T17:22:02.362Z",
    "startedAt":"2022-10-24T17:22:02.368Z",
    "status":"succeeded",
    "finishedAt":"2022-10-24T17:24:11.446Z",
    "params":{
      "url": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_10MB.mp4",
      "filter": "flip-h",
    },
    "result":{
      "link":"C:\\Users\\sheen\\Projects\\media-process\\workspace\\6a51ba44-05e4-40b5-be66-db5d489fa184\\out_caminandes_llamigos_720p.mp4"
    }
  },
  {
    "id":"da31d58f-fb35-476f-b8b3-be002d9fc67b",
    "stage":"completed",
    "createdAt":"2022-10-24T17:11:59.342Z",
    "startedAt":"2022-10-24T17:11:59.349Z",
    "status":"succeeded",
    "finishedAt":"2022-10-24T17:12:10.527Z",
    "params":{
      "url": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_10MB.mp4",
      "filter": "flip-h",
    },
    "result":{
      "link":"C:\\Users\\sheen\\Projects\\media-process\\workspace\\da31d58f-fb35-476f-b8b3-be002d9fc67b\\out_Big_Buck_Bunny_1080_10s_5MB.mp4"
    }
  },
  {
    "id":"d4896b2b-5ffd-4931-bc09-a9741e1b149b",
    "stage":"completed",
    "createdAt":"2022-10-24T17:10:02.414Z",
    "startedAt":"2022-10-24T17:10:02.427Z",
    "status":"succeeded",
    "finishedAt":"2022-10-24T17:10:10.027Z",
    "params":{
      "url": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_10MB.mp4",
      "filter": "flip-h",
    },
    "result":{
      "link":"C:\\Users\\sheen\\Projects\\media-process\\workspace\\d4896b2b-5ffd-4931-bc09-a9741e1b149b\\out_Big_Buck_Bunny_360_10s_10MB.mp4"
    }
  }
]
```

