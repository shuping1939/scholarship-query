# 叔蘋奖学金得奖信息查询系统

![项目截图](./assets/Screenshot.png) 

## 项目概述
叔蘋奖学金得奖信息查询系统，支持通过学号、姓名、拼音及学校等多条件实时检索获奖信息。数据采用分片加载机制，具备响应式设计和友好的移动端体验。

## 相关资源
- [项目演示主页](https://shuping1939.github.io/scholarship-query/)
- [项目源于:KangningYuan](https://github.com/kangningyuan/scholarship-query)

## 技术栈
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?logo=githubpages)

## 功能特性
- 🚀 实时模糊搜索（400ms防抖）
- 🔍 多条件匹配：学号/中文名/拼音/学校
- 📱 响应式布局（适配移动端）
- 📊 数据分片加载（支持大规模数据集）
- 🛠 自动错误处理与加载状态提示

## 项目结构
```bash
scholarship-query/
├── assets/               # 静态资源
├── data/                 # 数据文件（自动生成）
│   ├── chunk_000.json
│   └── ...
├── css/
│   └── style.css         # 样式表
├── js/
│   └── search.js         # 核心逻辑
├── index.html            # 主页面
└── README.md             # 项目文档
```


## 功能实现

### 流程
```bash
    前端 -->> CDN: 请求分片数据
    CDN -->> 前端: JSON响应
    前端 -->> 前端: 合并数据
    前端 -->> DOM: 搜索、更新统计信息
```

## 开发指南

### 数据预处理
1. 将元数据通过预处理分割为多个chunk，以json格式存储
### 加载
2. 利用![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?logo=githubpages)静态网页的功能实现互联网接入
### 核心搜索功能
3. 由于是静态网页，故将搜索功能集中于前端，利用CDN加速缓存数据，通过分片加载载入全部数据，进行模糊匹配


## 开源许可证

[MIT License](LICENSE)

## 联系
> 🙇‍♂️: 袁康宁 -- 上海叔蘋同学会IT组  
> 💻：[KangningYuan](https://github.com/kangningyuan)
> 📧: yuankangning@outlook.com
