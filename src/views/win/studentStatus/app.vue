<template>
  <DefaultFrame
    :title="title"
  >
  </DefaultFrame>
</template>

<script>
import moment from 'moment';
import { DefaultFrame } from 'components';
import tool from 'util/tools';
export default {
  data () {
    return {
      title:'我的信息',
    };
  },
  components: {
    DefaultFrame,
  },
  methods: {
    
  },
  mounted () {
      var headerH=tool.fixStatusBar(tool.dom("header"));
      var heightF=window.api.frameHeight;
      window.api.openFrame({
          name: 'studentStatus_f',
          url: '../frame/studentStatus.html',
          bounces: true,
          rect: {
              x: 0,
              y: headerH,
              w: 'auto',
              h: heightF-100
          }
      });
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
.formCon{padding: 15px}
.startDateTime{
  bottom: 50px;
}
</style>
