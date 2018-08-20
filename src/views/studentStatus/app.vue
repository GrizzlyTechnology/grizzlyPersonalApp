<template>
  <DefaultFrame
    title="学生信息"
  >
    <div class="formCon">
      <div v-if="step===1">
        <Form ref="step1Form" :model="step1Form" >
          <FormItem
            label="姓名"
            prop="name"
            :rules="nameRules"
          >
            <TextField v-model="step1Form.name"></TextField>
          </FormItem>
           <FormItem
            label="性别"
            prop="sex"
          >
            <Radio v-model="step1Form.sex" :value="0" label="男"></Radio>
            <Radio v-model="step1Form.sex" :value="1" label="女"></Radio>
          </FormItem>
          <FormItem
            label="身份证"
            prop="personId"
            :rules="personIdRules"
          >
            <TextField v-model="step1Form.personId"></TextField>
          </FormItem>
          <FormItem
            label="入学时间"
            prop="startDateTime"
          >
            <TextField v-model="startDateTimeText" @focus="openStartDateTime"></TextField>
          </FormItem>
        </Form>
        <Button color="#067BDA" textColor="#ffffff" :full-width="true" large >下一步</Button>
      </div>
      <div v-if="step===2">2</div>
      <div v-if="step===3">3</div>
      <div v-if="step===4">4</div>
    </div>
    <div slot="modalCon">
      <DatetimePicker
        class="startDateTime"
        ref="startDateTime"
        type="date"
        v-model="startDateTime"
        @confirm="changeStartDateTime"
      >
      </DatetimePicker>
    </div>
  </DefaultFrame>
</template>

<script>
import moment from 'moment';
import { Button, TextField, Radio } from 'muse-ui';
import { DatetimePicker } from 'mint-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import { DefaultFrame } from 'components';

export default {
  data () {
    return {
      step: 1,
      startDateTimeText: moment().format('YYYY年MM月DD日'),
      startDateTime: new Date(),
      step1Form: {
        name: '',
        sex: 0,
        personId: '',
        startDateTime: (new Date()).valueOf()
      },
      nameRules: [
        { validate: val => !!val, message: '必须填写用户名' }
      ],
      personIdRules: [
        { validate: val => !!val, message: '填写正确的身份证信息' }
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
    openStartDateTime () {
      this.$refs.startDateTime.open();
    },
    changeStartDateTime (date) {
      console.log('1');
      this.startDateTimeText = moment(date).format('YYYY年MM月DD日');
      this.step1Form.startDateTime = (this.startDateTime).valueOf();
    }
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/base.less');
.formCon{padding: 15px}
.startDateTime{
  bottom: 50px;
}
</style>
