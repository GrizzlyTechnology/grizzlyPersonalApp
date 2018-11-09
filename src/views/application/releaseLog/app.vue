<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form"  :label-position="labelPosition" label-width="120">
          <div class='mbox'>
            <label for="">实习单位：</label>
           <span>江苏大灰熊科技有限公司</span>
          </div>
           <div class='mbox'>
            <label for="">实习地点：</label>
           <span>江苏省镇江市润州区XX号</span>
          </div>
          <FormItem label="实习时间：" prop="startTime"  :rules="workingTimeRules">
            <DateInput :value="internshipStart" style='width:45%' :max-date="new Date()" @change="changeStartTime" format="YYYY年MM月" no-display view-type="list" container="bottomSheet"></DateInput>
            至
            <DateInput :value="internshipEnd" style='width:45%' :max-date="new Date()" @change="changeEndTime" format="YYYY年MM月" no-display view-type="list" container="bottomSheet"></DateInput>
          </FormItem>
           <div class='mbox'>
            <label for="">实习部门：</label>
           <span>技术部</span>
          </div>
          <div class='mbox'>
            <label for="">实习岗位：</label>
           <span>研发组</span>
          </div>
          <div class='tips'>本月已写周志3次</div>
           <FormItem label="本周工作内容：" prop="title">
              <TextField multi-line
              v-model="form.workContent"
              :max-length="100"
              :rows="5"
              :rows-max="5"></TextField>
          </FormItem>
           <FormItem label="本周收获：" prop="title">
              <TextField multi-line
              v-model="form.reward"
              :max-length="100"
              :rows="5"
              :rows-max="5"></TextField>
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
// import service from 'service';
// import moment from 'moment';
import { Button, TextField, DateInput } from 'muse-ui';
import Upload from 'element-ui/lib/upload';
import Progress from 'element-ui/lib/progress';
import { Form, FormItem } from 'muse-ui/lib/Form';
// import regexps from 'util/regexps';
// import tools from 'util/tools';
// import { hostList } from 'service/mock';
export default {
  data () {
    return {
      labelPosition: 'top',
      form: {
        internshipStart: '',
        internshipEnd: '',
        workContent: 'sdfsdfsdfsdf',
        reward: 'dgdfgdfgdfgdfg'
      },
      workingTimeRules: [
        { validate: val => this.form.internshipStart <= this.form.internshipEnd, message: '开始时间不能在结束时间之后' }
      ]
    };
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField,
    Upload,
    DateInput,
    Progress
  },
  computed: {
    // internshipStart () {
    //   return new Date(this.form.startTime);
    // },
    // internshipEnd () {
    //   return new Date(this.form.endTime);
    // }
  },
  methods: {
    changeStartTime (date) {
      this.form.internshipStart = date.valueOf();
    },
    changeEndTime (date) {
      this.form.internshipEnd = date.valueOf();
    }
  },
  mounted () {

  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.content{
  background:#fff;
}

label,.mu-form-item-label{
  color: #000;
}

body .mu-text-field-input{
  color:rgba(0, 0, 0, 0.54);
}

.mbox{
color:rgba(0, 0, 0, 0.54);
margin-bottom: 10px;
}

.tips{
  margin-bottom: 5px;
  color: red;
}
</style>
