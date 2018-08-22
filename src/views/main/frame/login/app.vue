<template>
<div class="formCon">
  <Form ref="form" :model="validateForm" class="mu-demo-form">
    <FormItem 
    prop="username" 
    :rules="usernameRules"
    label="用户名"
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
    label="密码"
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
    <Button full-width round class="buttom" @click="submit">立即登录</Button>
  </Form>
</div>
</template>

<script>
import { Button, TextField, Checkbox } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';

import UIHeader from 'components/UIHeader';

export default {
  data () {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
        username: '',
        password: '',
        isAgree: true
      },
      visibility: false
    };
  },
  components: {
   UIHeader,
   Button,
   TextField,
   Checkbox,
   Form,
   FormItem
  },
  methods: {
     submit () {
      this.$refs.form.validate().then((result) => {
        if(result){
            alert(JSON.stringify(this.validateForm));
        }
      });
      return;
    }
  },
  mounted () {
      tool.fixStatusBar(tool.dom("#app"));
  }
};
</script>
<style lang="less" scoped>
@import url('../../../../assets/css/base.less');
.formCon{padding: 20px}
.buttom{
    background-color: green;
    color:#FFF;
}
</style>
