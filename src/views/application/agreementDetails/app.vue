<template>
  <div>
    <List class='whiteBg'>
      <ListItem>
        <ListItemContent>
          <ListItemTitle>
            {{companyName}}
          </ListItemTitle>
          <ListItemSubTitle>
            <span>{{department}}</span>
            <span>{{group}}</span>
            <span class='companyInfo' @click="companyInfo(enterpriseId)">查看详情></span>
          </ListItemSubTitle>
        </ListItemContent>
      </ListItem>
    </List>
    <ImagesPopup ref="imagesPopup" :urlList="this.agreementImgs.imgUrl" :index="urlListIndex"></ImagesPopup>
    <Row class='whiteBg space15' gutter :rules="fileListRules">
         <div class="picList">
          <div class="picCon" v-for="(agreementImg,index) in agreementImgs"  :key='agreementImg.id'>
            <div class="con" :style="{backgroundImage:'url('+agreementImg.imgUrl+')'}" @click='imagesPopupOpen(agreementImgs,index)' />
            <i class="el-icon-delete" @click="remove(agreementImg,index)"></i>
          </div>
          <div :class="{uploader:true,hide:agreementImgs.length>=6}">
            <Upload ref="uploader" accept="image/*" list-type="picture-card" name="file" :class="{hide:uploaderHide}" :show-file-list="false" :with-credentials="true" :multiple="false" :data="{type:2}" :headers="headers" :action="actionUrl" :limit="max" :file-list="agreementImgs" :on-change="change" :on-progress="progress" :on-success="success" :before-upload="beforeUpload" :on-error="error">
              <i class="el-icon-plus"></i>
            </Upload>
            <div :class="{hide:!uploaderHide,progressPercent:true}">
              <Progress type="circle" :percentage="progressPercent" />
            </div>
          </div>
        </div>
    </Row>
    <div class='p16 fixBox whiteBg'>
          <Button color="#009688" textColor="#ffffff" class='mt25' :full-width="true" :style="{boxShadow: '0 0 0'}" large @click='submit'>保存</Button>
        </div>
      </div>
</template>

<script>
import { Dialog, Button } from 'muse-ui';
import { Row, Col } from 'muse-ui/lib/Grid';
import Upload from 'element-ui/lib/upload';
import Progress from 'element-ui/lib/progress';
import {
  List,
  ListItem,
  ListAction,
  ListItemSubTitle,
  ListItemContent,
  ListItemTitle,
  ListItemAfterText
} from 'muse-ui/lib/List';
import ImagesPopup from 'components/ImagesPopup';
import tool from 'util/tools';
export default {
  data () {
    return {
      companyName: '大灰熊科技有限公司',
      department: '技术部',
      group: '前端组',
      agreementImgs: [
        {
          id: 1,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg'
        },
        {
          id: 2,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg'
        },
        {
          id: 3,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg'
        }
      ],
      urlListIndex: 0,
      uploaderHide: false,
      progressPercent: 0,
      // actionUrl: 'http://' + (process.env === 'development' ? hostList.test : hostList.test) + '/api/Userresources/create',
      actionUrl: 'https://jsonplaceholder.typicode.com/posts/',
      headers: {
        MG_code:
          '5uwPulFblsIANI7BIP#a%bBo582#wOud3v%f0c1JgJRskqUTN7y4&TPUTgjkmhOjZI#oVc4Ph4Ar^ApQFy$ZlGl3T9MaIskgGWTVjqHxsP^8S^%gY#nAj9X4DV9x&b7O',
        MG_key: '5b10fed636fcf',
        MG_token:
          process.env !== 'production'
            ? '6f8bade35ef87e5a6aa623519ef973582dc25205'
            : tool.getStorage('token') || ''
      },
      maxSize: 10,
      max: 6,
      fileListRules: [
        {
          validate: val => {
            return this.agreementImgs.length > 0;
          },
          message: '必须上传协议图片'
        }
      ]
    };
  },
  components: {
    List,
    ListItem,
    ListAction,
    ListItemSubTitle,
    ListItemContent,
    ListItemTitle,
    ListItemAfterText,
    Row,
    Col,
    Dialog,
    Button,
    ImagesPopup,
    Upload,
    Progress
  },
  methods: {
    imagesPopupOpen (list, index) {
      // this.agreementImgs = list.map((r, i) => {
      //   return r.url;
      // });
      this.urlListIndex = index;
      this.$refs.imagesPopup.open();
    },
    companyInfo (enterpriseId) {
      tool.openWin({
        name: 'companyInfo',
        url: '../win.html',
        title: '企业介绍',
        fname: 'companyInfo_f',
        furl: './hr/companyInfo.html',
        hasLeft: 1,
        hasRight: 1,
        data: {
          enterpriseId: enterpriseId
        }
      });
    },
    change (file) {
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
        tool.toast({
          position: 'top',
          message: '图片最大' + this.maxSize + 'M'
        });
        this.uploaderHide = false;
        return false;
      }
    },
    error (e, file, agreementImgs) {
      // console.log(JSON.stringify(e));
      this.uploaderHide = false;
    },
    success (response, file, agreementImgs) {
      this.uploaderHide = false;
      // console.log(JSON.stringify(agreementImgs));
      switch (response.code) {
        case 0:
          const urlAry = response.result.file.url.split('/');
          urlAry[urlAry.length - 1] = '450_' + urlAry[urlAry.length - 1];
          this.agreementImgs.push({
            id: response.result.file.id,
            url: response.result.file.url,
            coverUrl: urlAry.join('/')
          });
          if (this.agreementImgs.length >= this.max) {
            this.uploaderHide = true;
          }
          break;

        default:
          tool.toast({
            position: 'top',
            message: response.message
          });
          break;
      }

      // console.log(response, agreementImgs);
    },
    remove (file, index) {
      this.agreementImgs.splice(index, 1);
      if (this.agreementImgs.length < this.max) {
        this.uploaderHide = false;
      }
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
.uploader {
  width: 50%;
  padding-top: 50%;
  position: relative;
  display: inline-block;
  .progressPercent {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    box-sizing: border-box;
    position: relative;
    .el-progress--circle {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -75px 0 0 -75px;
      width: 150px !important;
      height: 150px !important;
    }
    .el-progress-circle {
      width: 150px !important;
      height: 150px !important;
    }
  }
  .progressPercent,
  .el-upload--picture-card {
    position: absolute;
    left: 5px;
    top: 5px;
    bottom: 5px;
    right: 5px;
    width: auto;
    height: auto;
    border-radius: 0;
  }
  .el-icon-plus {
    font-size: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
  }
}
.hideUploader {
  .el-upload {
    display: none;
  }
}
</style>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.whiteBg {
  background: #fff;
}

.p16 {
  padding-left: 16px;
  padding-right: 16px;
}

.fixBox {
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
}

.mu-item-sub-title {
  margin-top: 5px;
}

.mu-item-sub-title span {
  margin-right: 15px;
}

.companyInfo {
  color: #009688;
}
.space15 {
  padding: 15px;
  margin: 15px 0;
}

.pDialog .mu-dialog-body img {
  width: 100%;
}

.hide {
  display: none;
}

.picList {
  font-size: 0;
  margin: -5px;
  width: 100%;
}
.picCon {
  width: 50%;
  padding-top: 50%;
  display: inline-block;
  position: relative;
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

  .el-icon-delete{
      color:#009688;
      font-size:22px;
      position: absolute;
      right: 0%;
      top:15px;
      margin: -15px 0 0 -15px;
    }
}
</style>
