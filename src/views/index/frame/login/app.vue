<template>
<Container class="formCon">
    <Row class="hpic" justify-content="center">
    <Avatar size="100" color="teal">M</Avatar>
    </Row>
  <Form ref="form" :model="validateForm" class="mu-demo-form">
    <FormItem
    prop="username"
    :rules="usernameRules"
    label="用户名(手机号码)"
    >
      <TextField
      v-model="validateForm.username"
      prop="username"
      >
      </TextField>
    </FormItem>
    <FormItem
    prop="password"
    :rules="passwordRules"
    label="密 码"
    >
        <TextField
        v-model="validateForm.password"
        prop="password"
        :action-icon="visibility ? ':icon-bukejian2' : ':icon-kejian'"
        :action-click="() => (visibility = !visibility)"
        :type="visibility ? 'text' : 'password'"
        >
        </TextField>
    </FormItem>
    <FormItem>
      <Checkbox
      label="记住用户名"
      v-model="validateForm.isAgree"
      >
      </Checkbox>
    </FormItem>
    <Button full-width large class="buttom" color="teal" @click="submit">立即登录</Button>
  </Form>
</Container>
</template>

<script>
import { Button, TextField, Checkbox, Avatar } from 'muse-ui';
import {Row, Container} from 'muse-ui/lib/Grid';
import { Form, FormItem } from 'muse-ui/lib/Form';
import srvaass from 'service';

export default {
  data () {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名' },
        { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10' }
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议' }],
      validateForm: {
        username: '',
        password: '',
        isAgree: true
      },
      visibility: false,
    };
  },
  components: {
    Button,
    TextField,
    Checkbox,
    Row,
    Avatar,
    Form,
    FormItem,
    Container
  },
  methods: {
    async query () {
      const response = await srvaass.demo({
          userName: this.validateForm.username,
          passWord: this.validateForm.password
          });
      alert(JSON.stringify(response));
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.query();
        }
      });
    }
  },
  mounted () {
  }
};
</script>
<style lang="less">
@import url('../../../../assets/css/base.less');
.mu-form-item-label{
    font-size: 18px;
}
</style>
<style lang="less" scoped>
@import url('../../../../assets/css/base.less');
.formCon{padding: 20px}
.hpic{
    padding: 40px 0;
}
.buttom{
    color:@white;
    font-size: 18px;
}
</style>
