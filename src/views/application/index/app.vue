<template>
  <div>
    <br>
    <br>
    <br>
    <br>
    <p @click='outsideSchool'>校外实习</p>
  </div>
</template>

<script>
import tool from 'util/tools';
export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {
    outsideSchool () {
      tool.openWin({
        name: 'outsideSchool',
        url: '../win.html',
        title: '校外实习',
        fname: 'outsideSchool_f',
        furl: './application/outsideSchool.html',
        hasLeft: 1
      });
    }
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');

</style>
