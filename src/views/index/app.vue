<template>
  <div>
      zheshi shouye
  </div>
</template>

<script>
import tool from "util/tools";
export default {
  data () {
    return {
    };
  },
  components: {

  },
  methods: {
    
  },
  mounted () {
      var userInfo=tool.getStorage('STUserInfo');
      if(!!userInfo){
        window.api.openWin({
          name: 'main',
          url: './index/win.html',
          bounces: false,
        });
      }else{
        api.api.openWin({
            name: 'login',
            url: './index/win.html',
            bounces: false,
            pageParam: {
                wtitle : '登录',
                fname:'login_f',
                furl:'./frame/login.html'
                }
        });
      }
      
  }
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/base.less');

</style>
