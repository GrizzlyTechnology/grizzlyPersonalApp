<template>
  <div>
      zheshi shouye
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
    
  },
  mounted () {
      window.api.openWin({
          name: 'studentStatus',
          url: './win/studentStatus.html',
          bounces: false,
          pageParam: {
              key : 'value'
              }
      });
  }
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/base.less');

</style>
