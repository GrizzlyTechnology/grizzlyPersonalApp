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
          <FormItem label="荣誉图片" prop="fileList" :rules="fileListRules">
            <Upload accept="image/*" :class="uploaderClass" list-type="picture-card" name="file" :with-credentials="true" :multiple="false" :data="{type:2}" :headers="headers" :action="actionUrl" :limit="max" :file-list="fileList" :on-change="change" :on-progress="progress" :on-remove="remove" :on-success="success" :before-upload="beforeUpload" :on-error="error">
              <i class="el-icon-plus"></i>
            </Upload>
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
import { Form, FormItem } from 'muse-ui/lib/Form';
// import regexps from 'util/regexps';
import tools from 'util/tools';
import { hostList } from 'service/mock';

// import dictMap from 'util/dictMap';
// import dictMap from 'util/dictMap';
export default {
  data () {
    return {
      uploaderClass: 'uploader',
      actionUrl: 'http://' + (process.env === 'development' ? hostList.test : hostList.test) + '/api/Userresources/create',
      // actionUrl: 'https://jsonplaceholder.typicode.com/posts/',
      headers: {
        MG_code:
          '5uwPulFblsIANI7BIP#a%bBo582#wOud3v%f0c1JgJRskqUTN7y4&TPUTgjkmhOjZI#oVc4Ph4Ar^ApQFy$ZlGl3T9MaIskgGWTVjqHxsP^8S^%gY#nAj9X4DV9x&b7O',
        MG_key: '5b10fed636fcf',
        MG_token: process.env !== 'production' ? '6f8bade35ef87e5a6aa623519ef973582dc25205' : tools.getStorage('token') || ''
      },
      maxSize: 10,
      max: 6,
      fileList: window.api && window.api.pageParam.honor ? window.api.pageParam.honor.reslist : [],
      id: window.api ? window.api.pageParam.id : null,
      form: {
        title: window.api && window.api.pageParam.honor ? window.api.pageParam.honor.title : '',
        honorDate: window.api && window.api.pageParam.honor ? window.api.pageParam.honor.honorDate : Date.now()
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
    DateInput
  },
  methods: {
    async create () {
      tools.showProgress();
      const response = await service.createUserHonor({
        ...this.form,
        resids: this.fileList.map(r => r.id),
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
        honorId: this.id,
        resids: this.fileList.map(r => r.id),
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
            message: '荣誉展示编辑失败，请稍后重试！！'
          });
          break;
      }
    },
    change (file) {
      console.log('change: ' + JSON.stringify(file));
      switch (file.status) {
        case 'ready':
          this.uploaderClass = 'uploader hideUploader';
          break;
        default:
          break;
      }
      // this.uploaderClass = 'uploader hideUploader';
    },
    progress () {
      // this.uploaderClass = 'uploader hideUploader';
    },
    beforeUpload (file) {
      if (file.size > this.maxSize * 1024 * 1024) {
        tools.toast({
          position: 'top',
          message: '图片最大' + this.maxSize + 'M'
        });
        this.uploaderClass = 'uploader';
        return false;
      }
    },
    error (e, file, fileList) {
      console.log(JSON.stringify(e));
      this.uploaderClass = 'uploader';
    },
    success (response, file, fileList) {
      this.uploaderClass = 'uploader';
      console.log(JSON.stringify(fileList));
      switch (response.code) {
        case 0:
          this.fileList.push(
            {
              id: response.result.file.id,
              url: response.result.file.url
            }
          );
          if (this.fileList.length >= this.max) {
            this.uploaderClass = 'uploader hideUploader';
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
    remove (file, fileList) {
      this.fileList = fileList.map(r => {
        return {
          id: r.id,
          url: r.url
        };
      });
      if (this.fileList.length < this.max) {
        this.uploaderClass = 'uploader';
      }
    },
    changeHonorDate (date) {
      this.form.honorDate = date.valueOf();
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
<style lang="less">
.uploader {
  .el-icon-plus {
    font-size: 50px;
    position: relative;
    top: 15px;
  }
}
.hideUploader{
  .el-upload{
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
</style>
