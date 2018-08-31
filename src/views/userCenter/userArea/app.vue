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
import { Toast } from 'mint-ui';
import tools from 'util/tools';
import service from 'service';
import { Button } from 'muse-ui';
import AreaSelected from 'components/AreaSelected';
export default {
  name: 'userCenterArea',
  data () {
    return {
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
      const response = await service.getSchoolList({areaId: this.selected[this.selected.length - 1].value});
      switch (response.code) {
        case 0:
          if (response.result.list.length === 0) {
            Toast({
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
              data: {
                nameSpace: 'userSchool',
                list: response.result.list
              }
            });
            const userInfo = tools.getStorage('userCenter/userInfo');
            userInfo.area = this.selected;
            tools.setStorage('userCenter/userInfo', userInfo);
          }
          break;
        default:
          Toast({
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
  background-color: #fff;
  overflow: hidden;
}
</style>
