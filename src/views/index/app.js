import Vue from 'vue';
import App from './app.vue';
import 'muse-ui/lib/styles/base.less';
// import 'muse-ui/lib/styles/theme.less';
import 'assets/css/global.less';
import 'assets/fonts/iconfont.css';

if (process.env !== 'development') {
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

// window.apiready = function () {
// var ajpush = window.api.require('ajpush');
// if (window.api.systemType == 'android') {
//   ajpush.init(function (ret) {
//     if (ret && ret.status) {
//       alert('初始化成功');
//     } else {
//       alert('初始化失败');
//     }
//   });
//   alert('ssss');
// }
// ajpush.getRegistrationId(function (ret) {
//   var registrationId = ret.id;
//   // alert(registrationId);
// });
// // 应用在前台状态会监听
// ajpush.setListener(
//   function (ret) {
//     alert(JSON.stringify(ret));
//   }
// );
// // 应用不在前台，点击状态消息后会监听
// window.api.addEventListener({ name: 'appintent' }, function (ret, err) {
//   if (ret && ret.appParam.ajpush) {
//     var ajpush = ret.appParam.ajpush;
//     var id = ajpush.id;
//     var title = ajpush.title;
//     var content = ajpush.content;
//     var extra = ajpush.extra;
//     // do something
//     window.api.openWin({
//       name: 'msg_list',
//       url: './html/msg_list.html'
//     });
//   }
// });

//   new Vue({
//     el: '#app',
//     render: h => h(App)
//   });
// };
