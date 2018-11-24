<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem v-if="!haveEmail" label="邮箱" prop="email" :rules="emailRules">
            <TextField v-model="form.email"></TextField>
          </FormItem>
          <FormItem v-if="haveEmail" label="原邮箱" prop="email" :rules="emailRules">
            <TextField v-model="form.email"></TextField>
          </FormItem>
          <FormItem v-if="haveEmail" label="新邮箱" prop="newEmail" :rules="emailRules">
            <TextField v-model="form.newEmail"></TextField>
          </FormItem>
          <FormItem label="邮箱验证码" prop="emailCode" :rules="verificationCodeRules">
            <TextField v-model="form.emailCode" class="verificationCode"></TextField>
            <Button color="#009688" textColor="#ffffff" class="getVerificationCode" :disabled="verificationCodeBtnText !=='获取验证码'" @click="handleGetVerificationCode">
              {{verificationCodeBtnText}}
            </Button>
          </FormItem>
          请登录{{haveEmail?'新':''}}邮箱查看邮件，获取邮箱验证码
        </Form>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="submit">保存</Button>
    </div>
  </div>
</template>

<script>
import service from 'service';
// import moment from 'moment';
import { Button, TextField } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import tools from 'util/tools';
import regexps from 'util/regexps';

// import dictMap from 'util/dictMap';
export default {
  data () {
    return {
      maxTime: 60,
      verificationCodeBtnText: '获取验证码',
      haveEmail: window.api ? window.api.pageParam.haveEmail : false,
      form: {
        newEmail: '',
        email: '', // true string 真实姓名
        emailCode: ''
      },
      emailRules: [
        {
          validate: val => regexps.email.test(val),
          message: '请填写正确的Email地址'
        }
      ],
      verificationCodeRules: [
        { validate: val => !!val, message: '请填写验证码' }
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
    async getVerificationCode () {
      const response = await service.getEmailVerificationCode({
        email: this.haveEmail ? this.form.newEmail : this.form.email
      });
      switch (response.code) {
        case 0:
          this.verificationCodeBtnText = 60 + ' (s)';
          for (let i = 1; i <= this.maxTime; i++) {
            await tools.sleep(1000);
            this.verificationCodeBtnText = this.maxTime - i + '(s)';
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
    async create () {
      tools.showProgress();
      const response = await service.userSetting({
        email: this.form.email,
        emailCode: this.form.emailCode
      });
      tools.hideProgress();
      // console.log(JSON.stringify(response));

      switch (response.code) {
        case 0:
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: response.message
          });
          break;
      }
    },
    async edit () {
      tools.showProgress();
      const response = await service.userSetting({
        email: this.form.email,
        newEmail: this.form.newEmail,
        emailCode: this.form.emailCode
      });
      tools.hideProgress();
      // console.log(JSON.stringify(response));

      switch (response.code) {
        case 0:
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '邮箱修改失败，请稍后重试！！'
          });
          break;
      }
    },
    handleGetVerificationCode () {
      // console.log(JSON.stringify(this.form));
      if (
        regexps.email.test(
          this.haveEmail ? this.form.newEmail : this.form.email
        )
      ) {
        this.getVerificationCode();
      } else {
        tools.toast({
          position: 'top',
          message: this.haveEmail ? '请填写新邮箱' : '请填写邮箱'
        });
      }
    },
    submit () {
      this.$refs.form.validate().then(result => {
        if (result === true) {
          if (this.haveEmail) {
            this.edit();
          } else {
            this.create();
          }
        }
      });
    }
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.bodyer {
  flex: 1;
  overflow: auto;
}
.verificationCode {
  width: 66.666%;
}
.getVerificationCode {
  width: 33.3333%;
  margin: 0 !important;
  box-shadow: 0 0 0;
}
// .startDateTime{
//   bottom: 50px;
// }
</style>
