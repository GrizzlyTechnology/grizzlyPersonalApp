import Vue from 'vue';
import App from './app.vue';
import 'muse-ui/lib/styles/base.less';
// import 'muse-ui/lib/styles/theme.less';
import 'assets/css/global.less';
import 'assets/fonts/iconfont.css';
window.apiready = function () {
  new Vue({
    el: '#app',
    render: h => h(App)
  });
};
