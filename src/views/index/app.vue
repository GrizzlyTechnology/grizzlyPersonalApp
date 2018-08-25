<template>
    <div>
    </div>
</template>

<script>
import tool from "util/tools";
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    init() {
      var token = tool.getStorage("token");
      if (token) {
        window.api.openWin({
          name: "main",
          url: "./index/main.html",
          bounces: false
        });
      } else {
        window.api.openWin({
          name: "login",
          url: "./index/win.html",
          bounces: false,
          pageParam: {
            wtitle: "登录",
            fname: "login_f",
            furl: "./login.html",
            hasLeft: 0,
            hasRight: 0
          }
        });
      }
    }
  },
  mounted() {
    var obj = this;
    obj.init();
    window.api.addEventListener({
        name: "login"
      },function(ret, err) {
        window.api.openWin({
          name: "main",
          url: "./index/main.html",
          bounces: false
        });
    });
    window.api.addEventListener({
        name: "logout"
      },function(ret, err) {
        alert("logout");
    });
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/base.less");
</style>
