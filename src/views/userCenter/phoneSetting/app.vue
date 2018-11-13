<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="原手机" prop="phone" :rules="phoneRules">
            <TextField v-model="form.phone"></TextField>
          </FormItem>
          <FormItem label="新手机" prop="newPhone" :rules="phoneRules">
            <TextField v-model="form.newPhone"></TextField>
          </FormItem>
          <FormItem label="验证码" prop="messageCode" :rules="verificationCodeRules">
            <TextField v-model="form.messageCode" class="verificationCode"></TextField>
            <Button color="#009688" textColor="#ffffff" class="getVerificationCode" :disabled="verificationCodeBtnText !=='获取验证码'" @click="getVerificationCode">
              {{verificationCodeBtnText}}
            </Button>
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
        newPhone: '',
        messageCode: ''
      },
      phoneRules: [{ validate: val => regexps.mobPhone.test(val), message: '请填写正确的手机号码' }],
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
      if (regexps.mobPhone.test(this.form.newPhone)) {
        const response = await service.getVerificationCode({
          phone: this.form.newPhone
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
      } else {
        tools.toast({
          position: 'top',
          message: '请填写新手机'
        });
      }
    },
    async edit () {
      tools.showProgress();
      const response = await service.userSetting({
        ...this.form
      });
      console.log(JSON.stringify(this.form));
      console.log(JSON.stringify(response));

      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '手机修改失败，请稍后重试！！'
          });
          break;
      }
    },
    submit () {
      this.$refs.form.validate().then(result => {
        if (result === true) {
          this.edit();
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
.verificationCode{
  width: 66.666%
}
.getVerificationCode{
  width: 33.3333%;
  margin: 0 !important;
  box-shadow: 0 0 0;
}
// .startDateTime{
//   bottom: 50px;
// }
</style>
