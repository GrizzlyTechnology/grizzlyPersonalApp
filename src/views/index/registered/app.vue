<template>

</template>

<script>
import { Button } from 'muse-ui';

export default {
  data () {
    return {
    };
  },
  components: {
    Button
  },
  methods: {
    openWin () {
      window.api.openWin({
        name: 'main' + Math.random,
        url: './registered.html?dd=' + Math.random,
        bounces: false
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
