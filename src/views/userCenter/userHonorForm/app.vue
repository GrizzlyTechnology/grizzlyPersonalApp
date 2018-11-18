<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="荣誉名称" prop="title" :rules="titleRules">
            <TextField v-model="form.title"></TextField>
          </FormItem>
          <FormItem label="颁发时间" prop="honorDate">
            <DateInput :value="honorDateText" :max-date="new Date()" @change="changeHonorDate" format="YYYY年MM月DD日" no-display view-type="list" container="bottomSheet"></DateInput>
          </FormItem>
          <FormItem label="荣誉描述" prop="desc">
            <TextField v-model="form.desc"  multi-line
              :max-length="100"
              :rows="5"
              :rows-max="5"></TextField>
          </FormItem>
          <FormItem label="荣誉图片" prop="fileList" :rules="fileListRules">
            <div class="picList">
              <div class="picCon" v-for="(file,index) in fileList" :key="file.id">
                <div class="con" :style="{backgroundImage:'url('+file.coverUrl+')'}" />
                <div class="con del">
                  <i class="el-icon-delete" @click="remove(file,index)"></i>
                </div>
              </div>
              <div :class="{uploader:true,hide:fileList.length>=max}">
                <Upload ref="uploader" accept="image/*" list-type="picture-card" name="file" :class="{hide:uploaderHide}" :show-file-list="false" :with-credentials="true" :multiple="false" :data="{type:2}" :headers="headers" :action="actionUrl" :limit="max" :file-list="uploaderLiist" :on-change="change" :on-progress="progress" :on-success="success" :before-upload="beforeUpload" :on-error="error">
                  <i class="el-icon-plus"></i>
                </Upload>
                <div :class="{hide:!uploaderHide,progressPercent:true}">
                  <Progress type="circle" :percentage="progressPercent" />
                </div>
              </div>
            </div>
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
import { Button, TextField, DateInput } from 'muse-ui';
import Upload from 'element-ui/lib/upload';
import Progress from 'element-ui/lib/progress';
import { Form, FormItem } from 'muse-ui/lib/Form';
// import regexps from 'util/regexps';
import tools from 'util/tools';
import { hostList } from 'service/mock';

// import dictMap from 'util/dictMap';
// import dictMap from 'util/dictMap';
export default {
  data () {
    return {
      uploaderHide: false,
      progressPercent: 0,
      actionUrl: 'http://' + (process.env === 'production' ? hostList.pro : hostList.test) + '/api/Userresources/create',
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
      maxSize: 10,
      max: 6,
      uploaderLiist: [],
      fileList:
        window.api && window.api.pageParam.honor
          ? window.api.pageParam.honor.reslist
          : [],
      id: window.api ? window.api.pageParam.id : null,
      form: {
        title:
          window.api && window.api.pageParam.honor
            ? window.api.pageParam.honor.title
            : '',
        honorDate:
          window.api && window.api.pageParam.honor
            ? window.api.pageParam.honor.honorDate
            : Date.now(),
        desc: window.api && window.api.pageParam.honor
          ? window.api.pageParam.honor.desc
          : ''
      },
      titleRules: [{ validate: val => !!val, message: '必须填写作品名称' }],
      fileListRules: [
        {
          validate: val => {
            return this.fileList.length > 0;
          },
          message: '必须上传荣誉图片'
        }
      ]
    };
  },
  computed: {
    honorDateText () {
      return new Date(this.form.honorDate);
    }
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField,
    Upload,
    DateInput,
    Progress
  },
  methods: {
    async create () {
      tools.showProgress();
      const response = await service.createUserHonor({
        ...this.form,
        resids: this.fileList.map(r => r.id).join(','),
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
            message: '荣誉展示创建失败，请稍后重试！！'
          });
          break;
      }
    },
    async edit () {
      tools.showProgress();
      const response = await service.updateUserHonor({
        ...this.form,
        resids: this.fileList.map(r => r.id).join(','),
        honorId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '荣誉展示编辑失败，请稍后重试！！'
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
      // console.log(JSON.stringify(fileList));
      switch (response.code) {
        case 0:
          const urlAry = response.result.file.url.split('/');
          urlAry[urlAry.length - 1] = '450_' + urlAry[urlAry.length - 1];
          this.fileList.push({
            id: response.result.file.id,
            url: response.result.file.url,
            coverUrl: urlAry.join('/')
          });
          if (this.fileList.length >= this.max) {
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

      // console.log(response, fileList);
    },
    remove (file, index) {
      this.fileList.splice(index, 1);
      if (this.fileList.length < this.max) {
        this.uploaderHide = false;
      }
    },
    changeHonorDate (date) {
      this.form.honorDate = date.valueOf();
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
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.bodyer {
  flex: 1;
  overflow: auto;
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

  .del{
    display: none;
    background-color:rgba(0,0,0,.5);
    .el-icon-delete{
      color:#fff;
      font-size:30px;
      position: absolute;
      left: 50%;
      top:50%;
      margin: -15px 0 0 -15px;
    }
  }
  &:hover .del{
    display: block;
  }
}
</style>
