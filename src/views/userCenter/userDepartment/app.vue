<template>
  <div class="content">
    <div class="areaBody">
      <SelectedRecursive
        :data="list"
        :value="selected"
        @change="selectedRow"
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
import SelectedRecursive from 'components/SelectedRecursive';

export default {
  name: 'userDepartment',
  data () {
    return {
      isEnd: false,
      list: [],
      selected: []
    };
  },
  components: {
    Button,
    Icon,
    Toast,
    SelectedRecursive
  },
  methods: {
    async getDiscipline () {
      const response = await service.getDisciplineList({
        schoolId: tools.getStorage('userCenter/userInfo').school.value,
        year: tools.getStorage('userCenter/userInfo').year.value,
        collegeId: this.selected[0].value
      });
      switch (response.code) {
        case 0:
          if (response.result.majorInfo.length === 0) {
            Toast({
              position: 'top',
              message: '该院系下暂无专业，请重新选择！'
            });
          } else {
            tools.openWin({
              name: 'userDiscipline',
              url: '../win.html',
              title: '选择专业',
              fname: 'userDiscipline_f',
              furl: './userCenter/userDiscipline.html',
              data: {
                nameSpace: 'userDiscipline',
                list: response.result.majorInfo
              }
            });
            const userInfo = tools.getStorage('userCenter/userInfo');
            userInfo.college = this.selected;
            tools.setStorage('userCenter/userInfo', userInfo);
          }
          break;
        default:
          Toast({
            position: 'top',
            message: '专业信息获取失败，请稍后重试！！'
          });
          break;
      }
    },
    selectedRow (data) {
      this.selected = data.selected;
      this.isEnd = data.isEnd;
    },
    submit () {
      this.getDiscipline();
    }
  },
  mounted () {
    if (window.api.pageParam.nameSpace === 'userDepartment') {
      this.list = window.api.pageParam.list.map(row => {
        row.label = row.title;
        row.value = row.id;
        if (row.children) {
          row.children = row.children.map(r => {
            r.label = r.title;
            r.value = r.id;
            return r;
          });
        }
        return row;
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
