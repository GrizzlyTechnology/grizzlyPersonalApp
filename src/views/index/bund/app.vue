<template>
    <Container>
        <div class="ucAvatar" :style="{backgroundImage:'url(' + uinfo.headphoto + ')'}"></div>
        <div class="ucNickname status">Hi,{{uinfo.nickname}}</div>
        <div class="ucbs status">您的{{type}}账户未曾绑定</div>
        <div class="status"><Button color="#009688" @click="bundlogin">登录/注册并绑定{{type}}账户</Button></div>
        <div style="margin-top:50px; color:#CCC">不想绑定{{type}}账户，<a style="color:blue" @click="backlogin">返回登录</a></div>
    </Container>
</template>
<script>
import { Container} from 'muse-ui/lib/Grid';
import { Button } from 'muse-ui';
import tools from 'util/tools';
import { Toast } from 'mint-ui';
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      uinfo: window.api.pageParam.info,
      type: window.api.pageParam.type == 'qq' ? 'QQ' : '微信'
    };
  },
  components: {
    Container,
    Button
  },
  methods: {
    bundlogin () {
      tools.openWin({
        name: 'login',
        url: '../win.html',
        title: '用户登录',
        fname: 'login_f',
        furl: './index/login.html',
        hasLeft: 0,
        data: {
          comefrom: 'bund',
          type: window.api.pageParam.type,
          info: this.uinfo
        }
      });
    },
    backlogin () {
      tools.openWin({
        name: 'login',
        url: '../win.html',
        title: '用户登录',
        fname: 'login_f',
        furl: './index/login.html',
        data: {
          comefrom: 'bund'
        }
      });
    }
  },
  mounted () {
    if (window.api.pageParam.comefrom !== undefined) {
      setTimeout(function () {
        window.api.closeWin({
          name: window.api.pageParam.comefrom
        });
      }, 500);
    }
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.ucAvatar {
  margin: auto;
  margin-top: 50px;
  margin-bottom: 15px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: #fff;
  // background-image: url("../../../assets/img/headpic.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.ucNickname {
  font-size: 18px;
  color: #333;
}
.ucbs {
  font-size: 24px;
  counter-reset: #666;
}
.uczs {
  font-size: 14px;
  counter-reset: #999;
  margin-bottom: 30px;
}
.mu-card {
  box-shadow: none;
  background: none;
  width: 75%;
}

.mu-card-header-title {
  padding-right: 10px;
}

.status {
  margin-bottom: 15px;
}

.container {
  // background: #fff;
  width: 100%;
  text-align: center;
}
</style>
