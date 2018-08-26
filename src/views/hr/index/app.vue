<template>
  <div>
      <br/>
      <br/>
      <br/>
      这是首页
      <div @click="zcgl()">职场攻略</div>
    </div>
</template>

<script>
import tool from 'util/tools'
export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {
    zcgl(){
      tool.openWin({
          name: 'zcgl',
          url: '../win.html',
            title: '职场攻略',
            fname: 'zcgl_f',
            furl: './hr/raidersList.html',
            hasLeft: 1
        });
    }

  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');

</style>
