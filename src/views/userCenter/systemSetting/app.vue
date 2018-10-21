<template>
  <div>
    <Cell class="ucCell">
      <div class="ucCellCon" @click="settingNotice">
        <span class="ucCellTitle">推送通知</span>
        <span class="ucCellLabel">
          <muSwitch color="#009688" v-model="notice"></muSwitch>
        </span>
      </div>
    </Cell>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="logout">退出登录</Button>
    </div>
  </div>
</template>

<script>
import tools from 'util/tools';
import service from 'service';
import { Button } from 'muse-ui';
import muSwitch from 'muse-ui/lib/Switch';
import { Cell } from 'mint-ui';

export default {
  data () {
    return {
      notice: true
    };
  },
  components: {
    Button,
    Cell,
    muSwitch
  },
  methods: {
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
              comefrom: 'systemSet'
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
    settingNotice () {}
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.footer{
  margin: 15px;
}
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
      color: #666;
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
