<template>
  <div class="content">
    <!-- <div class="tip">
      <Icon value=":el-icon-warning"></Icon> 本月已写周志3次
    </div> -->
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form" label-position="top" label-width="120">
          <FormItem  prop="startTime">
            <DateInput prefix="实习时间："  :value="startTimeText" :max-date="new Date()" @change="changeStartTime" no-display view-type="list" container="bottomSheet"></DateInput>
          <div style="font-size:10px; text-align:right; width:100%">已选周时间段：{{myhead()}}</div>
          </FormItem>

          <!-- <div class='tips'>本月已写周志<span> 3 </span>次</div> -->
           <FormItem prop="title" :rules='rewardRules'>
            <TextField prefix="主题："  v-model="form.reward" :max-length="50" ></TextField>
          </FormItem>
          <FormItem label="本周工作内容：" prop="title" :rules='workContentRules'>
            <TextField multi-line v-model="form.workContent" :max-length="500" :rows="10" :rows-max="15"></TextField>
          </FormItem>
          <FormItem label="上传图片" prop="resids" >
             <div class="picList">
              <div :class="{uploader:true,hide:resids.length>=max}">
                <Upload  accept="image/*" class="uploader" :action="actionUrl" :headers="headers" list-type="picture-card" :multiple="false" :limit="max" :file-list="uploaderList" :on-change="change" :on-progress="progress" :on-success="success" :before-upload="beforeUpload" :on-error="error" >
                  <i class="el-icon-plus"></i>
                </Upload>
              </div>
            </div>
          </FormItem>
          <!-- <FormItem label="实习单位"> -->
            <TextField class="read-only w0" readonly v-model="internshipCompanyInfo.companyName"></TextField>
          <!-- </FormItem> -->
          <!-- <FormItem label="实习地点"> -->
            <TextField class="read-only w0"  readonly v-model="internshipCompanyInfo.internshipAddress"></TextField>
          <!-- </FormItem> -->
           <!-- <FormItem label="实习部门"> -->
            <TextField class="read-only w0"  readonly v-model="internshipCompanyInfo.department"></TextField>
          <!-- </FormItem> -->
          <!-- <FormItem label="实习岗位"> -->
            <TextField class="read-only w0"  readonly v-model="internshipCompanyInfo.group"></TextField>
          <!-- </FormItem> -->
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
      resids:[],
       maxSize: 10,
        max: 6,
      form: {
        internshipStart:0,
        internshipEnd:0,
        selectTime:new Date(),
        workContent: '',
        reward: ''
      },
      internshipCompanyInfo: {
        companyName: window.api ? window.api.pageParam.companyName : '-',
        internshipAddress: window.api
          ? window.api.pageParam.internshipAddress
          : '-',
        department: window.api ? window.api.pageParam.department : '-',
        group: window.api ? window.api.pageParam.group : ''
      },
      workContentRules: [
        {
          validate: val => this.form.workContent.length > 0,
          message: '必须填写本周工作内容'
        }
      ],
      rewardRules: [
        {
          validate: val => this.form.reward.length > 0,
          message: '必须填写周志主题'
        }
      ]
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
      return new Date(this.form.selectTime);
    },
    endTimeText () {
      return new Date(this.form.internshipEnd);
    }
  },
  methods: {
    async create () {
      tools.showProgress();

      const response = await service.createReleaseLog({
        ...this.form,
        resids: this.resids.map(r => r.id).join(','),
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
    myhead(){
      return moment(this.form.internshipStart).format('M月D日')+' - '+moment(this.form.internshipEnd).format('M月D日');
    },
    changeStartTime (date) {
      this.form.selectTime=date.valueOf();
      var nows=date.valueOf();
      var noww=new Date(date).getDay();
      noww=noww?noww:7;
      this.form.internshipStart=nows-1000*60*60*24*(noww-1);
      this.form.internshipEnd=nows+1000*60*60*24*(7-noww);
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
    },
    success (response, file, fileList) {
      this.uploaderHide = false;
      switch (response.code) {
        case 0:
          //this.headphoto = tools.getPicUrl(response.result.file.url, 450);
          // this.fileList = [];
          const urlAry = response.result.file.url.split('/');
          urlAry[urlAry.length - 1] = '450_' + urlAry[urlAry.length - 1];
          this.resids.push({
            id: response.result.file.id,
            url: response.result.file.url,
            coverUrl: urlAry.join('/')
          });
          if (this.resids.length >= this.max) {
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
    submit () {
      this.$refs.form.validate().then(result => {
        if (result === true) {
          this.create();
        }
      });
    }
  },
  mounted () {
    this.changeStartTime(new Date(new Date()))
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.w0{
  width: 0px;
  height: 0px;
}
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

.picList {
  font-size: 0;
  // margin: -5px;
  margin-left: 5%;
  padding-top: 15px;
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
