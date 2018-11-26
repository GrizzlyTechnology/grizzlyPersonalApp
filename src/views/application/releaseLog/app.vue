<template>
  <div class="content">
    <div class="tip">
      <Icon value=":el-icon-warning"></Icon> 本月已写周志3次
    </div>
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form" :label-position="labelPosition" label-width="120">
          <FormItem label="实习单位">
            <TextField underline-color="#d7d7d7" readonly v-model="internshipCompanyInfo.companyName"></TextField>
          </FormItem>
          <FormItem label="实习地点">
            <TextField underline-color="#d7d7d7" readonly v-model="internshipCompanyInfo.internshipAddress"></TextField>
          </FormItem>
          <FormItem label="实习时间：" prop="startTime" :rules="internshipTimeRules">
            <DateInput style='width:40%;margin-right:15px;' :value="startTimeText" :max-date="new Date()" @change="changeStartTime" no-display view-type="list" container="bottomSheet"></DateInput>
            至
            <DateInput style='width:40%;margin-left:15px' :value="endTimeText" :max-date="new Date()" @change="changeEndTime" no-display view-type="list" container="bottomSheet"></DateInput>
          </FormItem>
          <FormItem label="实习部门">
            <TextField underline-color="#d7d7d7" readonly v-model="internshipCompanyInfo.department"></TextField>
          </FormItem>
          <FormItem label="实习岗位">
            <TextField underline-color="#d7d7d7" readonly v-model="internshipCompanyInfo.group"></TextField>
          </FormItem>

          <!-- <div class='tips'>本月已写周志<span> 3 </span>次</div> -->
          <FormItem label="本周工作内容：" prop="title" :rules='workContentRules'>
            <TextField multi-line v-model="form.workContent" :max-length="255" :rows="5" :rows-max="5"></TextField>
          </FormItem>
          <FormItem label="本周收获：" prop="title" :rules='rewardRules'>
            <TextField multi-line v-model="form.reward" :max-length="255" :rows="5" :rows-max="5"></TextField>
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
import tools from 'util/tools';
import { Icon, Alert, Button, TextField, DateInput } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
export default {
  data () {
    return {
      labelPosition: 'top',
      form: {
        internshipStart: Date.parse(new Date()) - 24 * 60 * 60 * 1000,
        internshipEnd: Date.parse(new Date()),
        workContent: '',
        reward: ''
      },
      internshipCompanyInfo: {
        companyName: window.api ? window.api.pageParam.companyName : '',
        department: window.api ? window.api.pageParam.department : '',
        group: window.api ? window.api.pageParam.group : '',
        internshipAddress: window.api
          ? window.api.pageParam.internshipAddress
          : ''
      },
      internshipTimeRules: [
        {
          validate: val => this.form.internshipStart <= this.form.internshipEnd,
          message: '开始时间不能在结束时间之后'
        }
      ],
      workContentRules: [
        { validate: val => !!val, message: '必须填写本周工作内容' }
      ],
      rewardRules: [{ validate: val => !!val, message: '必须填写本周收获' }]
    };
  },
  components: {
    Alert,
    Button,
    DateInput,
    Form,
    FormItem,
    Icon,
    TextField
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
    async edit () {
      tools.showProgress();
      const response = await service.submitApplyForm({
        ...this.form,
        enterpriseid: this.companyId
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '实习日志编辑失败，请稍后重试！！'
          });
          break;
      }
    },
    submit () {
      this.$refs.form.validate().then(result => {
        if (result === true) {
          this.edit();
        }
      });
    }
  },
  mounted () {}
};
</script>
<style lang="less">
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
.tip{
  padding: 10px;
  background-color:#d6ebff;
  color: #409eff;
}
</style>
