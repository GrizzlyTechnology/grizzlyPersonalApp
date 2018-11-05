<template>
  <div>
    <Cell class="ucCell">
      <div class="ucCellCon" @click="userSetting">
        <span class="ucCellTitle">个人设置</span>
      </div>
      <i class="mu-icon icon-right isLink" />
      <Icon slot="icon" value=":el-icon-setting" :size="28" color="#999" />
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon" @click="systemSetting">
        <span class="ucCellTitle">系统设置</span>
      </div>
      <i class="mu-icon icon-right isLink" />
      <Icon slot="icon" value=":el-icon-setting" :size="28" color="#999" />
    </Cell>
    <!-- <Cell class="ucCell">
      <div class="ucCellCon" @click="systemSetting">
        <span class="ucCellTitle">切换身份</span>
      </div>
      <i class="mu-icon icon-right isLink" />
      <Icon slot="icon" value=":el-icon-setting" :size="28" color="#999" />
    </Cell> -->
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="logout">退出登录</Button>
    </div>
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
  position: relative;
  .ucCellCon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    &:active {
      background-color: #eee;
    }
    .ucCellTitle {
      line-height: 56px;
      color: #333;
      margin-left: 48px;
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
  }
}
.footer{
  margin: 15px
}
</style>
