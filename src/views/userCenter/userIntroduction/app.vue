<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="自我描述" prop="introduction" :rules="introductionRules">
            <TextField v-model="form.introduction"></TextField>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="submit">{{id?'保存':'下一步'}}</Button>
    </div>
  </div>
</template>

<script>
import service from 'service';
// import moment from 'moment';
import { Button, TextField } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
// import regexps from 'util/regexps';
import tools from 'util/tools';
// import dictMap from 'util/dictMap';
export default {
  name: 'userInfo',
  data () {
    return {
      id: window.api.pageParam.id || null,
      form: {
        introduction: window.api.pageParam.introduction
      }
    };
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField
  },
  methods: {
    async edit () {
      tools.showProgress();
      const response = await service.updateUserBaesInfo({
        id: this.id,
        introduction: this.form.introduction
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.toast({
            position: 'top',
            message: '自我描述编辑成功'
          });
          window.api.sendEvent({
            name: window.api.pageParam.callback
          });
          window.api.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '自我描述编辑失败，请稍后重试！！'
          });
          break;
      }
    },

    submit () {
      this.$refs.form.validate().then((result) => {
        if (result === true) {
          this.edit();
        }
      });
    }
  },
  mounted () {

  }
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
