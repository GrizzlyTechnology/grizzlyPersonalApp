<template>
    <Container class="formCon">
        <Row class="hpic" justify-content="center">
            <Avatar size="100" color="teal">M</Avatar>
        </Row>
        <Form ref="form" :model="validateForm" class="mu-demo-form">
            <FormItem prop="username" :rules="usernameRules" label="用户名(手机号码)">
                <TextField v-model="validateForm.username" type="number" prop="username">
                </TextField>
            </FormItem>
            <FormItem prop="password" :rules="passwordRules" label="密 码">
                <TextField v-model="validateForm.password" prop="password" :action-icon="visibility ? ':icon-bukejian2' : ':icon-kejian'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'">
                </TextField>
            </FormItem>
        </Form>
        <Row gutter>
            <Col span="6">
            <Checkbox label="记住用户名" v-model="validateForm.isAgree"></Checkbox>
            </Col>
            <Col span="6">
            <div class="grid-cell-reg" @click="remanberPWD">忘记密码？</div>
            </Col>
        </Row>
            <Button full-width large class="buttom" color="teal" @click="submit">立即登录</Button>
        <Row class="row-reg" gutter>
            <Col span="6">
            <div class="grid-cell" @click="msgCode">短信验证码登录</div>
            </Col>
            <Col span="6">
            <div class="grid-cell-reg" @click="regNewUser">注册新用户</div>
            </Col>
        </Row>
    </Container>
</template>

<script>
import { Button, TextField, Checkbox, Avatar } from "muse-ui";
import { Container, Row, Col } from "muse-ui/lib/Grid";
import { Form, FormItem } from "muse-ui/lib/Form";
import serv from "service";
import tool from "util/tools";

export default {
  data() {
    return {
      usernameRules: [
        { validate: val => !!val, message: "必须填写用户名" },
        { validate: val => val.length == 11, message: "用户名长度为11位手机号码" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 6 && val.length <= 18,
          message: "密码长度大于6小于18"
        }
      ],
      argeeRules: [{ validate: val => !!val, message: "必须同意用户协议" }],
      validateForm: {
        username: "",
        password: "",
        isAgree: true
      },
      visibility: false
    };
  },
  components: {
    Button,
    TextField,
    Checkbox,
    Row,
    Col,
    Avatar,
    Form,
    FormItem,
    Container
  },
  methods: {
    async query() {
      const response = await serv.login({
        userName: this.validateForm.username,
        passWord: this.validateForm.password,
        deviceId: window.api.deviceId
      });
      switch (response.code) {
          case 0:
            tool.setStorage('token', response.result.token);
            tool.setStorage('phone', response.result.userinfo.phone);
            tool.setStorage('userInfo', response.result.userinfo);
            window.api.sendEvent({
                name: 'login'
            });
            window.api.closeWin();
              break;
          default:
            alert("nono");
              break;
      }
    },
    submit() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.query();
        }
      });
    },
    clickLeft() {
      alert("nnnn");
    },
    remanberPWD() {
      alert("sss");
    },
    msgCode(){
        alert("msgcode login");
    },
    regNewUser(){
        window.api.openWin({
            name: 'registered',
            url: './win.html',
            bounces: false,
            pageParam: {
                wtitle : '用户注册',
                fname:'registered_f',
                furl:'./registered.html',
                hasLeft:1,
                hasRight:0,
                }
        });
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.mu-form-item-label {
  font-size: 18px;
}
.formCon {
  .row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .row-reg {
    margin-top: 20px;
  }
  .grid-cell {
    border-radius: 4px;
    height: 36px;
    line-height: 24px;
  }
  .grid-cell-reg {
    border-radius: 4px;
    height: 36px;
    line-height: 24px;
    text-align: right;
  }
}
</style>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.formCon {
  padding: 20px;
}

.hpic {
  padding: 30px 0;
}
.buttom {
  color: @white;
  font-size: 18px;
}
</style>
