<template>
  <UIFrame
    title="this is a title just for demo"
  >
    <LoadMore
      :loading="loading"
      :style="{minHeight:'100%'}"
      :refreshing="refreshing"
      @load="load"
      @refresh="refresh"
    >
    </LoadMore>
  </UIFrame>
</template>

<script>
import { LoadMore } from 'muse-ui';
import { DefaultFrame } from 'components';
export default {
  data () {
    return {
      num: 10,
      refreshing: false,
      loading: false,
      text: 'List'
    };
  },
  components: {
    UIFrame: DefaultFrame,
    LoadMore
  },
  methods: {
    refresh () {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.text = this.text === 'List' ? 'Menu' : 'List';
        this.num = 10;
      }, 2000);
    },
    load () {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
      }, 2000);
    }
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');

</style>
