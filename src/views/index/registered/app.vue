<template>
  <div class="content">
    <Form ref="form" :model="form" >
      <FormItem
        label="手机"
        prop="mobilePhone"
        :rules="mobilePhoneRules"
      >
        <TextField v-model="form.mobilePhone"></TextField>
      </FormItem>
      <FormItem
        label="验证码"
        prop="verificationImg"
        :rules="verificationImgRules"
      >
        <TextField v-model="form.verificationImg" class="verificationCode"></TextField>
        <img @click="changeVerificationImg" class="verificationCodeImg" :src="'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png?' + reVerificationImg"/>
      </FormItem>
      <FormItem
        label="短信验证码"
        prop="verificationCode"
        :rules="verificationCodeRules"
      >
        <TextField v-model="form.verificationCode" class="verificationCode"></TextField>
        <Button
          color="#19AD17"
          textColor="#ffffff"
          class="getVerificationCode"
          :disabled="verificationCodeBtnText !=='获取验证码'"
          @click="getVerificationCode"
        >
          {{verificationCodeBtnText}}
        </Button>
      </FormItem>
      <FormItem
        label="密码"
        prop="password"
        help-text="密码规则6-32位0-9大小写字母"
        :rules="passwordRules"
      >
        <TextField v-model="form.password" type="password"></TextField>
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
    <Button color="#19AD17" textColor="#ffffff" :style="{marginTop:'30px'}" :full-width="true" large @click="submit">注册</Button>
    <div class="registeredDescription">
      注册即代表您同意并遵守《大灰熊用户协议》
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { Button, TextField } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import regexps from 'util/regexps';
import tools from 'util/tools';
import service from 'service';

export default {
  data () {
    return {
      maxTime: 10,
      verificationCodeBtnText: '获取验证码',
      reVerificationImg: (new Date().getTime()) + '_' + Math.random(),
      form: {
        mobilePhone: '',
        verificationImg: '',
        verificationCode: '',
        password: '',
        rePassword: ''
      },
      mobilePhoneRules: [
        { validate: val => regexps.mobPhone.test(val), message: '请填写正确的手机号码' }
      ],
      verificationImgRules: [
        { validate: val => !!val, message: '请填写验证码' }
      ],
      verificationCodeRules: [
        { validate: val => !!val, message: '请填写验证码' }
      ],
      passwordRules: [
        { validate: val => regexps.password.test(val), message: '密码规则6-32位0-9大小写字母' }
      ],
      rePasswordRules: [
        { validate: val => regexps.password.test(val), message: '密码规则6-32位0-9大小写字母' },
        { validate: val => this.form.password === this.form.rePassword, message: '两次密码输入不一致' }
      ]
    };
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField
  },
  methods: {
    async registered () {
      const response = await service.registered(this.form);
      switch (response.code) {
        case 0:
          // 注册好了的动作
          break;
        default:
          // Toast({
          //   position: 'top',
          //   message: '验证码获取失败'
          // });
          break;
      }
    },
    async getVerificationCode () {
      const response = await service.getVerificationCode();
      switch (response.code) {
        case 0:
          this.verificationCodeBtnText = 10 + ' (s)';
          for (let i = 1; i <= this.maxTime; i++) {
            await tools.sleep(1000);
            this.verificationCodeBtnText = (this.maxTime - i) + '(s)';
          }
          this.verificationCodeBtnText = '获取验证码';
          break;

        default:
          Toast({
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
}
.registeredDescription{
  text-align: center;
  font-size: 12px;
  margin-top: 30px;
}
</style>
