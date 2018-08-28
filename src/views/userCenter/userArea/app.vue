<template>
  <div class="content">
    <div class="areaHead">
      <div  class="textLabel">当前定位：</div>
      <div class="textCon">{{selectedText}}</div>
      <Icon
        class="cleanBtn"
        v-if="selected.length>0"
        :size="24"
        @click="cleanSelected"
        value=":icon-qingchu"
        color="#ccc"
      />
    </div>
    <div class="areaBody">
      <AreaSelected
        :selected="selected"
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
import { Button, Icon } from 'muse-ui';
import AreaSelected from 'components/AreaSelected';
export default {
  name: 'userCenterArea',
  data () {
    return {
      selected: [],
      isEnd: false
    };
  },
  computed: {
    selectedText () {
      return this.selected.map(row => row.label).join(' / ');
    }
  },
  components: {
    Button,
    Icon,
    AreaSelected,
    Toast
  },
  methods: {
    async getSchool () {
      const response = await service.getSchoolListByAreaId({id: this.selected[this.selected.length - 1].value});
      switch (response.code) {
        case 0:
          if (response.result.list.length === 0) {
            Toast({
              position: 'top',
              message: '该地区下暂无学校，请重新选择！'
            });
          } else {
            tools.openWin({
              name: 'userSchoolList',
              url: '../win.html',
              title: '选择学校',
              fname: 'userSchoolList_f',
              furl: './userCenter/userSchoolList.html',
              data: {
                nameSpace: 'userSchoolList',
                schoolList: response.result.list
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
            message: '学校信息获取失败，请重新尝试！'
          });
          break;
      }
    },
    cleanSelected () {
      this.selected = [];
      this.isEnd = false;
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
.areaHead{
  padding: 15px;
  overflow: auto;
  & > .textCon {
    margin-left: 75px;
    margin-right: 20px;
  }
  & > .textLabel{
    float: left;
  }
}
// .areaFoot{
//   padding-top: 15px;
// }
.areaBody{
  flex: 1;
  background-color: #fff;
  overflow: hidden;
}
.cleanBtn{
  position: absolute;
  top: 9px;
  right: 12px;
}
</style>
