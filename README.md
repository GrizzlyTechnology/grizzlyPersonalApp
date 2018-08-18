# 大灰熊app学生版
## 目录结构

```
/root
  ├─ dist/              // 产出目录
  ├─ src
  │   ├─ assets/        // 公共静态资源
  │   │   ├─ css        // 样式文件
  │   │   └─ images     // 图片文件
  │   ├─ components/    // vue 组件
  │   ├─ utils/         // 工具方法
  │   ├─ service/
  │   │   ├─ index.js   // api 请求
  │   │   └─ mock.js    // 数据 mock
  │   └─ views/         // 工具方法
  │       └─ namespace  // 页面
  ├─ .babelrc           // 代码风格配置
  ├─ .editorconfig      // 代码风格配置
  ├─ .eslintrc          // eslint 配置
  ├─ .gitignore         // git 忽略配置
  ├─ .postcssrc.js      // 样式后处理器配置
  ├─ config.xml         // apicloud 配置
  ├─ package.json       // 项目配置
  ├─ README.md          // 项目说明
  └─ webpack.config.js  // 产出配置
```
## 页面目录结构
```
/namespace           // 命名空间
  ├─ app.html       // 页面模板（一般不用编辑）
  ├─ app.js         // 入口 js（一般不用编辑）
  └─ app.vue        // 页面业务
```
