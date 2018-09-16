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
import tools from 'util/tools';
// import service from 'service';
import { Button } from 'muse-ui';
import AreaSelected from 'components/AreaSelected';
export default {
  data () {
    return {
      level: window.api.pageParam.area.level || 99,
      selected: window.api.pageParam.area || [],
      isEnd: window.api.pageParam.area.length === window.api.pageParam.level
      // level: 2,
      // selected: [{label: '河北省', value: 130000}, {value: 130100, label: '石家庄市', parentid: 110000, citycode: null}],
      // isEnd: [{value: 110000, label: '北京'}, {value: 110100, label: '北京市', parentid: 110000, citycode: null}].length === 2
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
      tools.closeWin(this.selected);
      // window.api.sendEvent({
      //   name: window.api.pageParam.callback,
      //   extra: JSON.stringify(this.selected)
      // });
      // window.api.closeWin();
    }
  },
  mounted () {}
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
