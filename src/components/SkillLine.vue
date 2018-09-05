<template>
  <Cell class="skillLine" :title="title">
    <Progress :value="value" :bar-height="5">
      <span class="end" slot="end">{{level}}</span>
    </Progress>
  </Cell>
</template>

<script>
import { Cell, Progress } from 'mint-ui';

export default {
  computed: {
    level () {
      const level = ['了解', '熟悉', '掌握', '精通', '专家'];
      const l = parseInt((this.value === 0 ? 1 : this.value) / 20);
      return level[l === 5 ? 4 : l];
    }
  },
  props: {
    value: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Cell, Progress
  }
};
</script>
<style lang="less">
@import url("../assets/css/base.less");
.skillLine{
  .mint-cell-value{
    flex: 2.5
  }
  .mt-progress{
    flex: 1;
  }
  .mt-progress-progress{
    background-color: #009688;
  }
  .mint-cell-title{
    .ell();
  }
  .end{
    font-size: 12px;
    padding-left: 5px;
  }
}
</style>
