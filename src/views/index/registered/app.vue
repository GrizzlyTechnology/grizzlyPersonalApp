<template>
  <div class="content">
    <Form ref="form" :model="form" >
      <FormItem
        label="手机"
        prop="phone"
        :rules="phoneRules"
      >
        <TextField v-model="form.phone"></TextField>
      </FormItem>
      <!-- <FormItem
        label="验证码"
        prop="verificationImg"
        :rules="verificationImgRules"
      >
        <TextField v-model="form.verificationImg" class="verificationCode"></TextField>
        <img @click="changeVerificationImg" class="verificationCodeImg" :src="'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png?' + reVerificationImg"/>
      </FormItem> -->
      <FormItem
        label="短信验证码"
        prop="messageCode"
        :rules="verificationCodeRules"
      >
        <TextField v-model="form.messageCode" class="verificationCode"></TextField>
        <Button
          color="#009688"
          textColor="#ffffff"
          class="getVerificationCode"
          :disabled="verificationCodeBtnText !=='获取验证码'"
          @click="getVerificationCode"
        >
          {{verificationCodeBtnText}}
        </Button>
      </FormItem>
      </FormItem>
        <FormItem
        label="性别"
        prop="sex"
        v-if="type!=='qq' && type!=='wx'"
      >
        <Radio v-model="form.sex" :value="1" label="男"></Radio>
        <Radio v-model="form.sex" :value="0" label="女"></Radio>
      </FormItem>
      <FormItem
        label="密码"
        prop="passWord"
        help-text="请填写6-32位数字或大小写字母"
        :rules="passWordRules"
      >
        <TextField v-model="form.passWord" type="password"></TextField>
      </FormItem>
      <FormItem
        label="确认密码"
        prop="rePassword"
        help-text="请填写6-32位数字或大小写字母"
        :rules="rePasswordRules"
      >
        <TextField v-model="form.rePassword" type="password"></TextField>
      </FormItem>
    </Form>
    <Button color="#009688" textColor="#ffffff" :style="{marginTop:'30px',boxShadow: '0 0 0'}" :full-width="true" large @click="submit">注册{{type==='qq'?'并绑定QQ账户':type==='wx'?'并绑定微信账户':''}}</Button>
    <div class="registeredDescription">
      注册即代表您同意并遵守<div class='ys' @click="Agreement">《灰熊先生用户协议及隐私政策》</div>
    </div>
  </div>
</template>

<script>
import { Button, TextField, Radio } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import regexps from 'util/regexps';
import tools from 'util/tools';
import service from 'service';
import { setTimeout } from 'timers';

export default {
  data () {
    return {
      maxTime: 60,
      verificationCodeBtnText: '获取验证码',
      reVerificationImg: (new Date().getTime()) + '_' + Math.random(),
      form: {
        phone: '',
        // verificationImg: '',
        sex: 1,
        messageCode: '',
        passWord: '',
        rePassword: ''
      },
      phoneRules: [
        { validate: val => regexps.mobPhone.test(val), message: '请填写正确的手机号码' }
      ],
      verificationImgRules: [
        { validate: val => !!val, message: '请填写验证码' }
      ],
      verificationCodeRules: [
        { validate: val => !!val, message: '请填写验证码' }
      ],
      passWordRules: [
        { validate: val => regexps.password.test(val), message: '请填写6-32位数字或大小写字母' }
      ],
      rePasswordRules: [
        { validate: val => regexps.password.test(val), message: '请填写6-32位数字或大小写字母' },
        { validate: val => this.form.passWord === this.form.rePassword, message: '两次密码输入不一致' }
      ],
      type:window.api.pageParam.type!==undefined?window.api.pageParam.type:'',
    };
  },
  components: {
    Button,
    Form,
    Radio,
    FormItem,
    TextField
  },
  methods: {
    async registered () {
        if(this.type==='qq' || this.type==='wx'){
            this.form.nickName=window.api.pageParam.info.nickname;
            this.form.sex=window.api.pageParam.info.sex;
            this.form.headPhoto=window.api.pageParam.info.headphoto;
            this.form.openId=window.api.pageParam.info.openid;
            this.form.type=this.type;
        }
      tools.showProgress();
      const response = await service.registered(this.form);
      tools.hideProgress();
      switch (response.code) {
        case 0:
          // window.api.sendEvent({
          //   name: 'event'
          // });
          window.api.closeWin({
            name: 'login'
          });
          alert("注册成功"+(this.type==='qq'?'且已绑定QQ账户':this.type==='wx'?'且已绑定微信账户':''));
          setTimeout(function(){
              tools.openWin({
                name: 'login',
                url: '../win.html',
                title: '用户登录',
                fname: 'login_f',
                furl: './index/login.html',
                data:{
                    comefrom:'registered'
                }
                });
          },500);
          // const login = await service.login({
          //   phone: this.form.phone,
          //   passWord: this.form.passWord,
          //   deviceId: window.api.deviceId
          // });
          // alert(login.code);
          // switch (login.code) {
          //   case 0:
          //     tools.setStorage('token', login.result.token);
          //     tools.setStorage('phone', login.result.userinfo.phone);
          //     tools.setStorage('userInfo', login.result.userinfo);
          //     break;
          // }
          break;
        default:
          tools.toast({
            position: 'top',
            message: response.message
          });
          break;
      }
    },
    async getVerificationCode () {
      if (regexps.mobPhone.test(this.form.phone)) {
        const response = await service.getVerificationCode({
          phone: this.form.phone
        });
        switch (response.code) {
          case 0:
            this.verificationCodeBtnText = 60 + ' (s)';
            for (let i = 1; i <= this.maxTime; i++) {
              await tools.sleep(1000);
              this.verificationCodeBtnText = (this.maxTime - i) + '(s)';
            }
            this.verificationCodeBtnText = '获取验证码';
            break;

          default:
            tools.toast({
              position: 'top',
              message: '验证码获取失败'
            });
            break;
        }
      } else {
        tools.toast({
          position: 'top',
          message: '请填写手机'
        });
      }
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result === true) {
          this.registered();
        }
      });
    },
    changeVerificationImg () {
      this.reVerificationImg = (new Date().getTime()) + '_' + Math.random();
    },
    Agreement(){
      tools.openWin({
          name: 'ys',
          url: '../win.html',
          title: '用户协议及隐私政策',
          fname: 'ys_f',
          furl: 'http://www.dhxhr.com/yinsi.html',
          hasLeft: 1
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
.content{padding: 15px}
.verificationCode{
  width: 66.666%
}
.verificationCodeImg{
  width: 33.333%;
  height: 32px;
}
.getVerificationCode{
  width: 33.3333%;
  margin: 0 !important;
  box-shadow: 0 0 0;
}
.registeredDescription{
  text-align: center;
  font-size: 12px;
  margin-top: 30px;
}

.ys{
  color: #009688;
}
</style>
