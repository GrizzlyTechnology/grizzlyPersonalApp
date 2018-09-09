<template>
  <div class="content">
    <div class="areaBody">
      <AreaSelected
        :value="selected"
        :level="level"
        @change="setSelected"
      />
    </div>
    <div class="areaFoot">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :disabled="!isEnd" :full-width="true" large @click="submit">确定</Button>
    </div>
  </div>
</template>

<script>
// import tools from 'util/tools';
// import service from 'service';
import { Button } from 'muse-ui';
import AreaSelected from 'components/AreaSelected';
export default {
  name: 'userCenterArea',
  data () {
    return {
      level: window.api ? window.api.pageParam.area.level : 99,
      selected: window.api ? window.api.pageParam.area : [],
      isEnd: false
    };
  },
  components: {
    Button,
    AreaSelected
  },
  methods: {
    setSelected (data) {
      this.selected = data.selected;
      this.isEnd = data.isEnd;
    },
    submit () {
      window.api.sendEvent({
        name: window.api.pageParam.callback,
        extra: this.selected
      });
      window.api.closeWin();
    }
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
.content{
  // padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

// .areaFoot{
//   padding-top: 15px;
// }
.areaBody{
  flex: 1;
  overflow: hidden;
}
</style>
