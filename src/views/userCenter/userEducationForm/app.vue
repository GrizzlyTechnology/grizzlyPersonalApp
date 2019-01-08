<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="学校名称" prop="schoolName" :rules="schoolNameRules">
            <TextField v-model="form.schoolName"></TextField>
          </FormItem>
          <FormItem label="专业" prop="major" :rules="majorRules">
            <TextField v-model="form.major"></TextField>
          </FormItem>
          <FormItem label="学历" prop="education">
            <TextField v-model="form.education" readonly @click="educationPopup"></TextField>
          </FormItem>
          <FormItem label="入校时间" prop="inSchoolTime" :rules="schoolTimeRules">
            <DateInput type="month" :value="inSchoolTimeText" :max-date="new Date()" @change="changeInSchoolTime" format="YYYY年MM月" no-display view-type="list" container="bottomSheet"></DateInput>
          </FormItem>
          <FormItem label="毕业年月" prop="graduationTime" :rules="schoolTimeRules">
            <DateInput type="month" :value="graduationTimeText" @change="changeGraduationTime" format="YYYY年MM月" no-display view-type="list" container="bottomSheet"></DateInput>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="submit">保存</Button>
    </div>
    <PickerPopup ref="educationPopup" :slots="educationPopupSlots" @confirm="setEducation"></PickerPopup>
  </div>
</template>

<script>
import service from 'service';
import moment from 'moment';
import { Button, TextField, DateInput } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import PickerPopup from 'components/PickerPopup';
// import regexps from 'util/regexps';
import tools from 'util/tools';
import dictMap from 'util/dictMap';
// import dictMap from 'util/dictMap';
export default {
  data () {
    return {
      id: window.api ? window.api.pageParam.id : null,
      form: {
        schoolName:
          window.api && window.api.pageParam.education
            ? window.api.pageParam.education.schoolName
            : '',
        major:
          window.api && window.api.pageParam.education
            ? window.api.pageParam.education.major
            : '',
        education:
          window.api && window.api.pageParam.education
            ? window.api.pageParam.education.education
            : dictMap.education[0],
        inSchoolTime:
          window.api && window.api.pageParam.education
            ? window.api.pageParam.education.inSchoolTime
            : Date.parse(
              moment()
                .subtract('month', 1)
                .format('YYYY-MM-') + '01'
            ),
        graduationTime:
          window.api && window.api.pageParam.education
            ? window.api.pageParam.education.graduationTime
            : Date.parse(
              moment()
                .add('month', 0)
                .format('YYYY-MM-' + '01')
            )
      },
      schoolNameRules: [
        { validate: val => !!val, message: '必须填写学校名称' }
      ],
      majorRules: [{ validate: val => val, message: '必须填写专业' }],
      schoolTimeRules: [
        {
          validate: val => this.form.inSchoolTime < this.form.graduationTime,
          message: '入校时间不能在毕业时间之后'
        }
      ]
    };
  },
  computed: {
    inSchoolTimeText () {
      return new Date(this.form.inSchoolTime);
    },
    graduationTimeText () {
      return new Date(this.form.graduationTime);
    },
    educationPopupSlots () {
      return [
        {
          flex: 1,
          defaultIndex: dictMap.education.indexOf(this.form.education),
          values: dictMap.education
        }
      ];
    }
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField,
    DateInput,
    PickerPopup
  },
  methods: {
    async create () {
      tools.showProgress();
      const response = await service.createUserEducation({
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
            message: '教育经历创建失败，请稍后重试！！'
          });
          break;
      }
    },
    async edit () {
      tools.showProgress();
      const response = await service.updateUserEducation({
        educationExpId: this.id,
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
            message: '教育经历编辑失败，请稍后重试！！'
          });
          break;
      }
    },
    changeInSchoolTime (date) {
      this.form.inSchoolTime = Date.parse(date);
    },
    changeGraduationTime (date) {
      this.form.graduationTime = Date.parse(date);
    },
    setEducation (data) {
      this.form.education = data;
    },
    educationPopup () {
      this.$refs.educationPopup.open();
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
  -webkit-overflow-scrolling: touch;
}
// .startDateTime{
//   bottom: 50px;
// }
</style>
