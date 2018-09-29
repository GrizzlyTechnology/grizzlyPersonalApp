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
            <Upload accept="image/*" :class="{uploader:true, hideUploader: fileList.length>=6 }" list-type="picture-card" name="file" :with-credentials="true" :multiple="false" :data="{type:2}" :headers="headers" :action="actionUrl" :limit="max" :file-list="fileList" :on-remove="remove" :on-success="success">
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
// import dictMap from 'util/dictMap';
// import dictMap from 'util/dictMap';
export default {
  data () {
    return {
      actionUrl: 'https://jsonplaceholder.typicode.com/posts/',
      headers: {
        MG_code:
          '5uwPulFblsIANI7BIP#a%bBo582#wOud3v%f0c1JgJRskqUTN7y4&TPUTgjkmhOjZI#oVc4Ph4Ar^ApQFy$ZlGl3T9MaIskgGWTVjqHxsP^8S^%gY#nAj9X4DV9x&b7O',
        MG_key: '5b10fed636fcf',
        MG_token:
          process.env !== 'production'
            ? '6f8bade35ef87e5a6aa623519ef973582dc25205'
            : tools.getStorage('token') || ''
      },
      max: 6,
      fileList: [
        {
          id: 0,
          url: 'http://photocdn.sohu.com/20060801/Img244557955.jpg',
          resources: 'http://photocdn.sohu.com/20060801/Img244557955.jpg'
        },
        {
          id: 1,
          url:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537852584880&di=e6aa4d4489d71e518c40304c2dcf0897&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F86d6277f9e2f0708a84c923de224b899a901f246.jpg',
          resources:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537852584880&di=e6aa4d4489d71e518c40304c2dcf0897&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F86d6277f9e2f0708a84c923de224b899a901f246.jpg'
        },
        {
          id: 2,
          url:
            'https://timgsa.baidu.com/timg?r=3&image&quality=80&size=b9999_10000&sec=1537412951566&di=18b588c557aed8fe9d47927c1d8dfde7&imgtype=0&src=http%3A%2F%2Fs11.sinaimg.cn%2Fmw690%2F006qsdYzzy78Eo0oJXI6a%26690',
          resources:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537412951566&di=18b588c557aed8fe9d47927c1d8dfde7&imgtype=0&src=http%3A%2F%2Fs11.sinaimg.cn%2Fmw690%2F006qsdYzzy78Eo0oJXI6a%26690'
        }
      ],
      // fileList: window.api && window.api.pageParam.honor
      //   ? window.api.pageParam.honor.reslist : [],
      id: window.api ? window.api.pageParam.id : null,
      form: {
        title:
          window.api && window.api.pageParam.honor
            ? window.api.pageParam.honor.title
            : '',
        honorDate:
          window.api && window.api.pageParam.honor
            ? window.api.pageParam.honor.honorDate
            : Date.now()
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
      const response = await service.createUserOpus({
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
            message: '作品图片创建失败，请稍后重试！！'
          });
          break;
      }
    },
    async edit () {
      tools.showProgress();
      const response = await service.updateUserOpus({
        opusId: this.id,
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
            message: '作品图片编辑失败，请稍后重试！！'
          });
          break;
      }
    },
    remove (file, fileList) {
      this.fileList = fileList.map(r => {
        return {
          id: r.id,
          url: r.url
        };
      });
    },
    success (response, file, fileList) {
      this.fileList = fileList.map(r => {
        return {
          id: r.id || response.id,
          url: r.url
        };
      });
      // console.log(response, fileList);
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
