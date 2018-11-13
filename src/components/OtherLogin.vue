<template>
    <Row>
        <Col span="3" offset="3" v-if="wxhas">
        <Icon size="35" value=":icon-weixin" @click="wxlogin" />
        </col>
        <Col span="3" v-if="qqhas">
        <Icon size="35" value=":icon-qq" @click="qqlogin" />
        </col>
    </Row>
</template>

<script>
import { Row, Col } from "muse-ui/lib/Grid";
import { Icon } from "muse-ui";
import tools from "util/tools";
import service from 'service';
export default {
  props: {},
  data() {
    return {
      qq: window.api.require("QQPlus"),
      wx: window.api.require('wx'),
      qqhas:false,
      wxhas:false
    };
  },
  components: {
    Row,
    Col,
    Icon
  },
  computed: {},
  methods: {
    qqlogin() {
      this.qqQuery();
    },
    async qqQuery() {
      const openId = await this.qqGoto();
      if(!openId){
          alert("QQ登录失败");
          return;
      }
        this.ologin({
            openid:openId,
            type:'qq'
        });
    },
    qqGoto() {
      var obj = this;
      return new Promise((resolve) => {
        obj.qq.login(function(ret, err) {
          if (ret.status && ret.openId) {
            resolve(ret.openId);
          } else {
            resolve(false);
          }
        });
      });
    },
    qqInfo(){
        var obj = this;
        return new Promise((resolve) => {
            obj.qq.getUserInfo(function(ret, err) {
                if (ret.status) {
                    //api.alert({ msg: JSON.stringify(ret) });
                    resolve(eval('(' + ret.info + ')'));
                } else {
                    resolve(false);
                }
            });
        });
    },
    qqInstall() {
      var obj = this;
      obj.qq.installed(function(ret, err) {
          obj.qqhas=ret.status;
        });
    },

    //========微信登录=======
    wxlogin() {
      this.wxQuery();
    },
    async wxQuery(){
        const code=await this.wxGoto();
        if(!code){
            alert('微信登录失败');
            return;
        }
        const token=await this.wxToken(code);
        if(!token){
            alert('微信登录失败');
            return;
        }
        this.ologin({
            openid:token.openId,
            type:'wx'
        });
    },
    wxInstall(){
        var obj=this;
        obj.wx.isInstalled(function(ret, err) {
                obj.wxhas=ret.installed;
            });
    },
    wxGoto(){
        var obj=this;
        return new Promise((resolve)=>{
            obj.wx.auth(function(ret, err) {
                if (ret.status) {
                    resolve(ret.code);
                }else{
                    resolve(false);
                }
            });
        });
    },
    wxToken(code){
        var obj=this;
        return new Promise((resolve)=>{
           obj.wx.getToken({
                code:code
            }, function(ret, err) {
                if (ret.status) {
                    resolve({
                        accessToken:ret.accessToken,
                        openId:ret.openId
                    });
                }else{
                    resolve(false);
                }
            });
        });
    },
    wxInfo(accesstoken,openid){
        var obj=this;
        return new Promise((resolve)=>{
           obj.wx.getUserInfo({
                accessToken: accesstoken,
                openId: openid
            }, function(ret, err) {
                if (ret.status) {
                    resolve({
                        nickname:ret.nickname,
                        sex:ret.sex,
                        headphoto:ret.headimgurl,
                    });
                }else{
                    resolve(false);
                }
            });
        });
    },
    async ologin(parm){
      const response=await service.otherlogin({
          openId:parm.openid,
          type:parm.type,
          deviceId:window.api.deviceId
      });
      switch(response.code){
          case 0:
            tools.setStorage('token', response.result.token);
            tools.setStorage('phone', response.result.userinfo.phone);
            tools.setStorage('userInfo', response.result.userinfo);
            //绑定极光推送的别名为id
            let ajpush = window.api.require('ajpush');
            let param = {alias:response.result.userinfo.id};
            ajpush.bindAliasAndTags(param,function(ret) {
                    let statusCode = ret.statusCode;
            });
            //登录完跳转
            window.api.openWin({
                name: 'main',
                url: './main.html',
                slidBackEnabled:false,
                pageParam: {
                    comefrom:'login',
                    }
            });
          break;
          case 1:
            alert(JSON.stringify(parm));
          break;
          default:
            tools.toast({
                position: 'top',
                message: response.message,
            });
          break;
      }
    }
  },
  mounted() {
      this.qqInstall();
      this.wxInstall();
  }
};
</script>
<style lang="less" scoped>
.row {
  padding: 20px 0;
  .col {
    text-align: center;
    .icon-weixin,
    .icon-qq {
      color: #999;
    }
  }
}
</style>
