<template>
  <div>
    <div class="avatarCell">
      <Progress
        :class="{avatarProgress:true,hide:!uploaderHide}"
        type="circle"
        :percentage="progressPercent"
        :width="80"
      />
      <div
        class="ucAvatar"
        :style="{backgroundImage:'url(' + headphoto + ')'}"
      >
      </div>
      <Upload
        ref="uploader"
        accept="image/*"
        name="file"
        :show-file-list="false"
        :with-credentials="true"
        :multiple="false"
        :data="{type:1}"
        :headers="headers"
        :action="actionUrl"
        :limit="max"
        :file-list="fileList"
        :on-change="change"
        :on-progress="progress"
        :on-success="success"
        :before-upload="beforeUpload"
        :on-error="error"
      >
        <Button :disabled="uploaderHide" color="#009688" textColor="#ffffff" :style="{marginTop:'10px',boxShadow: '0 0 0'}">上传头像</Button>
      </Upload>
    </div>
    <Cell class="ucCell link">
      <div class="ucCellCon" @click="nicknameSetting">
        <span class="ucCellTitle">昵称</span>
        <span class="ucCellLabel">{{nickname}}</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">性别</span>
        <span class="ucCellLabel">{{sex}}</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">真实姓名</span>
        <span class="ucCellLabel">{{name}}</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">户籍地址</span>
        <span class="ucCellLabel">江苏 镇江</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell link">
      <div class="ucCellCon" @click="emailSetting">
        <span class="ucCellTitle">邮箱</span>
        <span class="ucCellLabel">{{email}}</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell link">
      <div class="ucCellCon" @click="phoneSetting">
        <span class="ucCellTitle">手机</span>
        <span class="ucCellLabel">{{phone}}</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
    <Cell class="ucCell link">
      <div class="ucCellCon" @click="passwordSetting">
        <span class="ucCellTitle">密码</span>
        <span class="ucCellLabel">******</span>
      </div>
      <i class="mu-icon icon-right isLink" />
    </Cell>
  </div>
</template>

<script>
import { Button, Icon } from 'muse-ui';
import { Cell } from 'mint-ui';
import Progress from 'element-ui/lib/progress';
import Upload from 'element-ui/lib/upload';
import tools from 'util/tools';
import dictMap from 'util/dictMap';
import service from 'service';
import { hostList } from 'service/mock';

export default {
  data () {
    return {
      uploaderHide: false,
      progressPercent: 0,
      actionUrl: 'http://' + (process.env === 'production' ? hostList.pro : hostList.test) + '/api/Userresources/create',
      headers: {
        MG_code:
          '5uwPulFblsIANI7BIP#a%bBo582#wOud3v%f0c1JgJRskqUTN7y4&TPUTgjkmhOjZI#oVc4Ph4Ar^ApQFy$ZlGl3T9MaIskgGWTVjqHxsP^8S^%gY#nAj9X4DV9x&b7O',
        MG_key: '5b10fed636fcf',
        MG_token:
          process.env !== 'production'? tools.getStorage('token'): tools.getStorage('token') || ''
      },
      maxSize: 10,
      max: 1,
      fileList: [],

      phone: '暂无',
      email: '暂无',
      nickname: '暂无',
      name: '暂无',
      identity: '暂无',
      sex: dictMap.sex[dictMap.male],
      registertime: '暂无',
      headphoto: '../assets/img/headpic.png',
      userInfo: {}
    };
  },
  components: {
    Icon,
    Cell,
    Button,
    Upload,
    Progress
  },
  methods: {
    async getUserinfo () {
      tools.showProgress();
      const response = await service.getUserInfo();
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.userInfo = response.result.userInfo;
          const phone = response.result.userInfo.phone;
          const emailArray = response.result.userInfo.email !== null ? response.result.userInfo.email.split('@') : [];
          this.phone = phone !== null ? phone[0] + phone[1] + phone[2] + phone[3] + '****' + phone[8] + phone[9] + phone[10] : '暂无';
          this.email = emailArray.length > 0 ? emailArray[0][0] + '****' + emailArray[0][emailArray[0].length - 1] + '@' + '****.' + emailArray[1].split('.')[1] : '暂无';
          this.nickname = response.result.userInfo.nickname !== null ? response.result.userInfo.nickname : '暂无';
          this.name = response.result.userInfo.name !== null ? response.result.userInfo.name : '暂无';
          this.identity = response.result.userInfo.identity !== null ? response.result.userInfo.identity : '暂无';
          this.sex = dictMap.sex[response.result.userInfo.sex];
          this.headphoto = response.result.userInfo.headphoto === null ? this.headphoto : tools.getPicUrl(response.result.userInfo.headphoto, 450);
          break;
        default:
          tools.toast({
            position: 'top',
            message: '用户信息获取失败'
          });
          break;
      }
    },
    change (file) {
      // console.log('change: ' + JSON.stringify(file));
      switch (file.status) {
        case 'ready':
          this.progressPercent = 0;
          this.uploaderHide = true;
          break;
        default:
          break;
      }
      // this.uploaderClass = 'uploader hideUploader';
    },
    progress (file) {
      this.progressPercent = parseInt(file.percent);
      // this.uploaderClass = 'uploader hideUploader';
    },
    beforeUpload (file) {
      if (file.size > this.maxSize * 1024 * 1024) {
        tools.toast({
          position: 'top',
          message: '图片最大' + this.maxSize + 'M'
        });
        this.uploaderHide = false;
        return false;
      }
    },
    error (e, file, fileList) {
      // console.log(JSON.stringify(e));
      this.uploaderHide = false;
    },
    success (response, file, fileList) {
      this.uploaderHide = false;
      switch (response.code) {
        case 0:
          this.headphoto = tools.getPicUrl(response.result.file.url, 450);
          this.fileList = [];
          break;
        default:
          tools.toast({
            position: 'top',
            message: response.message
          });
          break;
      }
    },
    nicknameSetting () {
      tools.openWin({
        name: 'nicknameSetting',
        url: '../win.html',
        title: '昵称设置',
        fname: 'nicknameSetting_f',
        furl: './userCenter/nicknameSetting.html',
        hasLeft: 1,
        data: {
          nameSpace: 'nicknameSetting',
          nickname: this.userInfo.nickname,
          callback: (ret, err) => {
            this.getUserinfo();
          }
        }
      });
    },
    emailSetting () {
      tools.openWin({
        name: 'emailSetting',
        url: '../win.html',
        title: '邮箱设置',
        fname: 'emailSetting_f',
        furl: './userCenter/emailSetting.html',
        hasLeft: 1,
        data: {
          nameSpace: 'emailSetting',
          haveEmail: !!this.userInfo.email,
          callback: (ret, err) => {
            this.getUserinfo();
          }
        }
      });
    },
    passwordSetting () {
      tools.openWin({
        name: 'passwordSetting',
        url: '../win.html',
        title: '修改密码',
        fname: 'passwordSetting_f',
        furl: './userCenter/passwordSetting.html',
        hasLeft: 1,
        data: {
          nameSpace: 'passwordSetting',
          callback: (ret, err) => {
            this.getUserinfo();
          }
        }
      });
    },
    phoneSetting () {
      tools.openWin({
        name: 'phoneSetting',
        url: '../win.html',
        title: '修改手机号码',
        fname: 'phoneSetting_f',
        furl: './userCenter/phoneSetting.html',
        hasLeft: 1,
        data: {
          nameSpace: 'phoneSetting',
          callback: (ret, err) => {
            this.getUserinfo();
          }
        }
      });
    }
  },
  mounted () {
    this.getUserinfo();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.hide {
  display: none;
}
.ucAvatar {
  display: inline-block;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: #fff;
  // background-image: url("../../../assets/img/headpic.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.avatarCell{
  font-size: 0;
  padding: 20px;
  text-align: center;
  position: relative;
  .avatarProgress{
    background-color: rgba(0,0,0,0.25);
    border-radius: 40px;
    position: absolute;
    left: 50%;
    margin-left: -40px;
    .el-progress__text{
      color: #fff;
    }
  }
}
.ucCell {
  &.link{
    .isLink{
      display: block;
    }
    .ucCellCon:active {
      background-color: #eee;
    }
  }
  position: relative;
  .ucCellCon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    .ucCellTitle {
      line-height: 56px;
      color: #666;
      margin-left: 15px;
    }
    .ucCellLabel{
      float: right;
      line-height: 56px;
      color: #000;
      margin-right: 45px;
    }
  }
  .mu-icon {
    z-index: 1;
    position: relative;
  }
  .mint-cell-wrapper {
    background-image: none;
    border-bottom: 1px solid #eee;
    height: 56px;
  }
  .isLink {
    position: absolute;
    top: 19px;
    font-size: 16px;
    right: 15px;
    display: none;
  }
}
</style>
