import Vue from 'vue';
import App from './app.vue';
import 'muse-ui/lib/styles/base.less';
// import 'muse-ui/lib/styles/theme.less';
import 'assets/css/global.less';
import 'assets/fonts/iconfont.css';
var vm;
if (process.env === 'production') {
  window.apiready = function () {
    vm=new Vue({
      el: '#app',
      render: h => h(App)
    });
  };
} else {
  vm=new Vue({
    el: '#app',
    render: h => h(App)
  });
}
