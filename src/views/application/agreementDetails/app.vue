<template>
  <div class="content">
    <div class="delivery" @click="companyDetail(companyInfo.companyId)">
      <div class="delivery-head">
        {{companyInfo.companyName}}
        <!-- <span class="delivery-date">{{delivery.deliveryDateText}}投递</span> -->
      </div>
      <div class="delivery-salary-range">{{companyInfo.department}} <span class="delivery-job-area">{{companyInfo.group}}</span><span class="delivery-link">查看公司信息</span></div>
      <!-- <div class="delivery-foot"></div> -->
    </div>
    <div class="picList">
      <div class="picCon" v-for="(file,index) in picList" :key="file.url">
        <div class="con" @click="imagesPopupOpen(picList,index,'')" :style="{backgroundImage:'url('+file.coverUrl+')'}" />
        <Icon class="close" :size="18" value=":el-icon-error" color="#000" @click="remove(file,index)" />
      </div>
      <div :class="{picCon:true,uploader:true,hide:picList.length>=max}">
        <Upload class="con" ref="uploader" accept="image/*" list-type="picture-card" name="file" :class="{hide:uploaderHide}" :show-file-list="false" :with-credentials="true" :multiple="false" :data="{type:2}" :headers="headers" :action="actionUrl" :limit="max" :file-list="uploaderList" :on-change="change" :on-progress="progress" :on-success="success" :before-upload="beforeUpload" :on-error="error">
          <i class="el-icon-plus"></i>
        </Upload>
        <div :class="{hide:!uploaderHide,con:true,progressPercent:true}">
          <Progress type="circle" :percentage="progressPercent" />
        </div>
      </div>
    </div>

    <Button large color="#009688" textColor="#ffffff" :full-width="true" :style="{boxShadow: '0 0 0'}" @click="update()">提交协议</Button>
    <ImagesPopup ref="imagesPopup" :urlList="urlList" :index="urlListIndex" :description="description"></ImagesPopup>
  </div>
</template>

<script>
import tools from 'util/tools';
import service from 'service';
import { hostList } from 'service/mock';

import { Button, Icon } from 'muse-ui';
import Upload from 'element-ui/lib/upload';
import Progress from 'element-ui/lib/progress';

import ImagesPopup from 'components/ImagesPopup';

export default {
  data () {
    return {
      companyInfo: {
        companyId: window.api ? window.api.pageParam.companyId : '-',
        companyName: window.api ? window.api.pageParam.companyName : '-',
        department: window.api ? window.api.pageParam.department : '-',
        group: window.api ? window.api.pageParam.group : ''
      },
      description: {},
      urlList: [],
      urlListIndex: 0,
      picList: [],

      uploaderHide: false,
      progressPercent: 0,
      uploaderList: [],
      actionUrl:
        'http://' +
        (process.env === 'production' ? hostList.pro : hostList.test) +
        '/api/Userresources/create',
      headers: {
        MG_code:
          '5uwPulFblsIANI7BIP#a%bBo582#wOud3v%f0c1JgJRskqUTN7y4&TPUTgjkmhOjZI#oVc4Ph4Ar^ApQFy$ZlGl3T9MaIskgGWTVjqHxsP^8S^%gY#nAj9X4DV9x&b7O',
        MG_key: '5b10fed636fcf',
        MG_token:
          process.env === 'development'
            ? '6f8bade35ef87e5a6aa623519ef973582dc25205'
            : tools.getStorage('token') || ''
      },
      maxSize: 10,
      max: 6
    };
  },
  components: {
    Button,
    Upload,
    ImagesPopup,
    Icon,
    Progress
  },
  methods: {
    async getAgreementPic () {
      tools.showProgress();
      const response = await service.getAgreementPic({
        companyId: this.companyInfo.companyId
      });
      tools.hideProgress();
      // console.log(JSON.stringify(response));
      switch (response.code) {
        case 0:
          this.picList = response.result.picList.map(row => {
            const urlAry = row.url.split('/');
            urlAry[urlAry.length - 1] = '450_' + urlAry[urlAry.length - 1];
            return ({
              url: row.url,
              coverUrl: urlAry.join('/'),
              id: row.id
            });
          });
          break;
        default:
          tools.toast({
            position: 'top',
            message: response.message
          });
          break;
      }
    },
    async update () {
      tools.showProgress();
      // console.log(JSON.stringify({
      //   companyId: this.companyInfo.companyId,
      //   picList: this.picList.map(row => row.id)
      // }));
      const response = await service.updateAgreementPic({
        companyId: this.companyInfo.companyId,
        picList: this.picList.map(row => row.id)
      });
      tools.hideProgress();
      // console.log(JSON.stringify(response));

      switch (response.code) {
        case 0:
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: response.message
          });
          break;
      }
    },
    companyDetail (id) {
      tools.openWin({
        name: 'companyInfo_' + id,
        url: '../win.html',
        title: '企业介绍',
        fname: 'companyInfo_f_' + id,
        furl: './hr/companyInfo.html',
        hasLeft: 1,
        hasRight: 0,
        data: {
          enterpriseId: id
        }
      });
    },
    imagesPopupOpen (list, index, description) {
      this.urlList = list.map((r, i) => {
        this.description[i] = description.replace(/\n|\r\n/g, '<br/>');
        return r.url;
      });
      this.urlListIndex = index;
      this.$refs.imagesPopup.open();
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
      this.uploaderHide = false;
      tools.toast({
        position: 'top',
        message: '协议上传出错，请稍后重试'
      });
    },
    success (response, file, fileList) {
      this.uploaderHide = false;
      switch (response.code) {
        case 0:
          const urlAry = response.result.file.url.split('/');
          urlAry[urlAry.length - 1] = '450_' + urlAry[urlAry.length - 1];
          this.picList.push({
            url: response.result.file.url,
            coverUrl: urlAry.join('/'),
            id: response.result.file.id
          });
          if (this.picList.length >= this.max) {
            this.uploaderHide = true;
          }
          break;
        default:
          tools.toast({
            position: 'top',
            message: response.message
          });
          break;
      }
    },
    remove (file, index) {
      this.picList.splice(index, 1);
    }
  },
  mounted () {
    this.getAgreementPic();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  & > *:last-child {
    margin-bottom: 0;
  }
}

.delivery {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  &:active {
    background-color: #f0f0f0;
  }
  .delivery-head {
    margin-bottom: 10px;
    color: #000;
    font-size: 16px;
    .ell();
    .delivery-date {
      font-size: 12px;
      color: #999;
    }
  }
  .delivery-job-area {
    font-size: 14px;
    color: #009688;
  }
  .delivery-salary-range {
    color: #666;
    font-size: 14px;
    // margin-bottom: 10px;
    line-height: 16px;
  }
  // .delivery-foot {
  //   color: #999;
  //   font-size: 12px;
  //   line-height: 16px;
  // }
  // .delivery-status {
  //   font-size: 14px;
  //   color: #666;
  //   float: right;
  // }
  .delivery-link {
    float: right;
    color: @primary;
    font-size: 12px;
  }
}
.picList {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  font-size: 0;
  margin: -5px -5px 15px;
  .picCon {
    width: 50%;
    padding-top: 50%;
    display: inline-block;
    position: relative;
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      background-color: #fff;
      border-radius: 50%;
      border: 1px #fff solid;
    }
    .con {
      position: absolute;
      left: 5px;
      top: 5px;
      bottom: 5px;
      right: 5px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #eee;
    }
    .picTitle {
      position: absolute;
      z-index: 1;
      color: #fff;
      bottom: 5px;
      left: 5px;
      right: 5px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
      padding-left: 5px;
      line-height: 30px;
    }
  }
  .uploader {
    .el-upload--picture-card {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
    .el-icon-plus {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 36px;
      font-weight: bold;
      margin-top: -21px;
      margin-left: -18px;
    }
    .el-progress {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -63px;
      margin-left: -63px;
    }
  }
}
.infoNotice {
  border-radius: 5px;
  border: 1px #a2d4f7 dashed;
  overflow: hidden;
  margin: 0 15px 15px;
  background-color: #e4f2fb;
  padding: 20px 15px;
  text-align: center;
  color: #a2d4f7;
}
.footer {
  .el-upload {
    width: 100%;
  }
}
.hide {
  display: none;
}
</style>
