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
          url: './main/main.html',
          bounces: false,
        });
      }else{
        window.api.openWin({
          name: 'login',
          url: './main/login.html',
          bounces: false
        });
      }
      
  }
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/base.less');

</style>
