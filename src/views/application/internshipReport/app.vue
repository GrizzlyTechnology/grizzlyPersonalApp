<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form" :label-position="labelPosition" label-width="120">
          <FormItem label="实习报告：" prop="title" :rules="internshipReportRules">
            <TextField multi-line v-model="form.internshipReport" :max-length="300" :rows="15" :rows-max="15"></TextField>
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
import { Button, TextField } from "muse-ui";
import { Form, FormItem } from "muse-ui/lib/Form";
import tool from "util/tools";
export default {
  data() {
    return {
      companyId: window.api.pageParam.companyId,
      labelPosition: "top",
      form: {
        internshipReport: ""
      },
      internshipReportRules: [
        { validate: val => !!val, message: "必须填写实习报告" }
      ]
    };
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField
  },
  methods: {
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
