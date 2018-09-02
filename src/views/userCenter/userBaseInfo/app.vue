<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
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
            label="出生年月"
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
          <FormItem
            label="毕业时间"
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
          <FormItem
            label="户籍"
            prop="personId"
            :rules="personIdRules"
          >
            <TextField v-model="form.personId"></TextField>
          </FormItem>
          <FormItem
            label="现居地"
            prop="personId"
            :rules="personIdRules"
          >
            <TextField v-model="form.personId"></TextField>
          </FormItem>
          <FormItem
            prop="personId"
            :rules="personIdRules"
          >
            <TextField v-model="form.personId"></TextField>
          </FormItem>
          <FormItem
            label="手机号码"
            prop="personId"
            :rules="personIdRules"
          >
            <TextField v-model="form.personId"></TextField>
          </FormItem>
          <FormItem
            label="电子邮箱"
            prop="personId"
            :rules="personIdRules"
          >
            <TextField v-model="form.personId"></TextField>
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
import { Toast } from 'mint-ui';
import service from 'service';
import moment from 'moment';
import { Button, TextField, Radio, DateInput } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import regexps from 'util/regexps';
import tools from 'util/tools';
export default {
  name: 'userInfo',
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
.content{
    height: 100%;
  display: flex;
  flex-direction: column;
}
.bodyer{
    flex: 1;
    overflow: auto;
}
// .startDateTime{
//   bottom: 50px;
// }
</style>
