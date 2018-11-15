<template>
  <div>
    <Cell class="ucCell">
      <div class="ucCellCon" @click="settingNotice">
        <span class="ucCellTitle">推送通知</span>
        <span class="ucCellLabel">
          <MuSwitch color="#009688" v-model="notice"></MuSwitch>
        </span>
      </div>
    </Cell>
  </div>
</template>

<script>
import tools from 'util/tools';
import service from 'service';
import MuSwitch from 'muse-ui/lib/Switch';
import { Cell } from 'mint-ui';

export default {
  data () {
    return {
      notice: true
    };
  },
  components: {
    Cell,
    MuSwitch
  },
  methods: {
    
    settingNotice () {}
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.ucCell {
  min-height: 56px;
  &.link{
    .isLink{
      display: block;
    }
    .ucCellCon:active {
      background-color: #eee;
    }
  }
  position: relative;
  .ucCellCon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    .ucCellTitle {
      line-height: 56px;
      color: #666;
      margin-left: 15px;
    }
    .ucCellLabel{
      float: right;
      line-height: 56px;
      color: #000;
      margin-right: 45px;
    }
  }
  .mu-icon {
    z-index: 1;
    position: relative;
  }
  .mint-cell-wrapper {
    background-image: none;
    border-bottom: 1px solid #eee;
    height: 56px;
  }
  .isLink {
    position: absolute;
    top: 19px;
    font-size: 16px;
    right: 15px;
    display: none;
  }
}
</style>
