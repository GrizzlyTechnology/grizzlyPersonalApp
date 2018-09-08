<template>
  <div class="content">
    <div class="areaBody">
      <AreaSelected
        :value="selected"
        :level="2"
        @change="setSelected"
      />
    </div>
    <div class="areaFoot">
      <Button color="#009688" textColor="#ffffff" :disabled="!isEnd" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="submit">确定</Button>
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
      level: 0,
      selected: [],
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
      window.api.pageParam.callback(1);
      window.api.closeWin();
    }
  },
  mounted () {
    if (window.api && window.api.pageParam.nameSpace === 'areaSelector') {
      this.level = Object.keys(window.api.pageParam.area);
      if (window.api.pageParam.area.province !== undefined) {
        this.setSelected[0].value = window.api.pageParam.area.province.value || '';
        this.setSelected[0].label = window.api.pageParam.area.province.label || '';
        if (window.api.pageParam.area.city !== undefined) {
          this.setSelected[1].value = window.api.pageParam.area.city.value || '';
          this.setSelected[1].label = window.api.pageParam.area.city.label || '';
          if (window.api.pageParam.area.county !== undefined) {
            this.setSelected[2].value = window.api.pageParam.area.county.value || '';
            this.setSelected[2].label = window.api.pageParam.area.county.label || '';
          }
        }
      }
      this.selected.lenth = window.api.pageParam.area;
      this.form.sex = window.api.pageParam.baseInfo.sex || 1;
    }
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
