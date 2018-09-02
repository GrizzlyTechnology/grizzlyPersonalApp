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
  name: 'userSchool',
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
    Icon,
    Toast
  },
  methods: {
    async getSchool () {
      const response = await service.getSessionList({schoolId: this.selected.value});
      switch (response.code) {
        case 0:
          if (response.result.years.length === 0) {
            Toast({
              position: 'top',
              message: '该学校下暂无学年，请重新选择！'
            });
          } else {
            tools.openWin({
              name: 'userSession',
              url: '../win.html',
              title: '选择学年',
              fname: 'userSession_f',
              furl: './userCenter/userSession.html',
              data: {
                nameSpace: 'userSession',
                list: response.result.years
              }
            });
            const userInfo = tools.getStorage('userCenter/userInfo');
            userInfo.school = this.selected;
            tools.setStorage('userCenter/userInfo', userInfo);
          }
          break;
        default:
          Toast({
            position: 'top',
            message: '学年信息获取失败，请稍后重试！！'
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
    if (window.api.pageParam.nameSpace === 'userSchool') {
      this.list = window.api.pageParam.list.map(row => {
        return { label: row.title, value: row.sid };
      });
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
  font-size: 16px;
  padding: 14px 15px;
  border-bottom: 1px @grayLine solid;
  position: relative;
  &:active {
    background-color: #eee;
  }
}
</style>
