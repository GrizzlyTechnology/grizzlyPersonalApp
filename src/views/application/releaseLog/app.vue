<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form" :label-position="labelPosition" label-width="120">
          <div class='mbox'>
            <label for="">实习单位：</label>
            <span>{{internshipCompanyInfo.companyName}}</span>
          </div>
          <div class='mbox'>
            <label for="">实习地点：</label>
            <span>{{internshipCompanyInfo.internshipAddress}}</span>
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
          <div class='tips'>本月已写周志<span> 3 </span>次</div>
          <FormItem label="本周工作内容：" prop="title" :rules='workContentRules'>
            <TextField multi-line v-model="form.workContent" :max-length="300" :rows="15" :rows-max="15"></TextField>
          </FormItem>
          <FormItem label="本周收获：" prop="title" :rules='rewardRules'>
            <TextField multi-line v-model="form.reward" :max-length="300" :rows="15" :rows-max="15"></TextField>
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
// import service from 'service';
import { Button, TextField, DateInput } from "muse-ui";
import Upload from "element-ui/lib/upload";
import Progress from "element-ui/lib/progress";
import { Form, FormItem } from "muse-ui/lib/Form";
export default {
  data() {
    return {
      labelPosition: "top",
      form: {
        internshipStart: "",
        internshipEnd: "",
        workContent: "sdfsdfsdfsdf",
        reward: "dgdfgdfgdfgdfg"
      },
      internshipCompanyInfo: {
        companyName: window.api.pageParam.companyName,
        department: window.api.pageParam.department,
        group: window.api.pageParam.group,
        internshipAddress: window.api.pageParam.internshipAddress
      },
      internshipTimeRules: [
        {
          validate: val => this.form.internshipStart <= this.form.internshipEnd,
          message: "开始时间不能在结束时间之后"
        }
      ],
      workContentRules: [
        { validate: val => !!val, message: "必须填写本周工作内容" }
      ],
      rewardRules: [{ validate: val => !!val, message: "必须填写本周收获" }]
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
  mounted() {}
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.content {
  background: #fff;
}

label,
.mu-form-item-label {
  color: #000;
}

body .mu-text-field-input {
  color: rgba(0, 0, 0, 0.54);
}

.mbox {
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 10px;
}

.tips {
  margin-bottom: 5px;
  color: red;
}
</style>
