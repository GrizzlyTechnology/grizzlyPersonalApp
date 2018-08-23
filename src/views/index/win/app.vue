<template>
    <UIHeader
      color="#ffffff"
      textColor="#000000"
      :z-depth="1"
      class="header"
      :title="wtitle">
    </UIHeader>
</template>

<script>
import tool from 'util/tools';
import UIHeader from 'components/UIHeader';

export default {
  data () {
    return {
        wtitle:window.api.pageParam.wtitle,
        fname:window.api.pageParam.fname,
        furl:window.api.pageParam.furl,
    };
  },
  components: {
   UIHeader
  },
  methods: {
    
  },
  mounted () {
      var headerH=tool.fixStatusBar(tool.dom(".header"));
      window.api.openFrame({
          name: this.fname,
          url: this.furl,
          bounces: true,
          rect: {
              x: 0,
              y: headerH,
              w: 'auto',
              h: 'auto'
          }
      });
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
.header{
    height: 50px;
}
</style>
