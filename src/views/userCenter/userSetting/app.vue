<template>
  <div>
    <Cell class="ucCell link">
      <div class="ucCellCon" @click="userSetting">
        <span class="ucCellTitle">昵称</span>
        <span class="ucCellLabel">人头原子弹</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">性别</span>
        <span class="ucCellLabel">男</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">真实姓名</span>
        <span class="ucCellLabel">马正</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">户籍地址</span>
        <span class="ucCellLabel">江苏 镇江</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell link">
      <div class="ucCellCon">
        <span class="ucCellTitle">邮箱</span>
        <span class="ucCellLabel">9****6@qq.com</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell link">
      <div class="ucCellCon">
        <span class="ucCellTitle">手机</span>
        <span class="ucCellLabel">1386****380</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell link">
      <div class="ucCellCon">
        <span class="ucCellTitle">密码</span>
        <span class="ucCellLabel">******</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
  </div>
</template>

<script>
import { Button, Icon } from 'muse-ui';
import { Cell } from 'mint-ui';
import tools from 'util/tools';

export default {
  data () {
    return {};
  },
  components: {
    Icon,
    Cell,
    Button
  },
  methods: {
    userSetting () {
      tools.openWin({
        name: 'userSetting',
        url: '../win.html',
        title: '个人设置',
        fname: 'userSetting_f',
        furl: './userCenter/userSetting.html',
        hasLeft: 1
      });
    },
    systemSetting () {
      tools.openWin({
        name: 'systemSetting',
        url: '../win.html',
        title: '系统设置',
        fname: 'systemSetting_f',
        furl: './userCenter/systemSetting.html',
        hasLeft: 1
      });
    },
    logout () {
      tools.clearStorage('token');
      window.api.sendEvent({
        name: 'event'
      });
      window.api.closeToWin({
        name: 'root'
      });
    }
  },
  mounted () {}
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.ucCell {
  &.link{
    .isLink{
      display: block;
    }
    .ucCellCon:active {
      background-color: #eee;
    }
  }
  position: relative;
  .ucCellCon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    .ucCellTitle {
      line-height: 56px;
      color: #333;
      margin-left: 15px;
    }
    .ucCellLabel{
      float: right;
      line-height: 56px;
      color: #000;
      margin-right: 45px;
    }
  }
  .mu-icon {
    z-index: 1;
    position: relative;
  }
  .mint-cell-wrapper {
    background-image: none;
    border-bottom: 1px solid #eee;
    height: 56px;
  }
  .isLink {
    position: absolute;
    top: 19px;
    font-size: 16px;
    right: 15px;
    display: none;
  }
}
</style>
