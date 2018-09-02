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
        <DateInput
          :value="startDateTimeText"
          @change="changeStartDateTime"
          format="YYYY年MM月DD日"
          no-display
          view-type="list"
          container="bottomSheet"
        ></DateInput>
      </FormItem>
    </Form>
    <Button color="#009688" textColor="#ffffff" :full-width="true" :style="{boxShadow: '0 0 0'}" large @click="submit">下一步</Button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import service from 'service';
import moment from 'moment';
import { Button, TextField, Radio, DateInput } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import regexps from 'util/regexps';
import tools from 'util/tools';
export default {
  data () {
    return {
      startDateTime: new Date(),
      form: {
        name: '',
        sex: 0,
        personId: '',
        startDateTime: (new Date()).valueOf()
      },
      nameRules: [
        { validate: val => !!val, message: '必须填写姓名' }
      ],
      personIdRules: [
        { validate: val => regexps.IdCard.test(val), message: '填写正确的身份证信息' }
      ]
    };
  },
  computed: {
    startDateTimeText () {
      return moment(this.form.startDateTime).format('YYYY-MM-DD');
    }
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField,
    Radio,
    DateInput
  },
  methods: {
    async check () {
      const response = await service.checkStudent(this.form);
      switch (response.code) {
        case 0:
          tools.openWin({
            name: 'userArea',
            url: '../win.html',
            title: '选择地区',
            fname: 'userArea_f',
            furl: './userCenter/userArea.html'
          });
          tools.setStorage('userCenter/userInfo', this.form);
          break;
        default:
          Toast({
            position: 'top',
            message: '学生信息创建失败，请稍后重试！！'
          });
          break;
      }
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result === true) {
          this.check();
        }
      });
    },
    openStartDateTime () {
      this.$refs.startDateTime.open();
    },
    changeStartDateTime (date) {
      this.form.startDateTime = date.valueOf();
    }
  },
  mounted () {
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
