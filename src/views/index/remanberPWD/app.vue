<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="手机号码" prop="phone" :rules="phoneRules">
            <TextField v-model="form.phone"></TextField>
          </FormItem>
          <FormItem label="验证码" prop="code" :rules="verificationCodeRules">
            <TextField v-model="form.code" class="verificationCode"></TextField>
            <Button color="#009688" textColor="#ffffff" class="getVerificationCode" :disabled="verificationCodeBtnText !=='获取验证码'" @click="getVerificationCode">
              {{verificationCodeBtnText}}
            </Button>
          </FormItem>
          <FormItem label="新密码" prop="password" :rules="passWordRules">
            <TextField v-model="form.password" type="password"></TextField>
          </FormItem>
          <FormItem label="确认密码" prop="rePassword" :rules="rePasswordRules">
            <TextField v-model="form.rePassword" type="password"></TextField>
          </FormItem>
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
      form: {
        phone: '',
        code: '',
        password: '',
        rePassword: ''
      },
      phoneRules: [
        {
          validate: val => regexps.mobPhone.test(val),
          message: '请填写正确的手机号码'
        }
      ],
      verificationCodeRules: [
        { validate: val => !!val, message: '请填写验证码' }
      ],
      passWordRules: [
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
    async getVerificationCode () {
      if (regexps.mobPhone.test(this.form.phone)) {
        const response = await service.getVerificationCode({
          phone: this.form.phone
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
      } else {
        tools.toast({
          position: 'top',
          message: '请填写新手机'
        });
      }
    },
    async changePassword () {
      tools.showProgress();
      const response = await service.forgetPassword({
        ...this.form
      });
      // console.log(JSON.stringify(this.form));
      // console.log(JSON.stringify(response));

      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.toast({
            position: 'top',
            message: '密码修改成功'
          });
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
    submit () {
      this.$refs.form.validate().then(result => {
        if (result === true) {
          this.changePassword();
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
  -webkit-overflow-scrolling: touch;
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
