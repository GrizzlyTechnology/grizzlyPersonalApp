<template>
  <div class="content">
    <Form ref="form" :model="form" >
      <FormItem
        label="姓名"
        prop="name"
        :rules="nameRules"
      >
        <TextField v-model="form.name"></TextField>
      </FormItem>
        <FormItem
        label="性别"
        prop="sex"
      >
        <Radio v-model="form.sex" :value="1" label="男"></Radio>
        <Radio v-model="form.sex" :value="0" label="女"></Radio>
      </FormItem>
      <FormItem
        label="身份证"
        prop="identity"
        :rules="identityRules"
      >
        <TextField v-model="form.identity"></TextField>
      </FormItem>
      <FormItem
        label="电话"
        prop="phone"
        :rules="phoneRules"
      >
        <TextField v-model="form.phone"></TextField>
      </FormItem>
    </Form>
    <Button color="#009688" textColor="#ffffff" :full-width="true" :style="{boxShadow: '0 0 0'}" large @click="submit">下一步</Button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import service from 'service';
import { Button, TextField, Radio } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import regexps from 'util/regexps';
import tools from 'util/tools';
export default {
  name: 'userInfo',
  data () {
    return {
      form: {
        name: '',
        sex: 1,
        identity: '',
        phone: ''
      },
      nameRules: [
        { validate: val => !!val, message: '必须填写姓名' }
      ],
      identityRules: [
        { validate: val => regexps.IdCard.test(val), message: '填写正确的身份证信息' }
      ],
      phoneRules: [
        { validate: val => regexps.mobPhone.test(val), message: '填写正确的电话号码' }
      ]
    };
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField,
    Radio
  },
  methods: {
    async check () {
      const response = await service.checkStudent(this.form);
      switch (response.code) {
        case 0:
          // tools.openWin({
          //   name: 'userArea',
          //   url: '../win.html',
          //   title: '选择地区',
          //   fname: 'userArea_f',
          //   furl: './userCenter/userArea.html'
          // });
          // tools.setStorage('userCenter/userInfo', this.form);
          break;
        default:
          Toast({
            position: 'top',
            message: '学生信息创建失败，请稍后重试！！'
          });
          break;
      }
    },
    async getUserInfo () {
      const response = await service.getUserInfo();
      switch (response.code) {
        case 0:
          this.form = response.result.userInfo;
          break;
        default:
          Toast({
            position: 'top',
            message: '信息获取失败，请稍后重试！！'
          });
          break;
      }
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result === true) {
          tools.setStorage('userCenter/userInfo', this.form);
          tools.openWin({
            name: 'userArea',
            url: '../win.html',
            title: '选择地区',
            fname: 'userArea_f',
            furl: './userCenter/userArea.html'
          });
          // this.check();
        }
      });
    }
  },
  mounted () {
    this.getUserInfo();
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
.content{padding: 15px}
// .startDateTime{
//   bottom: 50px;
// }
</style>
