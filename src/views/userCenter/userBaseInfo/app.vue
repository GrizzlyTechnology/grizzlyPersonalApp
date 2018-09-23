<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="自我描述" prop="introduction" :rules="introductionRules">
            <TextField
              v-model="form.introduction"
              multi-line
              :max-length="255"
              :rows="10"
              :rows-max="10"
            />
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
import { Button, TextField, Radio, DateInput } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import regexps from 'util/regexps';
import tools from 'util/tools';
alert(3);
// import dictMap from 'util/dictMap';
export default {
  data () {
    return {
      id: window.api.pageParam.id || null,
      form: {
        name: window.api.pageParam.baseInfo.name || '', // true string 真实姓名
        sex: window.api.pageParam.baseInfo.sex ? window.api.pageParam.baseInfo.sex : 1, // true string 性别
        birthday: window.api.pageParam.baseInfo.birthday || Date.now().valueOf(), // true string生日
        houseHold: window.api.pageParam.baseInfo.houseHold || [], // true string 籍贯
        address: window.api.pageParam.baseInfo.address || [],
        street: window.api.pageParam.baseInfo.street || '',
        phone: window.api.pageParam.baseInfo.phone || '', // true string手机
        email: window.api.pageParam.baseInfo.email || '', // true string 邮箱

        introduction: window.api.pageParam.introduction
      },
      nameRules: [{ validate: val => !!val, message: '必须填写姓名' }],
      birthdayRules: [{ validate: val => val, message: '必须填写出生年月' }],
      houseHoldRules: [
        {
          validate: val => this.houseHoldText.length > 0,
          message: '必须填写籍贯'
        }
      ],
      addressRules: [
        {
          validate: val => this.addressText.length > 0,
          message: '必须填写地址信息'
        }
      ],
      streetRules: [
        {
          validate: val => this.form.street.length > 0,
          message: '必须填写街道信息'
        }
      ],
      phoneRules: [
        {
          validate: val => regexps.mobPhone.test(this.form.phone),
          message: '请填写正确的手机号码'
        }
      ],
      emailRules: [
        {
          validate: val => regexps.email.test(this.form.email),
          message: '请填写正确的电子邮箱'
        }
      ]
    };
  },
  computed: {
    birthdayText () {
      return new Date(this.form.birthday);
    },
    houseHoldText () {
      return this.form.houseHold.map(row => row.label).join(' / ');
    },
    addressText () {
      return this.form.address.map(row => row.label).join(' / ');
    }
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
        resumeId: this.id,
        introduction: this.form.introduction
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.toast({
            position: 'top',
            message: '自我描述编辑成功'
          });
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '自我描述编辑失败，请稍后重试！！'
          });
          break;
      }
    },

    submit () {
      this.$refs.form.validate().then((result) => {
        if (result === true) {
          this.edit();
        }
      });
    }
  },
  mounted () {

  }
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
