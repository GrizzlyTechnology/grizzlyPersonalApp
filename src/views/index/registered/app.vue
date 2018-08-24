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
        label="性别"
        prop="sex"
      >
        <Radio v-model="form.sex" :value="0" label="男"></Radio>
        <Radio v-model="form.sex" :value="1" label="女"></Radio>
      </FormItem>
      <FormItem
        label="身份证"
        prop="personId"
        :rules="personIdRules"
      >
        <TextField v-model="form.personId"></TextField>
      </FormItem>
      <FormItem
        label="入学时间"
        prop="startDateTime"
      >
        <TextField readonly="readonly" v-model="startDateTimeText" @focus="openStartDateTime"></TextField>
      </FormItem>
    </Form>
    <Button color="#19AD17" textColor="#ffffff" :full-width="true" large @click="step1Submit">注册</Button>
  </div>
</template>

<script>
import moment from 'moment';
import { Button, TextField, Radio } from 'muse-ui';
import { DatetimePicker } from 'mint-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import { DefaultFrame } from 'components';
import regexps from 'util/regexps';
export default {
  data () {
    return {
      startDateTimeText: moment().format('YYYY年MM月DD日'),
      startDateTime: new Date(),
      form: {
        mobilePhoneRules: '',
        sex: 0,
        personId: '',
        startDateTime: (new Date()).valueOf()
      },
      mobilePhoneRules: [
        { validate: val => !!val, message: '必须填写姓名' }
      ],
      personIdRules: [
        { validate: val => regexps.IdCard.test(val), message: '填写正确的身份证信息' }
      ]
    };
  },
  components: {
    DefaultFrame,
    Button,
    Form,
    FormItem,
    TextField,
    Radio,
    DatetimePicker
  },
  methods: {
    async checkUser () {},
    step1Submit () {
      this.$refs.form.validate().then((result) => {
        if (result === true) {
          // 远端验证 checkUser
          this.step = 2;
        }
      });
    },
    openStartDateTime () {
      this.$refs.startDateTime.open();
    },
    changeStartDateTime (date) {
      console.log('1');
      this.startDateTimeText = moment(date).format('YYYY年MM月DD日');
      this.form.startDateTime = (this.startDateTime).valueOf();
    }
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
.content{padding: 15px}
// .startDateTime{
//   bottom: 50px;
// }
</style>
