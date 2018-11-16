<template>
  <div>
    <Cell class="ucCell">
      <div class="ucCellCon" @click="userSetting">
        <span class="ucCellTitle">个人设置</span>
      </div>
      <i class="mu-icon icon-right isLink" />
      <Icon slot="icon" value=":icon-icon-" :size="28" color="#999" />
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon" @click="systemSetting">
        <span class="ucCellTitle">系统设置</span>
      </div>
      <i class="mu-icon icon-right isLink" />
      <Icon slot="icon" value=":icon-shezhi1" :size="28" color="#999" />
    </Cell>
    <!-- <Cell class="ucCell">
      <div class="ucCellCon" @click="systemSetting">
        <span class="ucCellTitle">切换身份</span>
      </div>
      <i class="mu-icon icon-right isLink" />
      <Icon slot="icon" value=":el-icon-setting" :size="28" color="#999" />
    </Cell> -->
    <div class="footer">
      <Button color="#f75c5d" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="logout">退出登录</Button>
    </div>
  </div>
</template>

<script>
import { Button, Icon } from 'muse-ui';
import { Cell } from 'mint-ui';
import tools from 'util/tools';
import service from 'service';

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
    async query () {
      tools.showProgress();
      const response = await service.logout();
      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.clearStorage('token');
          tools.openWin({
            name: 'login',
            url: '../win.html',
            title: '登录',
            fname: 'login_f',
            furl: './index/login.html',
            data: {
              comefrom: 'setting'
            }
          });
          break;
        default:
          tools.toast({
            position: 'top',
            message: response.message
          });
          break;
      }
    },
    logout () {
      this.query();
    },
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
