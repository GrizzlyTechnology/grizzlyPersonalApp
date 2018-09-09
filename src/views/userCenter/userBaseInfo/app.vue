<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="姓名" prop="name" :rules="nameRules">
            <TextField v-model="form.name"></TextField>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <Radio v-model="form.sex" :value="1" label="男"></Radio>
            <Radio v-model="form.sex" :value="0" label="女"></Radio>
          </FormItem>
          <FormItem label="出生年月" prop="birthday">
            <DateInput :value="birthdayText" :max-date="new Date()" @change="changeBirthday" format="YYYY年MM月DD日" no-display view-type="list" container="bottomSheet"></DateInput>
          </FormItem>
          <FormItem label="户籍" prop="houseHoldText" :rules="houseHoldRules">
            <TextField readonly v-model="houseHoldText" @click="houseHoldHandle">
            </TextField>
          </FormItem>
          <FormItem label="现居地" prop="addressText" :rules="addressRules">
            <TextField readonly v-model="addressText" @click="addressHandle"></TextField>
          </FormItem>
          <FormItem label="街道" prop="street" :rules="streetRules">
            <TextField v-model="form.address.street"></TextField>
          </FormItem>
          <FormItem label="手机号码" prop="phone" :rules="phoneRules">
            <TextField v-model="form.phone"></TextField>
          </FormItem>
          <FormItem label="电子邮箱" prop="email" :rules="emailRules">
            <TextField v-model="form.email"></TextField>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="()=>{}">保存</Button>
    </div>
  </div>
</template>

<script>
// import service from 'service';
// import moment from 'moment';
import { Button, TextField, Radio, DateInput } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import regexps from 'util/regexps';
import tools from 'util/tools';
import dictMap from 'util/dictMap';
export default {
  name: 'userInfo',
  data () {
    return {
      // startDateTime: new Date(),
      sexMap: dictMap.sex,
      form: {
        name: '', // true string 真实姓名
        sex: 1, // true string 性别
        birthday: new Date(), // true string生日
        houseHold: [], // true string 籍贯
        address: [],
        street: '',
        phone: '', // true string手机
        email: '' // true string 邮箱
      },
      nameRules: [{ validate: val => !!val, message: '必须填写姓名' }],
      birthdayRules: [{ validate: val => val, message: '必须填写出生年月' }],
      houseHoldRules: [
        {
          validate: val => this.houseHoldText.length > 0,
          message: '必须填写籍贯'
        }
      ],
      addressRules: [
        {
          validate: val => this.addressText.length > 0,
          message: '必须填写地址信息'
        }
      ],
      streetRules: [
        {
          validate: val => this.form.street.length > 0,
          message: '必须填写街道信息'
        }
      ],
      phoneRules: [
        {
          validate: val => regexps.mobPhone.test(this.form.phone),
          message: '请填写正确的手机号码'
        }
      ],
      emailRules: [
        {
          validate: val => regexps.email.test(this.form.email),
          message: '请填写正确的电子邮箱'
        }
      ]
    };
  },
  computed: {
    birthdayText () {
      return new Date(this.form.birthday) || new Date();
    },
    houseHoldText () {
      return this.form.houseHold.map(row => row.label).join(' / ');
    },
    addressText () {
      return this.form.address.map(row => row.label).join(' / ');
    }
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField,
    Radio,
    DateInput
  },
  methods: {
    changeBirthday (date) {
      this.form.birthday = date.valueOf();
    },
    houseHoldHandle () {
      tools.openWin({
        name: 'areaSelector',
        url: '../win.html',
        title: '选择户籍',
        fname: 'areaSelector_f',
        furl: './common/areaSelector.html',
        hasLeft: 1,
        data: {
          nameSpace: 'areaSelector',
          area: this.form.houseHold,
          level: 2,
          callback: 'houseHoldCallback'
        }
      });
    },
    addressHandle () {
      tools.openWin({
        name: 'areaSelector',
        url: '../win.html',
        title: '选择现居地',
        fname: 'areaSelector_f',
        furl: './common/areaSelector.html',
        hasLeft: 1,
        data: {
          nameSpace: 'areaSelector',
          area: this.form.address,
          level: 3,
          callback: 'addressCallback'
        }
      });
    }
  },
  mounted () {
    if (window.api) {
      if (window.api.pageParam.nameSpace === 'resumeDetail') {
        this.form = { ...window.api.pageParam.baseInfo };
        this.form.birthday =
          window.api.pageParam.baseInfo.birthday || Date.now().valueOf();
        this.form.sex = window.api.pageParam.baseInfo.sex || 1;
      }
      window.api.addEventListener(
        {
          name: 'houseHoldCallback'
        },
        (ret, err) => {
          this.form.houseHold = JSON.parse(ret.value);
        }
      );

      window.api.addEventListener(
        {
          name: 'addressCallback'
        },
        (ret, err) => {
          this.form.address = JSON.parse(ret.value);
        }
      );
    }
  }
};
</script>
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
// .startDateTime{
//   bottom: 50px;
// }
</style>
