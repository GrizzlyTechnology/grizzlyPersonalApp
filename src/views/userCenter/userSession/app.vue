<template>
  <div class="content">
    <div class="areaHead">
      <div  class="textLabel">当前选择：</div>
      <div class="textCon">{{selectedText}}</div>
      <Icon
        class="cleanBtn"
        v-if="selectedText.length>0"
        :size="24"
        @click="cleanSelected"
        value=":icon-qingchu"
        color="#ccc"
      />
    </div>
    <div class="areaBody">
      <div
        class="areaRow"
        v-for="team in list"
        :key="team.value" @click="()=>{
          selectedRow(team);
        }"
      >
        {{team.label}}
      </div>
    </div>
    <div class="areaFoot">
      <Button color="#009688" textColor="#ffffff" :disabled="!isEnd" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="submit">下一步</Button>
    </div>
  </div>
</template>

<script>
import tools from 'util/tools';
import service from 'service';
import { Button, Icon } from 'muse-ui';
// import AreaSelected from 'components/AreaSelected';
export default {
  data () {
    return {
      isEnd: false,
      list: [],
      selected: {},
      selectedText: ''
    };
  },
  components: {
    Button,
    Icon
  },
  methods: {
    async getDepartment () {
      tools.showProgress();
      const response = await service.getDepartmentList({
        schoolId: tools.getStorage('userCenter/userInfo').school.value,
        year: this.selected.value
        // schoolId: 1,
        // year: 2018
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          if (response.result.collegeInfo.length === 0) {
            tools.toast({
              position: 'top',
              message: '该学年下暂无院系，请重新选择！'
            });
          } else {
            tools.openWin({
              name: 'userDepartment',
              url: '../win.html',
              title: '选择院系',
              fname: 'userDepartment_f',
              furl: './userCenter/userDepartment.html',
              hasLeft: 1,
              data: {
                nameSpace: 'userDepartment',
                list: response.result.collegeInfo
              }
            });
            const userInfo = tools.getStorage('userCenter/userInfo');
            userInfo.year = this.selected;
            tools.setStorage('userCenter/userInfo', userInfo);
          }
          break;
        default:
          tools.toast({
            position: 'top',
            message: '院系信息获取失败，请稍后重试！！'
          });
          break;
      }
    },
    cleanSelected () {
      this.selected = {};
      this.selectedText = '';
      this.isEnd = false;
    },
    selectedRow (data) {
      this.selected = data;
      this.selectedText = data.label;
      this.isEnd = true;
    },
    submit () {
      this.getDepartment();
    }
  },
  mounted () {
    if (window.api.pageParam.nameSpace === 'userSession') {
      this.list = window.api.pageParam.list.map(row => {
        return {
          label: row.year + '届',
          value: row.year
        };
      });
      // alert(JSON.stringify(this.list));
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
.areaHead{
  padding: 15px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.cleanBtn{
  position: absolute;
  top: 9px;
  right: 12px;
}
.areaRow {
  font-size: 16px;
  padding: 14px 15px;
  border-bottom: 1px @grayLine solid;
  position: relative;
  &:active {
    background-color: #eee;
  }
}
</style>
