<template>
  <Container>
    <Row class="hpic" justify-content="center">
      <Avatar size="80" color="teal"></Avatar>
    </Row>
    <Form ref="form" :model="validateForm" class="mu-demo-form">
      <FormItem prop="phone" :rules="phoneRules" label="用户名(手机号码)">
        <TextField v-model="validateForm.phone" prop="phone">
        </TextField>
      </FormItem>
      <FormItem prop="password" :rules="passwordRules" label="密 码">
        <TextField v-model="validateForm.password" prop="password" :action-icon="visibility ? ':icon-bukejian2' : ':icon-kejian'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'">
        </TextField>
      </FormItem>
    </Form>
    <Row gutter>
      <Col span="6">
      <Checkbox label="记住用户名" v-model="validateForm.isAgree"></Checkbox>
      </Col>
      <Col span="6">
      <div class="grid-cell-reg" @click="remanberPWD">忘记密码？</div>
      </Col>
    </Row>
    <Button color="#009688" textColor="#ffffff" :style="{marginTop:'30px',boxShadow: '0 0 0'}" :full-width="true" large @click="submit">登录{{type==='qq'?'并绑定QQ账户':type==='wx'?'并绑定微信账户':''}}</Button>
    <Row class="row-reg" gutter>
      <Col span="6">
      <!-- <div class="grid-cell" @click="msgCode">短信验证码登录</div> -->
      </Col>
      <Col span="6">
      <div class="grid-cell-reg" @click="regNewUser">注册新用户</div>
      </Col>
    </Row>
    <Other v-if="type===''"></Other>
    <Row v-if="type!==''">
      <div style="color:#CCC; margin-top:40px;text-align:center">不想绑定，<a style="color:blue" @click="backlogin">直接登录</a></div>
    </Row>
  </Container>
</template>

<script>
import { Container, Row, Col } from 'muse-ui/lib/Grid';
import { Form, FormItem } from 'muse-ui/lib/Form';
import { Button, TextField, Checkbox, Avatar } from 'muse-ui';
import service from 'service';
import tools from 'util/tools';
import Other from 'components/OtherLogin';

export default {
  data () {
    return {
      phoneRules: [
        { validate: val => !!val, message: '必须填写用户名' },
        {
          validate: val => val.length === 11,
          message: '用户名长度为11位手机号码'
        }
      ],
      passwordRules: [
        { validate: val => !!val, message: '必须填写密码' },
        {
          validate: val => val.length >= 6 && val.length <= 18,
          message: '密码长度大于6小于18'
        }
      ],
      argeeRules: [{ validate: val => !!val, message: '必须同意用户协议' }],
      validateForm: {
        phone: tools.getStorage('phone'),
        password: '',
        isAgree: true
      },
      visibility: false,
      type:
        window.api.pageParam.type !== undefined ? window.api.pageParam.type : ''
    };
  },
  components: {
    Container,
    Button,
    TextField,
    Checkbox,
    Row,
    Col,
    Avatar,
    Form,
    FormItem,
    Other
  },
  methods: {
    async query () {
      tools.showProgress();
      const response = await service.login({
        phone: this.validateForm.phone,
        passWord: this.validateForm.password,
        deviceId: window.api.deviceId
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.setStorage('token', response.result.token);
          tools.setStorage('phone', response.result.userinfo.phone);
          tools.setStorage('userInfo', response.result.userinfo);

          // 绑定第三方登录
          if (this.type === 'qq' || this.type === 'wx') {
            tools.showProgress();
            const bundresponse = await service.bund({
              type: this.type,
              openId: window.api.pageParam.info.openid,
              uid: response.result.userinfo.id
            });
            tools.hideProgress();
            if (bundresponse.code !== 0) {
              alert(
                '登录成功但' +
                  (window.api.pageParam.type === 'qq' ? 'QQ' : '微信') +
                  '账户绑定失败'
              );
            }
          }

          // 绑定极光推送的别名为id
          let ajpush = window.api.require('ajpush');
          let param = { alias: response.result.userinfo.id };
          ajpush.bindAliasAndTags(param, function (ret) {
            // let statusCode = ret.statusCode;
          });
          alert(
            '登录成功' +
              (window.api.pageParam.type === 'qq'
                ? '且已绑定QQ账户'
                : window.api.pageParam.type === 'wx'
                  ? '且已绑定微信账户'
                  : '')
          );
          // 登录完跳转
          window.api.openWin({
            name: 'main',
            url: './main.html',
            slidBackEnabled: false,
            pageParam: {
              comefrom: 'login'
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
    submit () {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.query();
        }
      });
    },
    remanberPWD () {
      alert('sss');
    },
    msgCode () {
      alert('msgcode login');
    },
    regNewUser () {
      if (this.type === 'qq' || this.type === 'wx') {
        tools.openWin({
          name: 'registered',
          url: '../win.html',
          title: '用户注册',
          fname: 'registered_f',
          furl: './index/registered.html',
          hasLeft: true,
          data: {
            comefrom: 'login',
            type: this.type,
            info: window.api.pageParam.info
          }
        });
      } else {
        tools.openWin({
          name: 'registered',
          url: '../win.html',
          title: '用户注册',
          fname: 'registered_f',
          furl: './index/registered.html',
          hasLeft: true
        });
      }
    },
    backlogin () {
      this.type = '';
    }
  },
  mounted () {
    if (window.api.pageParam.comefrom !== undefined) {
      setTimeout(function () {
        window.api.closeWin({
          name: window.api.pageParam.comefrom
        });
        window.api.closeWin({
          name: 'main'
        });
      }, 500);
    }
  }
};
</script>

<style lang="less">
@import url("../../../assets/css/base.less");
.container {
  padding: @gap;
  .mu-avatar {
    background: url("../../../assets/img/dhxlogo.png") center no-repeat;
    background-size: contain;
  }
  .hpic {
    padding: 30px 0;
  }
  .row .grid-cell-reg {
    text-align: right;
  }
  .row-reg {
    padding-top: 30px;
  }
}
.buttom {
  color: @white;
  font-size: @h2;
}
</style>
