<template>
  <Cell class="skillLine" :title="title">
    <Progress :value="value" :bar-height="5">
      <span class="end" slot="end">{{level}}</span>
    </Progress>
  </Cell>
</template>

<script>
import { Cell, Progress } from 'mint-ui';
import dictMap from 'util/dictMap';

export default {
  computed: {
    level () {
      return dictMap.skillLevel[parseInt((this.value === 0 ? 1 : this.value) / 20)];
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
