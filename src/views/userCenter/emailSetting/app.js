import Vue from 'vue';
import App from './app.vue';
import 'muse-ui/lib/styles/base.less';
import 'assets/fonts/iconfont.css';
import 'assets/css/global.less';

if (process.env !== 'development') {
  window.apiready = function () { document.body.addEventListener('touchstart',function(){});
    new Vue({
      el: '#app',
      render: h => h(App)
    });
  };
} else {
  new Vue({
    el: '#app',
    render: h => h(App)
  });
}
