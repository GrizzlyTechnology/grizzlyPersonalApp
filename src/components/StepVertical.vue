<template>
  <div class="mu-stepper mu-stepper-vertical">
    <div v-for="(row, index) in data" :key="index" class="mu-step">
      <span class="mu-step-label active completed">
        <span class="mu-step-label-icon-container">
          <div class="stepIcon"></div>
        </span>
        <div class="stepHeader">{{row.head}}</div>
      </span>
      <div class="mu-step-content">
        <div style="position: relative; overflow: hidden; height: 100%;">
          <div class="mu-step-content-inner" data-old-padding-top="" data-old-padding-bottom="" data-old-overflow="" style="">
            <div class="stepConTitle">{{row.title}}</div>
            <div class="stepConInfo">{{row.info}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Stepper, Step, StepLabel, StepContent } from 'muse-ui/lib/Stepper';
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  components: {
    Stepper,
    Step,
    StepLabel,
    StepContent
  }
};
</script>
<style lang="less" scoped>
.stepHeader {
  font-size: 12px;
  color: #999;
}
.stepConInfo {
  color: #999;
}
.stepIcon {
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: #009688;
  border: 2px solid #b6e9e4;
  margin-left: 3px;
}
.mu-step:last-child {
  .mu-step-content {
    padding-bottom: 10px;
  }
}
</style>
