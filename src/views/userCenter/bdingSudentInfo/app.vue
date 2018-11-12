<template>
  <div class="content">
    <Form ref="form" :model="form" v-if="!!studentStatus===false">
      <FormItem label="姓名" prop="name" :rules="nameRules">
        <TextField v-model="form.name"></TextField>
      </FormItem>
      <FormItem label="性别" prop="sex">
        <Radio v-model="form.sex" :value="1" label="男"></Radio>
        <Radio v-model="form.sex" :value="0" label="女"></Radio>
      </FormItem>
      <FormItem label="入学时间">
        <DateInput :value="startDateTimeText" :max-date="new Date()" @change="changeStartDateTime" format="YYYY年MM月DD日" no-display view-type="list" container="bottomSheet" />
      </FormItem>
      <FormItem label="身份证" prop="identity" :rules="identityRules">
        <TextField v-model="form.identity"></TextField>
      </FormItem>
      <FormItem label="电话" prop="phone" :rules="phoneRules">
        <TextField v-model="form.phone"></TextField>
      </FormItem>
      <FormItem label="班级码" prop="code" :rules="codeRules">
        <TextField v-model="form.code"></TextField>
      </FormItem>
    </Form>
    <Button v-if="!!studentStatus===false" color="#009688" textColor="#ffffff" :full-width="true" :style="{boxShadow: '0 0 0'}" large @click="submit">提交学籍</Button>
    <div v-if="!!studentStatus===true">
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">姓名</span>
          <span class="ucCellLabel">{{studentStatus.name}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">性别</span>
          <span class="ucCellLabel">{{studentStatus.sex===0?'女':'男'}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">入学时间</span>
          <span class="ucCellLabel">{{name}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">身份证</span>
          <span class="ucCellLabel">{{studentStatus.identity}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">电话</span>
          <span class="ucCellLabel">{{studentStatus.phone}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">学校</span>
          <span class="ucCellLabel">{{studentStatus.schoolname}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">学年</span>
          <span class="ucCellLabel">{{studentStatus.yearname}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">院系</span>
          <span class="ucCellLabel">{{studentStatus.collegename}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">专业</span>
          <span class="ucCellLabel">{{studentStatus.majorname}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">班级</span>
          <span class="ucCellLabel">{{studentStatus.classname}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">班主任</span>
          <span class="ucCellLabel">{{studentStatus.teachername}}</span>
        </div>
      </Cell>
    </div>
  </div>
</template>

<script>
// import moment from 'moment';
import service from 'service';
import { Cell } from 'mint-ui';
import { DateInput, Button, TextField, Radio } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import regexps from 'util/regexps';
import tools from 'util/tools';

export default {
  data () {
    return {
      startDateTime: new Date(),
      form: {
        name: '',
        sex: 1,
        identity: '',
        phone: '',
        nrolmentTime: new Date().valueOf(),
        code: ''
      },
      studentStatus: window.api ? window.api.pageParam.studentStatus : null,
      nameRules: [{ validate: val => !!val, message: '必须填写姓名' }],
      codeRules: [{ validate: val => !!val, message: '必须填写班级码' }],
      identityRules: [
        {
          validate: val => regexps.IdCard.test(val),
          message: '填写正确的身份证信息'
        }
      ],
      phoneRules: [
        {
          validate: val => regexps.mobPhone.test(val),
          message: '填写正确的手机号码'
        }
      ]
    };
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField,
    Radio,
    DateInput,
    Cell
  },
  computed: {
    startDateTimeText () {
      return new Date(this.form.nrolmentTime) || Date.now();
    }
  },
  methods: {
    async create () {
      console.log(JSON.stringify(this.form));
      const response = await service.createStudent(this.form);
      switch (response.code) {
        case 0:
          tools.toast({
            position: 'top',
            message: '学籍信息创建成功！'
          });
          tools.closeWin();
          // tools.sendEvent('getStudentStatusCallBack');
          // todo 身份列表 studentInfoListCallback
          // window.api.closeToWin({
          //   name: 'main'
          // });
          break;
        default:
          tools.toast({
            position: 'top',
            message: '学籍信息创建失败，请稍后重试！！'
          });
          break;
      }
    },
    async getUserInfo () {
      tools.showProgress();
      const response = await service.getUserInfo();
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.form.name = response.result.userInfo.name || this.form.name;
          this.form.sex = response.result.userInfo.sex || this.form.sex;
          this.form.identity =
            response.result.userInfo.identity || this.form.identity;
          this.form.phone = response.result.userInfo.phone || this.form.phone;
          break;
        default:
          break;
      }
    },
    changeStartDateTime (date) {
      this.form.nrolmentTime = date.valueOf();
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
    if (this.studentStatus === null) {
      this.getUserInfo();
    }
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.content {
  padding: 15px;
}
.ucCell {
  &.link {
    .isLink {
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
    .ucCellLabel {
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
}
// .startDateTime{
//   bottom: 50px;
// }
</style>
