<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="原密码" prop="oldPassWord" :rules="passWordRules">
            <TextField v-model="form.oldPassWord" type="password"></TextField>
          </FormItem>
          <FormItem label="新密码" prop="passWord" :rules="passWordRules">
            <TextField v-model="form.passWord" type="password"></TextField>
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

export default {
  data () {
    return {
      form: {
        oldPassWord: '',
        passWord: '',
        rePassword: ''
      },
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
    FormItem,
    TextField
  },
  methods: {
    async edit () {
      tools.showProgress();
      const response = await service.updateUserBaesInfo({
        ...this.form
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '密码修改失败，请稍后重试！！'
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
// .startDateTime{
//   bottom: 50px;
// }
</style>
