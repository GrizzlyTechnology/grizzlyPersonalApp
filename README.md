# 大灰熊app学生版

## 快速上手

### 安装依赖包

```bash
npm i
```

### 启动开发环境

```bash
npm start
```
### 测试环境产出

```bash
npm run test
```

### 生产环境产出

```bash
npm run pro
```

### 真机调试和发布

> 同步 `dist` 目录下的所有文件即可。

## 脚手架目录结构

```
/root
 ├─ /dist              // 产出目录
 ├─ /src
 │   ├─ /assets        // 公共静态资源
 │   │   ├─ /css       // 样式文件
 │   │   └─ /images    // 图片文件
 │   ├─ /components    // vue 组件
 │   ├─ /utils         // 工具方法
 │   ├─ /service
 │   │   ├─ index.js   // api 请求
 │   │   └─ mock.js    // 数据 mock
 │   └─ /views         // 工具方法
 │       └─ /namespace // 页面
 ├─ .babelrc           // 代码风格配置
 ├─ .editorconfig      // 代码风格配置
 ├─ .eslintrc          // eslint 配置
 ├─ .gitignore         // git 忽略配置
 ├─ .postcssrc.js      // 样式后处理器配置
 ├─ config.xml         // apicloud app 配置
 ├─ package.json       // 项目配置
 ├─ README.md          // 项目说明
 └─ webpack.config.js  // 产出配置
```
## namespace页面目录结构和说明
```
/namespace          // 命名空间
 ├─ app.html       // 页面模板（一般不用编辑）
 ├─ app.js         // 入口 js（一般不用编辑）
 └─ app.vue        // 页面业务
```
> 一个views目录下namespace目录为命名空间目录，命名空间目录必须有app.html，app.js和app.vue文件，目录会在产出后生成对应namespace.html，namespace.js和namespace.css。例如我有一个如下目录结构的：

```
/src
 └─ /views
     └─ /index
         ├─ app.html
         ├─ app.js
         ├─ app.vue
         └─ /aboutUs
             ├─ app.html
             ├─ app.js
             └─ app.vue
```
>那么执行编译产出后views目录下的文件出结果如下：
```
/dist
 ├─ /index
 │   ├─ aboutUs.css
 │   ├─ aboutUs.js
 │   └─ aboutUs.html
 ├─ index.css
 ├─ index.js
 └─ index.html
```
