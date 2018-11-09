<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="名称" prop="skillName" :rules="skillNameRules">
            <TextField v-model="form.skillName"></TextField>
          </FormItem>
          <FormItem label="熟练度" prop="proficiencyText">
            <TextField v-model="proficiencyText" readonly @click="proficiencyPopup"></TextField>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="submit">保存</Button>
    </div>
    <PickerPopup ref="proficiencyPopup" :slots="proficiencyPopupSlots" @confirm="setProficiency"></PickerPopup>
  </div>
</template>

<script>
import service from 'service';
// import moment from 'moment';
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
        skillName: window.api && window.api.pageParam.skill ? window.api.pageParam.skill.skillName : '',
        proficiency: window.api && window.api.pageParam.skill ? window.api.pageParam.skill.proficiency : 1
      },
      skillNameRules: [{ validate: val => !!val, message: '必须填写技能名称' }]
    };
  },
  computed: {
    proficiencyText () {
      return dictMap.skillLevel[this.form.proficiency - 1];
    },
    proficiencyPopupSlots () {
      return [
        {
          flex: 1,
          defaultIndex: this.form.proficiency - 1,
          values: dictMap.skillLevel
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
      const response = await service.createUserSkill({
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
            message: '技能评估创建失败，请稍后重试！！'
          });
          break;
      }
    },
    async edit () {
      // console.log(JSON.stringify(this.form));
      tools.showProgress();
      const response = await service.updateUserSkill({
        skillId: this.id,
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
            message: '技能评估编辑失败，请稍后重试！！'
          });
          break;
      }
    },
    setProficiency (data) {
      this.form.proficiency = dictMap.skillLevel.indexOf(data) + 1;
    },
    proficiencyPopup () {
      this.$refs.proficiencyPopup.open();
    },
    submit () {
      this.$refs.form.validate().then(result => {
        if (result === true) {
          // console.log(this.id);
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
// .startDateTime{
//   bottom: 50px;
// }
</style>
