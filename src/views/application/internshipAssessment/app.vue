<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form" :label-position="labelPosition" label-width="120">
          <FormItem label="实习单位" class='readonlyInput'>
            <TextField underline-color="transparent" readonly v-model="internshipCompanyInfo.companyName"></TextField>
          </FormItem>
          <FormItem label="实习时间" prop="startTime" :rules="internshipTimeRules">
            <DateInput style='width:40%;margin-right:15px;' :value="startTimeText" :max-date="new Date()" @change="changeStartTime" no-display view-type="list" container="bottomSheet"></DateInput>
            至
            <DateInput style='width:40%;margin-left:15px' :value="endTimeText" :max-date="new Date()" @change="changeEndTime" no-display view-type="list" container="bottomSheet"></DateInput>
          </FormItem>
          <FormItem label="实习部门" class='readonlyInput'>
            <TextField  readonly v-model="internshipCompanyInfo.department"></TextField>
          </FormItem>
           <FormItem label="实习岗位" class='readonlyInput'>
            <TextField  readonly v-model="internshipCompanyInfo.group"></TextField>
          </FormItem>
          <FormItem label="姓名" class='readonlyInput'>
            <TextField  readonly v-model="internshipCompanyInfo.name"></TextField>
          </FormItem>
            <FormItem label="班级" class='readonlyInput'>
            <TextField  readonly v-model="internshipCompanyInfo.class"></TextField>
          </FormItem>
            <FormItem label="性别" class='readonlyInput'>
            <TextField  readonly :value="internshipCompanyInfo.sex===0?'女':'男'"></TextField>
          </FormItem>
          <FormItem label="自我鉴定" prop="title" :rules="internshipIdentificationRules">
            <TextField multi-line v-model="form.workContent" :max-length="100" :rows="5" :rows-max="5"></TextField>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="submit">提交</Button>
    </div>
  </div>
</template>

<script>
import service from 'service';
import { Toast } from 'mint-ui';
import moment from 'moment';
import { Button, TextField, DateInput } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import tool from 'util/tools';
export default {
  data () {
    return {
      companyId: window.api ? window.api.pageParam.companyId : '',
      labelPosition: 'top',
      form: {
        internshipStart: Date.parse(
          moment()
            .subtract('day', 1)
            .format('YYYY-MM-DD')
        ),
        internshipEnd: Date.parse(
          moment()
            .add('day', 0)
            .format('YYYY-MM-DD')
        ),
        workContent: ''
      },
      internshipCompanyInfo: {
        companyName: window.api ? window.api.pageParam.companyName : '',
        department: window.api ? window.api.pageParam.department : '',
        group: window.api ? window.api.pageParam.group : '',
        name: '',
        class: '',
        sex: ''
      },
      internshipTimeRules: [
        {
          validate: val => this.form.internshipStart <= this.form.internshipEnd,
          message: '开始时间不能在结束时间之后'
        }
      ],
      internshipIdentificationRules: [
        { validate: val => this.form.workContent.length > 0, message: '必须填写自我鉴定' }
      ]
    };
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField,
    DateInput
  },
  computed: {
    startTimeText () {
      return new Date(this.form.internshipStart);
    },
    endTimeText () {
      return new Date(this.form.internshipEnd);
    }
  },
  methods: {
    changeStartTime (date) {
      this.form.internshipStart = date.valueOf();
    },
    changeEndTime (date) {
      this.form.internshipEnd = date.valueOf();
    },
    async getStudentInfoData () {
      tool.showProgress();
      const response = await service.getStudentInfo({});
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.internshipCompanyInfo.name = response.result.studentInfo.name;
          this.internshipCompanyInfo.sex = response.result.studentInfo.sex;
          this.internshipCompanyInfo.class =
            response.result.studentInfo.majorname +
            '系' +
            response.result.studentInfo.classname;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    },
    async submitApply () {
      tool.showProgress();
      const response = await service.submitApplyForm({
        ...this.form,
        enterpriseid: this.companyId
      });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          Toast({
            position: 'top',
            message: '提交成功'
          });
          tool.closeWin();
          break;
        default:
          Toast({
            position: 'top',
            message: '提交成功失败，请稍后重试！！'
          });
          break;
      }
    },
    submit () {
      this.$refs.form.validate().then(result => {
        if (result === true) {
          this.submitApply();
        }
      });
    }
  },
  mounted () {
    this.getStudentInfoData();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.content {
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bodyer {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

body .readonlyInput .mu-input-line{
  height: 0;
}

// label,
// .mu-form-item-label {
//   color: #000;
// }

// body .mu-text-field-input {
//   color: rgba(0, 0, 0, 0.54);
//   font-size: 14px;
// }

// .mbox {
//   color: rgba(0, 0, 0, 0.54);
//   margin-bottom: 10px;
// }
</style>
