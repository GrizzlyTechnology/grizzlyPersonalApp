<template>
  <div>
  </div>
</template>

<script>
import tool from 'util/tools';
export default {
  data () {
    return {};
  },
  components: {},
  methods: {
    init () {
      var token = tool.getStorage('token');
      if (token) {
        tool.openWin({
          name: 'main',
          url: './index/main.html'
        });
      } else {
        tool.openWin({
          name: 'login',
          url: './win.html',
          title: '登录',
          fname: 'login_f',
          furl: './index/login.html'
        });
      }
    }
  },
  mounted () {
    this.init();
    tool.addEventListener(
      {
        name: 'event'
      },
      function (ret, err) {
        this.init();
      }
    );
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/base.less");
</style>
