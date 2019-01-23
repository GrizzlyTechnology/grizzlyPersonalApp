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
       tool.openWin({
          name: 'main',
          url: './index/main.html'
        });
    }
  },
  mounted () {
    var obj = this;
    obj.init();
    tool.addEventListener(
      {
        name: 'event'
      },
      function (ret, err) {
        obj.init();
      }
    );
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/base.less");
</style>
