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
import { Toast } from 'mint-ui';
import tools from 'util/tools';
import service from 'service';
import { Button, Icon } from 'muse-ui';
// import AreaSelected from 'components/AreaSelected';
export default {
  name: 'userSchoolList',
  data () {
    return {
      isEnd: false,
      list: [{value: 0, label: '学校一'}, {value: 1, label: '学校二'}],
      selected: {},
      selectedText: ''
    };
  },
  components: {
    Button,
    Icon,
    Toast
  },
  methods: {
    async getSchool () {
      const response = await service.getSessionListBySchoolId({id: this.setSelected.value});
      switch (response.code) {
        case 0:
          if (response.result.list.length === 0) {
            Toast({
              position: 'top',
              message: '该学校下暂无学年，请重新选择！'
            });
          } else {
            tools.openWin({
              name: 'userSessionList',
              url: '../win.html',
              title: '选择学年',
              fname: 'userSessionList_f',
              furl: './userCenter/userSessionList.html',
              data: {
                nameSpace: 'userSessionList',
                schoolList: response.result.list
              }
            });
          }
          break;
        default:
          Toast({
            position: 'top',
            message: '学年信息获取失败，请重新尝试！'
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
      this.getSchool();
    }
  },
  mounted () {
    if (window.api.pageParam.nameSpace === 'userSchoolList') {
      this.list = window.api.pageParam.schoolList;
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
}
.cleanBtn{
  position: absolute;
  top: 9px;
  right: 12px;
}
.areaRow {
  padding: 15px;
  border-bottom: 1px @grayLine solid;
  position: relative;
  &:active {
    background-color: #eee;
  }
}
</style>
