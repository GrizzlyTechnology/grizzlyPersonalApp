<template>
    <Row>
        <Col span="3" offset="3">
        <Icon size="35" value=":icon-weixin" @click="wxlogin" />
        </col>
        <Col span="3">
        <Icon size="35" value=":icon-qq" @click="qqlogin" />
        </col>
    </Row>
</template>

<script>
import { Row, Col } from "muse-ui/lib/Grid";
import { Icon } from "muse-ui";
import tools from "util/tools";
export default {
  props: {},
  data() {
    return {
      qq: window.api.require("QQPlus"),
      wx: window.api.require('wx'),
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
      const isin = await this.qqInstall();
      if (!isin) {
        alert("未安装QQ");
        return;
      }
      const openId = await this.qqGoto();
      if(!openId){
          alert("QQ登录失败");
          return;
      }
      alert(openId);
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
    qqInstall() {
      var obj = this;
      return new Promise((resolve) => {
        obj.qq.installed(function(ret, err) {
          resolve(ret.status);
        });
      });
    },

    //========微信登录=======
    wxlogin() {
      this.wxQuery();
    },
    async wxQuery(){
        const isin=await this.wxInstall();
        if(!isin){
            alert('未安装微信应用');
            return;
        }
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
        const uinfo=await this.wxInfo(token.accessToken,token.openId);
        if(!uinfo){
            alert('获取用户信息失败');
            return;
        }
        alert(JSON.stringify(uinfo));
    },
    wxInstall(){
        var obj=this;
        return new Promise((resolve)=>{
            obj.wx.isInstalled(function(ret, err) {
                resolve(ret.installed);
            });
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
    }
  },
  mounted() {}
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
