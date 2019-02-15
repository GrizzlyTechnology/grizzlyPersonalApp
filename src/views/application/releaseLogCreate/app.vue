<template>
  <div class="content">
    <!-- <div class="tip">
      <Icon value=":el-icon-warning"></Icon> 本月已写周志3次
    </div> -->
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form" label-position="top" label-width="120">
          <FormItem label="实习单位">
            <TextField class="read-only" readonly v-model="internshipCompanyInfo.companyName"></TextField>
          </FormItem>
          <FormItem label="实习地点">
            <TextField class="read-only" readonly v-model="internshipCompanyInfo.internshipAddress"></TextField>
          </FormItem>
          <FormItem label="实习时间：" prop="startTime" :rules="internshipTimeRules">
            <DateInput style='width:40%;margin-right:15px;' :value="startTimeText" :max-date="new Date()" @change="changeStartTime" no-display view-type="list" container="bottomSheet"></DateInput>
            至
            <DateInput style='width:40%;margin-left:15px' :value="endTimeText" :max-date="new Date()" @change="changeEndTime" no-display view-type="list" container="bottomSheet"></DateInput>
          </FormItem>
          <FormItem label="实习部门">
            <TextField class="read-only" readonly v-model="internshipCompanyInfo.department"></TextField>
          </FormItem>
          <FormItem label="实习岗位">
            <TextField class="read-only" readonly v-model="internshipCompanyInfo.group"></TextField>
          </FormItem>

          <!-- <div class='tips'>本月已写周志<span> 3 </span>次</div> -->
          <FormItem label="本周工作内容：" prop="title" :rules='workContentRules'>
            <TextField multi-line v-model="form.workContent" :max-length="255" :rows="5" :rows-max="5"></TextField>
          </FormItem>
          <FormItem label="本周收获：" prop="title" :rules='rewardRules'>
            <TextField multi-line v-model="form.reward" :max-length="255" :rows="5" :rows-max="5"></TextField>
          </FormItem>
          <FormItem label="上传图片" prop="url">
            <input type="hidden" v-model="form.url" />
            <Upload accept="image/*" class="uploader" :action="actionUrl" :headers="headers" list-type="picture-card" :multiple="false" :limit="6" :file-list="uploaderList" :on-change="change" :on-progress="progress" :on-success="success" :before-upload="beforeUpload" :on-error="error">
            <i class="el-icon-plus"></i>
            </Upload>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="submit">提交</Button>
    </div>
  </div>
</template>

<script>
import service from 'service';
import { hostList } from 'service/mock';
import moment from 'moment';
import tools from 'util/tools';
import Upload from 'element-ui/lib/upload';
import { Icon, Alert, Button, TextField, DateInput } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
export default {
  data () {
    return {
      companyId: window.api ? window.api.pageParam.companyId : '',
      uploaderList:[],
       actionUrl: 'http://' + (process.env === 'production' ? hostList.pro : hostList.test) + '/api/Userresources/create',
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
      form: {
        internshipStart: Date.parse(
          moment()
            .subtract('day', 1)
            .format('YYYY-MM-DD')
        ),
        internshipEnd: Date.parse(
          moment()
            .add('day', 0)
            .format('YYYY-MM-DD')
        ),
        workContent: '',
        reward: '',
        url: '',
      },
      internshipCompanyInfo: {
        companyName: window.api ? window.api.pageParam.companyName : '-',
        internshipAddress: window.api
          ? window.api.pageParam.internshipAddress
          : '-',
        department: window.api ? window.api.pageParam.department : '-',
        group: window.api ? window.api.pageParam.group : ''
      },
      internshipTimeRules: [
        {
          validate: val => this.form.internshipStart <= this.form.internshipEnd,
          message: '开始时间不能在结束时间之后'
        }
      ],
      workContentRules: [
        {
          validate: val => this.form.workContent.length > 0,
          message: '必须填写本周工作内容'
        }
      ],
      rewardRules: [
        {
          validate: val => this.form.reward.length > 0,
          message: '必须填写本周收获'
        }
      ]
      // urlRules: [{ validate: val => !!val, message: '必须上传作品图片' }]
    };
  },
  components: {
    Alert,
    Button,
    DateInput,
    Form,
    FormItem,
    Icon,
    TextField,
    Upload
  },
  computed: {
    startTimeText () {
      return new Date(this.form.internshipStart);
    },
    endTimeText () {
      return new Date(this.form.internshipEnd);
    }
  },
  methods: {
    async create () {
      tools.showProgress();
      // console.log(JSON.stringify(this.form));
      const response = await service.createReleaseLog({
        ...this.form,
        companyId: this.companyId
      });
      tools.hideProgress();
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
    changeStartTime (date) {
      this.form.internshipStart = date.valueOf();
    },
    changeEndTime (date) {
      this.form.internshipEnd = date.valueOf();
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
          //this.headphoto = tools.getPicUrl(response.result.file.url, 450);
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
    submit () {
      this.$refs.form.validate().then(result => {
        if (result === true) {
          this.create();
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
}
.bodyer {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.tip {
  padding: 10px;
  background-color: #d6ebff;
  color: #409eff;
}
</style>
