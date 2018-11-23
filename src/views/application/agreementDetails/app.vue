<template>
  <div class="content">
    <div class="delivery" @click="companyDetail(id)">
      <div class="delivery-head">
        江苏大灰熊科技有限公司
        <!-- <span class="delivery-date">{{delivery.deliveryDateText}}投递</span> -->
      </div>
      <div class="delivery-salary-range">技术部 <span class="delivery-job-area">程序组</span><span class="delivery-link">查看公司信息</span></div>
      <!-- <div class="delivery-foot"></div> -->
    </div>
    <div class="picList">
      <div class="picCon" v-for="(file,index) in picList" :key="file.url">
        <div class="con" @click="imagesPopupOpen(picList,index,'')" :style="{backgroundImage:'url('+file.coverUrl+')'}" />
        <Icon class="close" :size="18" value=":el-icon-error" color="#000" @click="remove(file,index)"/>
      </div>
      <div class="infoNotice" v-if="picList.length===0">
        暂无协议上传
      </div>
    </div>
    <Upload class="footer" ref="uploader" accept="image/*" name="file" :show-file-list="false" :with-credentials="true" :multiple="false" :data="{type:2}" :headers="headers" :action="actionUrl" :file-list="uploaderLiist" :on-change="change" :on-progress="progress" :on-success="success" :before-upload="beforeUpload" :on-error="error">
      <Button color="#009688" textColor="#ffffff" :full-width="true" :style="{boxShadow: '0 0 0'}" large>立即上传</Button>
    </Upload>
    <ImagesPopup ref="imagesPopup" :urlList="urlList" :index="urlListIndex" :description="description"></ImagesPopup>
  </div>
</template>

<script>
import { Button, Icon } from 'muse-ui';
import ImagesPopup from 'components/ImagesPopup';
import Upload from 'element-ui/lib/upload';
// import Progress from 'element-ui/lib/progress';
import tools from 'util/tools';
import { hostList } from 'service/mock';

export default {
  data () {
    return {
      description: {},
      urlList: [],
      urlListIndex: 0,
      picList: [
        {
          url:
            'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=1225949027,2182553787&fm=85&s=86AC65A275E484AEF015A8A40300A0D1',
          coverUrl:
            'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=1225949027,2182553787&fm=85&s=86AC65A275E484AEF015A8A40300A0D1'
        },
        {
          url:
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=12360805,2887716012&fm=26&gp=0.jpg',
          coverUrl:
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=12360805,2887716012&fm=26&gp=0.jpg'
        },
        {
          url:
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1634998881,2572259975&fm=26&gp=0.jpg',
          coverUrl:
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1634998881,2572259975&fm=26&gp=0.jpg'
        }
      ],

      uploaderHide: false,
      uploaderLiist: [],
      actionUrl:
        'http://' +
        (process.env === 'production' ? hostList.pro : hostList.test) +
        '/api/Userresources/create',
      // actionUrl: 'https://jsonplaceholder.typicode.com/posts/',
      headers: {
        MG_code:
          '5uwPulFblsIANI7BIP#a%bBo582#wOud3v%f0c1JgJRskqUTN7y4&TPUTgjkmhOjZI#oVc4Ph4Ar^ApQFy$ZlGl3T9MaIskgGWTVjqHxsP^8S^%gY#nAj9X4DV9x&b7O',
        MG_key: '5b10fed636fcf',
        MG_token:
          process.env === 'development'
            ? '6f8bade35ef87e5a6aa623519ef973582dc25205'
            : tools.getStorage('token') || ''
      },
      maxSize: 10
    };
  },
  components: {
    Button,
    Upload,
    ImagesPopup,
    Icon
  },
  methods: {
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
    beforeUpload (file) {
      if (file.size > this.maxSize * 1024 * 1024) {
        tools.toast({
          position: 'top',
          message: '图片最大' + this.maxSize + 'M'
        });
        return false;
      }
    },
    progress (file) {
      tools.showProgress();
    },
    error (e, file, fileList) {
      tools.hideProgress();
      tools.toast({
        position: 'top',
        message: '协议上传出错，请稍后重试'
      });
    },
    success (response, file, fileList) {
      tools.hideProgress();
      switch (response.code) {
        case 0:
          const urlAry = response.result.file.url.split('/');
          urlAry[urlAry.length - 1] = '450_' + urlAry[urlAry.length - 1];
          this.picList.push({
            url: response.result.file.url,
            coverUrl: urlAry.join('/')
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
    remove (file, index) {
      this.picList.splice(index, 1);
    },
    submit () {
      this.$refs.form.validate().then(result => {
        // console.log(result);
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
  font-size: 0;
  margin: -5px -5px 15px;
  .picCon {
    width: 50%;
    padding-top: 50%;
    display: inline-block;
    position: relative;
    .close{
      position: absolute;
      right: 10px;
      top: 10px;
      background-color: #fff;
      border-radius: 9px;
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
</style>
