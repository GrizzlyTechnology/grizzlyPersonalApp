<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="作品名称" prop="title" :rules="titleRules">
            <TextField v-model="form.title"></TextField>
          </FormItem>
          <FormItem label="作品地址" prop="url" :rules="urlRules">
            <TextField v-model="form.url" placeholder="作品地址必须以http或https开头"></TextField>
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
import regexps from 'util/regexps';
import tools from 'util/tools';
// import dictMap from 'util/dictMap';
// import dictMap from 'util/dictMap';
export default {
  data () {
    return {
      id: window.api ? window.api.pageParam.id : null,
      form: {
        title: window.api && window.api.pageParam.opus ? window.api.pageParam.opus.title : '',
        url: window.api && window.api.pageParam.opus ? window.api.pageParam.opus.url : '',
        type: 1
      },
      titleRules: [{ validate: val => !!val, message: '必须填写作品名称' }],
      urlRules: [{ validate: val => regexps.httpUrl.test(val), message: '请填写正确的作品地址' }]
    };
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField
  },
  methods: {
    async create () {
      tools.showProgress();
      const response = await service.createUserOpus({
        ...this.form,
        resumeId: window.api.pageParam.resumeId
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '在线作品创建失败，请稍后重试！！'
          });
          break;
      }
    },
    async edit () {
      tools.showProgress();
      const response = await service.updateUserOpus({
        opusId: this.id,
        ...this.form
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '在线作品编辑失败，请稍后重试！！'
          });
          break;
      }
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
.dateInput{
  width: 40%;
}
.joiner{
  width: 20%;
  text-align: center;
}
// .startDateTime{
//   bottom: 50px;
// }
</style>
