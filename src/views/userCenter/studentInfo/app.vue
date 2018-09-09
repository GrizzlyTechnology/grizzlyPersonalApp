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
        label="入学时间"
      >
        <DateInput
          :value="startDateTimeText"
          :max-date="new Date()"
          @change="changeStartDateTime"
          format="YYYY年MM月DD日"
          no-display
          view-type="list"
          container="bottomSheet"
        />
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
    <Button color="#009688" textColor="#ffffff" :full-width="true" :style="{boxShadow: '0 0 0'}" large @click="submit">完成</Button>
  </div>
</template>

<script>
// import moment from 'moment';
import service from 'service';
import { DateInput, Button, TextField, Radio } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import regexps from 'util/regexps';
import tools from 'util/tools';

const userInfo = tools.getStorage('userCenter/userInfo');
export default {
  name: 'userInfo',
  data () {
    return {
      startDateTime: new Date(),
      form: {
        name: '',
        sex: 1,
        identity: '',
        phone: '',
        nrolmenttime: (new Date()).valueOf(),
        year: userInfo.year.value,
        college: userInfo.college[0].value,
        major: userInfo.major.value,
        schoolId: userInfo.school.value,
        yearClassId: userInfo.class.value
      },
      nameRules: [
        { validate: val => !!val, message: '必须填写姓名' }
      ],
      identityRules: [
        { validate: val => regexps.IdCard.test(val), message: '填写正确的身份证信息' }
      ],
      phoneRules: [
        { validate: val => regexps.mobPhone.test(val), message: '填写正确的手机号码' }
      ]
    };
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField,
    Radio,
    DateInput
  },
  computed: {
    startDateTimeText () {
      return new Date(this.form.nrolmenttime) || Date.now();
    }
  },
  methods: {
    async create () {
      const response = await service.createStudent(this.form);
      switch (response.code) {
        case 0:
          tools.toast({
            position: 'top',
            message: '学生信息创建成功！'
          });
          window.api.closeToWin({
            name: 'root'
          });
          break;
        default:
          tools.toast({
            position: 'top',
            message: '学生信息创建失败，请稍后重试！！'
          });
          break;
      }
    },
    async getUserInfo () {
      tools.showProgress();
      const response = await service.getUserInfo();
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.form.name = response.result.userInfo.name || this.form.name;
          this.form.sex = response.result.userInfo.sex || this.form.sex;
          this.form.identity = response.result.userInfo.identity || this.form.identity;
          this.form.phone = response.result.userInfo.phone || this.form.phone;
          break;
        default:
          break;
      }
    },
    changeStartDateTime (date) {
      this.form.nrolmenttime = date.valueOf();
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result === true) {
          this.create();
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
