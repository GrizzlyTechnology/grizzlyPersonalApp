import Vue from 'vue';
import App from './app.vue';
import theme from 'muse-ui/lib/theme';
import 'muse-ui/lib/styles/base.less';
// import 'muse-ui/lib/styles/theme.less';
import 'assets/css/global.less';
import 'assets/fonts/iconfont.css';

theme.add('bear', {
  primary: '#19AD17',
  // secondary: '#ff4081',
  // success: '#4caf50',
  // warning: '#fdd835',
  // info: '#2196f3',
  error: '#E50112',
  // track: '#bdbdbd',
  // text: {
  //   primary: 'rgba(0, 0, 0, 0.87)',
  //   secondary: 'gba(0, 0, 0, 0.54)',
  //   alternate: '#fff',
  //   disabled: 'rgba(0, 0, 0, 0.38)',
  //   hint: 'rgba(0, 0, 0, 0.38)' // 提示文字颜色
  // },
  // divider: 'rgba(0, 0, 0, 0.12)',
  background: {
  //   paper: '#fff',
  //   chip: '#e0e0e0',
    default: '#f5f5f5'
  }
}, 'light');

theme.use('bear');

if (process.env === 'production') {
  window.apiready = function () {
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
