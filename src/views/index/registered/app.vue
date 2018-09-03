<template>
  <div class="content">
    <Form ref="form" :model="form" >
      <FormItem
        label="手机"
        prop="phone"
        :rules="phoneRules"
      >
        <TextField v-model="form.phone"></TextField>
      </FormItem>
      <!-- <FormItem
        label="验证码"
        prop="verificationImg"
        :rules="verificationImgRules"
      >
        <TextField v-model="form.verificationImg" class="verificationCode"></TextField>
        <img @click="changeVerificationImg" class="verificationCodeImg" :src="'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png?' + reVerificationImg"/>
      </FormItem> -->
      <FormItem
        label="短信验证码"
        prop="messageCode"
        :rules="verificationCodeRules"
      >
        <TextField v-model="form.messageCode" class="verificationCode"></TextField>
        <Button
          color="#009688"
          textColor="#ffffff"
          class="getVerificationCode"
          :disabled="verificationCodeBtnText !=='获取验证码'"
          @click="getVerificationCode"
        >
          {{verificationCodeBtnText}}
        </Button>
      </FormItem>
      </FormItem>
        <FormItem
        label="性别"
        prop="sex"
      >
        <Radio v-model="form.sex" :value="1" label="男"></Radio>
        <Radio v-model="form.sex" :value="0" label="女"></Radio>
      </FormItem>
      <FormItem
        label="密码"
        prop="passWord"
        help-text="密码规则6-32位0-9大小写字母"
        :rules="passWordRules"
      >
        <TextField v-model="form.passWord" type="password"></TextField>
      </FormItem>
      <FormItem
        label="确认密码"
        prop="rePassword"
        help-text="密码规则6-32位0-9大小写字母"
        :rules="rePasswordRules"
      >
        <TextField v-model="form.rePassword" type="password"></TextField>
      </FormItem>
    </Form>
    <Button color="#009688" textColor="#ffffff" :style="{marginTop:'30px',boxShadow: '0 0 0'}" :full-width="true" large @click="submit">注册</Button>
    <div class="registeredDescription">
      注册即代表您同意并遵守《大灰熊用户协议》
    </div>
  </div>
</template>

<script>
import { Button, TextField, Radio } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import regexps from 'util/regexps';
import tools from 'util/tools';
import service from 'service';

export default {
  data () {
    return {
      maxTime: 60,
      verificationCodeBtnText: '获取验证码',
      reVerificationImg: (new Date().getTime()) + '_' + Math.random(),
      form: {
        phone: '',
        // verificationImg: '',
        sex: 1,
        messageCode: '',
        passWord: '',
        rePassword: ''
      },
      phoneRules: [
        { validate: val => regexps.mobPhone.test(val), message: '请填写正确的手机号码' }
      ],
      verificationImgRules: [
        { validate: val => !!val, message: '请填写验证码' }
      ],
      verificationCodeRules: [
        { validate: val => !!val, message: '请填写验证码' }
      ],
      passWordRules: [
        { validate: val => regexps.password.test(val), message: '密码规则6-32位0-9大小写字母' }
      ],
      rePasswordRules: [
        { validate: val => regexps.password.test(val), message: '密码规则6-32位0-9大小写字母' },
        { validate: val => this.form.passWord === this.form.rePassword, message: '两次密码输入不一致' }
      ]
    };
  },
  components: {
    Button,
    Form,
    Radio,
    FormItem,
    TextField
  },
  methods: {
    async registered () {
      const response = await service.registered(this.form);
      switch (response.code) {
        case 0:
          window.api.sendEvent({
            name: 'event'
          });
          window.api.closeToWin({
            name: 'root'
          });
          // const login = await service.login({
          //   phone: this.form.phone,
          //   passWord: this.form.passWord,
          //   deviceId: window.api.deviceId
          // });
          // alert(login.code);
          // switch (login.code) {
          //   case 0:
          //     tools.setStorage('token', login.result.token);
          //     tools.setStorage('phone', login.result.userinfo.phone);
          //     tools.setStorage('userInfo', login.result.userinfo);
          //     break;
          // }
          break;
        default:
          tools.toast({
            position: 'top',
            message: response.message
          });
          break;
      }
    },
    async getVerificationCode () {
      const response = await service.getVerificationCode({
        phone: this.form.phone
      });
      switch (response.code) {
        case 0:
          this.verificationCodeBtnText = 60 + ' (s)';
          for (let i = 1; i <= this.maxTime; i++) {
            await tools.sleep(1000);
            this.verificationCodeBtnText = (this.maxTime - i) + '(s)';
          }
          this.verificationCodeBtnText = '获取验证码';
          break;

        default:
          tools.toast({
            position: 'top',
            message: '验证码获取失败'
          });
          break;
      }
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result === true) {
          this.registered();
        }
      });
    },
    changeVerificationImg () {
      this.reVerificationImg = (new Date().getTime()) + '_' + Math.random();
    }
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
.content{padding: 15px}
.verificationCode{
  width: 66.666%
}
.verificationCodeImg{
  width: 33.333%;
  height: 32px;
}
.getVerificationCode{
  width: 33.3333%;
  margin: 0 !important;
  box-shadow: 0 0 0;
}
.registeredDescription{
  text-align: center;
  font-size: 12px;
  margin-top: 30px;
}
</style>
