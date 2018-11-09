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
      <Button color="#009688" textColor="#ffffff" :disabled="!isEnd" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="submit">下一步</Button>
    </div>
  </div>
</template>

<script>
import tools from 'util/tools';
import service from 'service';
import { Button } from 'muse-ui';
import AreaSelected from 'components/AreaSelected';
export default {
  data () {
    return {
      isLoading: false,
      selected: [],
      isEnd: false
    };
  },
  components: {
    Button,
    AreaSelected
  },
  methods: {
    async getSchool () {
      tools.showProgress();
      const response = await service.getSchoolList({cityCode: this.selected[this.selected.length - 1].cityCode});
      tools.hideProgress();
      switch (response.code) {
        case 0:
          if (response.result.shcoolInfo.length === 0) {
            tools.toast({
              position: 'top',
              message: '该地区下暂无学校，请重新选择！'
            });
          } else {
            tools.openWin({
              name: 'userSchool',
              url: '../win.html',
              title: '选择学校',
              fname: 'userSchool_f',
              furl: './userCenter/userSchool.html',
              hasLeft: 1,
              data: {
                nameSpace: 'userSchool',
                list: response.result.shcoolInfo
              }
            });
            tools.setStorage('userCenter/userInfo', {
              area: this.selected
            });
          }
          break;
        default:
          tools.toast({
            position: 'top',
            message: '学校信息获取失败，请稍后重试！！'
          });
          break;
      }
    },
    setSelected (data) {
      this.selected = data.selected;
      this.isEnd = data.isEnd;
    },
    submit () {
      this.getSchool();
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
