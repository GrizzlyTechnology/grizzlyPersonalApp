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
// import service from 'service';
import { Button, Icon } from 'muse-ui';
import tools from 'util/tools';
// import AreaSelected from 'components/AreaSelected';
export default {
  name: 'userClass',
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
      const userInfo = tools.getStorage('userCenter/userInfo');
      userInfo.class = this.selected;
      tools.setStorage('userCenter/userInfo', userInfo);
      tools.openWin({
        name: 'userInfo',
        url: '../win.html',
        title: '学生信息',
        fname: 'userInfo_f',
        furl: './userCenter/studentInfo.html',
        hasLeft: 1
      });
    }
  },
  mounted () {
    if (window.api.pageParam.nameSpace === 'userClass') {
      this.list = window.api.pageParam.list.map(row => {
        return {
          value: row.id,
          label: row.title};
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
