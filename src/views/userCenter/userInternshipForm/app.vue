<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="公司名称" prop="companyName" :rules="companyNameRules">
            <TextField v-model="form.companyName"></TextField>
          </FormItem>
          <FormItem label="岗位" prop="post" :rules="postRules">
            <TextField v-model="form.post"></TextField>
          </FormItem>
          <FormItem label="在职时间" prop="startTime" :rules="workingTimeRules">
            <DateInput class="dateInput" type="month" :value="startTimeText" :max-date="new Date()" @change="changeStartTime" format="YYYY年MM月" no-display view-type="list" container="bottomSheet"></DateInput>
            <span class="joiner">至</span>
            <DateInput class="dateInput" type="month" :value="endTimeText" :max-date="new Date()" @change="changeEndTime" format="YYYY年MM月" no-display view-type="list" container="bottomSheet"></DateInput>
          </FormItem>
          <FormItem label="工作内容" prop="jobContent">
            <TextField v-model="form.jobContent" multi-line :max-length="100" :rows="5" :rows-max="5" />
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
import service from 'service';
import moment from 'moment';
import { Button, TextField, DateInput } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
// import regexps from 'util/regexps';
import tools from 'util/tools';
// import dictMap from 'util/dictMap';
// import dictMap from 'util/dictMap';
export default {
  data () {
    return {
      id: window.api ? window.api.pageParam.id : null,
      form: {
        companyName:
          window.api && window.api.pageParam.internship
            ? window.api.pageParam.internship.companyName
            : '',
        endTime:
          window.api && window.api.pageParam.internship
            ? window.api.pageParam.internship.endTime
            : Date.parse(moment().add('month', 0).format('YYYY-MM-' + '01')),
        startTime:
          window.api && window.api.pageParam.internship
            ? window.api.pageParam.internship.startTime
            : Date.parse(moment().subtract('month', 1).format('YYYY-MM-') + '01'),
        jobContent:
          window.api && window.api.pageParam.internship
            ? window.api.pageParam.internship.jobContent
            : '',
        post:
          window.api && window.api.pageParam.internship
            ? window.api.pageParam.internship.post
            : ''
      },
      companyNameRules: [
        { validate: val => !!val, message: '必须填写公司名称' }
      ],
      postRules: [{ validate: val => val, message: '必须填写岗位' }],
      workingTimeRules: [
        {
          validate: val => this.form.startTime < this.form.endTime,
          message: '开始时间不能在结束时间之后'
        }
      ]
    };
  },
  computed: {
    startTimeText () {
      return new Date(this.form.startTime);
    },
    endTimeText () {
      return new Date(this.form.endTime);
    }
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField,
    DateInput
  },
  methods: {
    async create () {
      tools.showProgress();
      const response = await service.createUserInternship({
        ...this.form,
        resumeId: window.api.pageParam.resumeId
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          // tools.toast({
          //   position: 'top',
          //   message: '教育经历创建成功'
          // });
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '实习经历创建失败，请稍后重试！！'
          });
          break;
      }
    },
    async edit () {
      tools.showProgress();
      const response = await service.updateUserInternship({
        internshipExpId: this.id,
        ...this.form
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          // tools.toast({
          //   position: 'top',
          //   message: '教育经历编辑成功'
          // });
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '实习经历编辑失败，请稍后重试！！'
          });
          break;
      }
    },
    changeStartTime (date) {
      this.form.startTime = date.valueOf();
    },
    changeEndTime (date) {
      this.form.endTime = date.valueOf();
    },
    submit () {
      this.$refs.form.validate().then(result => {
        if (result === true) {
          if (this.id) {
            this.edit();
          } else {
            this.create();
          }
        }
      });
    }
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
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
.dateInput {
  width: 40%;
}
.joiner {
  width: 20%;
  text-align: center;
}
// .startDateTime{
//   bottom: 50px;
// }
</style>
