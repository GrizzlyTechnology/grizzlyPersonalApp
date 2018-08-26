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

export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {
    zcgl(){
      window.api.openWin({
          name: 'zcgl',
          url: '../win.html',
          bounces: false,
          pageParam: {
            wtitle: '职场攻略',
            fname: 'zcgl_f',
            furl: './hr/raidersList.html',
            hasLeft: 1,
            hasRight: 0
          }
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
