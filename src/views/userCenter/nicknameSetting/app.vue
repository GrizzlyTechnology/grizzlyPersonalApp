<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="昵称" prop="nickName" :rules="nicknameRules">
            <TextField v-model="form.nickName"></TextField>
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
// import moment from 'moment';
import { Button, TextField } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import tools from 'util/tools';
// import dictMap from 'util/dictMap';
export default {
  data () {
    return {
      form: {
        nickName: window.api ? window.api.pageParam.nickname : '' // true string 真实姓名
      },
      nicknameRules: [{ validate: val => !!val, message: '必须填写昵称' }]
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
      const response = await service.userSetting({
        ...this.form
      });
      // console.log(JSON.stringify(this.form));
      tools.hideProgress();
      // console.log(JSON.stringify(response));
      switch (response.code) {
        case 0:
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '昵称修改失败，请稍后重试！！'
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
