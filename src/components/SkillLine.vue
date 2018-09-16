<template>
  <div class="skillLine">
    <div>
      <span>{{title}}</span>
      <span class="end">{{level}}</span>
    </div>
    <Progress :value="value" :bar-height="5">
    </Progress>
  </div>
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
  margin: 15px 0;
  padding: 0 10px;
  .mt-progress{
    flex: 1;
    line-height: 5px;
    height: 5px;
    margin-top: 5px;
  }
  .mt-progress-progress{
    background-color: #009688;
  }
  .end{
    float: right;
    // font-size: 12px;
    // padding-left: 5px;
  }
}
</style>
