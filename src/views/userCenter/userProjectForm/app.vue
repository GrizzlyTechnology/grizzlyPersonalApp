<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="项目名称" prop="projectName" :rules="projectNameRules">
            <TextField v-model="form.projectName"></TextField>
          </FormItem>
          <FormItem label="项目职责" prop="duty" :rules="dutyRules">
            <TextField v-model="form.duty"></TextField>
          </FormItem>
          <FormItem label="项目时间" prop="startTime" :rules="workingTimeRules">
            <DateInput class="dateInput" type="month" :value="startTimeText" :max-date="new Date()" @change="changeStartTime" format="YYYY年MM月" no-display view-type="list" container="bottomSheet"></DateInput>
            <span class="joiner">至</span>
            <DateInput class="dateInput" type="month" :value="endTimeText" :max-date="new Date()" @change="changeEndTime" format="YYYY年MM月" no-display view-type="list" container="bottomSheet"></DateInput>
          </FormItem>
          <FormItem label="项目描述" prop="projectDesc">
            <TextField v-model="form.projectDesc" multi-line :max-length="100" :rows="5" :rows-max="5" />
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
        projectName:
          window.api && window.api.pageParam.project
            ? window.api.pageParam.project.projectName
            : '',
        duty:
          window.api && window.api.pageParam.project
            ? window.api.pageParam.project.duty
            : '',
        endTime:
          window.api && window.api.pageParam.project
            ? window.api.pageParam.project.endTime
            : Date.now().valueOf(),
        startTime:
          window.api && window.api.pageParam.project
            ? window.api.pageParam.project.startTime
            : moment()
              .subtract('month', 1)
              .valueOf(),
        projectDesc:
          window.api && window.api.pageParam.project
            ? window.api.pageParam.project.projectDesc
            : ''
      },
      projectNameRules: [
        { validate: val => !!val, message: '必须填写项目名称' }
      ],
      dutyRules: [{ validate: val => val, message: '必须填写项目职责' }],
      workingTimeRules: [
        {
          validate: val => {
            console.log(this.form.startTime, this.form.endTime);
            return (this.form.startTime < this.form.endTime);
          },
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
      // console.log(JSON.stringify({
      //   ...this.form,
      //   resumeId: window.api.pageParam.resumeId
      // }));
      tools.showProgress();
      const response = await service.createUserProject({
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
            message: '项目经验创建失败，请稍后重试！！'
          });
          break;
      }
    },
    async edit () {
      tools.showProgress();
      const response = await service.updateUserProject({
        projectExpId: this.id,
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
            message: '项目经验编辑失败，请稍后重试！！'
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
