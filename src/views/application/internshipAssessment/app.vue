<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form" :label-position="labelPosition" label-width="120">
          <div class='mbox'>
            <label for="">实习单位：</label>
            <span>{{internshipCompanyInfo.companyName}}</span>
          </div>
          <FormItem label="实习时间：" prop="startTime" :rules="internshipTimeRules">
            <DateInput style='width:40%;margin-right:15px;' :value="startTimeText" :max-date="new Date()" @change="changeStartTime" no-display view-type="list" container="bottomSheet"></DateInput>
            至
            <DateInput style='width:40%;margin-left:15px' :value="endTimeText" :max-date="new Date()" @change="changeEndTime" no-display view-type="list" container="bottomSheet"></DateInput>
          </FormItem>
          <div class='mbox'>
            <label for="">实习部门：</label>
            <span>{{internshipCompanyInfo.department}}</span>
          </div>
          <div class='mbox'>
            <label for="">实习岗位：</label>
            <span>{{internshipCompanyInfo.group}}</span>
          </div>
          <!-- <div class='mbox'>
            <label for="">指导师傅：</label>
            <span>XXX</span>
          </div> -->
          <!-- <div class='mbox'>
            <label for="">师傅电话：</label>
            <span>15106111415</span>
          </div> -->
          <div class='mbox'>
            <label for="">姓名：</label>
            <span>{{internshipCompanyInfo.name}}</span>
          </div>
          <div class='mbox'>
            <label for="">班级：</label>
            <span>{{internshipCompanyInfo.class}}</span>
          </div>
          <div class='mbox'>
            <label for="">性别：</label>
            <span>{{internshipCompanyInfo.sex===0?'女':'男'}}</span>
          </div>
          <!-- <div class='mbox'>
            <label for="">学号：</label>
            <span>23025</span>
          </div> -->
          <FormItem label="自我鉴定：" prop="title" :rules="internshipIdentificationRules">
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
import service from "service";
import { Toast } from "mint-ui";
import { Button, TextField, DateInput } from "muse-ui";
import { Form, FormItem } from "muse-ui/lib/Form";
import tool from "util/tools";
export default {
  data() {
    return {
      companyId: window.api.pageParam.companyId,
      labelPosition: "top",
      form: {
        internshipStart: Date.now().valueOf(),
        internshipEnd: Date.now().valueOf(),
        workContent: "sdfsdfsdfsdf"
      },
      internshipCompanyInfo: {
        companyName: window.api.pageParam.companyName,
        department: window.api.pageParam.department,
        group: window.api.pageParam.group,
        name: "",
        class: "",
        sex: ""
      },
      internshipTimeRules: [
        {
          validate: val => this.form.internshipStart <= this.form.internshipEnd,
          message: "开始时间不能在结束时间之后"
        }
      ],
      internshipIdentificationRules:[
        { validate: val => !!val, message: "必须填写自我鉴定" }
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
    startTimeText() {
      return new Date(this.form.internshipStart);
    },
    endTimeText() {
      return new Date(this.form.internshipEnd);
    }
  },
  methods: {
    changeStartTime(date) {
      this.form.internshipStart = date.valueOf();
    },
    changeEndTime(date) {
      this.form.internshipEnd = date.valueOf();
    },
    async getStudentInfoData() {
      tool.showProgress();
      const response = await service.getStudentInfo({});
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.internshipCompanyInfo.name = response.result.studentInfo.name;
          this.internshipCompanyInfo.sex = response.result.studentInfo.sex;
          this.internshipCompanyInfo.class =
            response.result.studentInfo.majorname +
            "系" +
            response.result.studentInfo.classname;
          break;
        default:
          Toast({
            position: "top",
            message: "加载失败，请稍后重试！！"
          });
          break;
      }
    },
    async submitApply() {
      tool.showProgress();
      const response = await service.submitApplyForm({
        ...this.form,
        enterpriseid: this.companyId
      });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          Toast({
            position: "top",
            message: "提交成功"
          });
          tool.closeWin();
          break;
        default:
          Toast({
            position: "top",
            message: "提交成功失败，请稍后重试！！"
          });
          break;
      }
    },
    submit() {
      this.$refs.form.validate().then(result => {
        if (result === true) {
          this.submitApply();
        }
      });
    }
  },
  mounted() {
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

label,
.mu-form-item-label {
  color: #000;
}

body .mu-text-field-input {
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
}

.mbox {
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 10px;
}

</style>
