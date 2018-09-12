<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="期望职位" prop="desiredPosition" :rules="desiredPositionRules">
            <TextField v-model="form.desiredPosition"></TextField>
          </FormItem>
          <FormItem label="期望月薪" prop="expectedSalary" :rules="expectedSalaryRules">
            <TextField v-model="form.expectedSalary"></TextField>
          </FormItem>
          <FormItem label="期望城市" prop="expectedCity" :rules="expectedCityRules">
            <TextField
              readonly
              multi-line
              :style="{height:rowHeight + 'px'}"
            />
            <div class="chipCon" @click="expectedCityHandle">
              <div ref="chipCon">
                <Chip
                  @click.stop="()=>{}"
                  class="cityTip"
                  v-for="row in expectedCityList"
                  :key="row.id"
                  :delete="true"
                  @delete="delCity(row)"
                >{{row.label}}</Chip>
              </div>
            </div>
          </FormItem>
          <FormItem label="工作性质" prop="workType">
            <TextField v-model="workTypeText" readonly @click="workTypePopup=true"></TextField>
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
import { Button, TextField, Radio, Chip, SlidePicker } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
// import regexps from 'util/regexps';
import tools from 'util/tools';
import dictMap from 'util/dictMap';
export default {
  name: 'userInfo',
  data () {
    return {
      workTypePopup: false,
      // id: window.api.pageParam.id || null,
      id: 2,
      rowHeight: 28,
      form: {
        // desiredPosition: window.api.pageParam.desiredPosition,
        // expectedSalary: window.api.pageParam.expectedSalary,
        // expectedCity: window.api.pageParam.expectedCity,
        // workType: window.api.pageParam.workType || 0,
        // currentState: window.api.pageParam.currentState || 0,
        // timeToPost: window.api.pageParam.timeToPost || 0
        desiredPosition: '',
        expectedSalary: '',
        expectedCity: {},
        workType: 0,
        currentState: 0,
        timeToPost: 0
      },
      desiredPositionRules: [{ validate: val => !!val, message: '必须填写期望职位' }],
      expectedSalaryRules: [{ validate: val => !!val, message: '必须填写期望月薪' }],
      expectedCityRules: [
        { validate: val => Object.keys(this.form.expectedCity).length > 0, message: '至少选择一个期望城市' },
        { validate: val => Object.keys(this.form.expectedCity).length <= 3, message: '最多选择三个期望城市' }
      ]
    };
  },
  computed: {
    expectedCityList () {
      return Object.keys(this.form.expectedCity).map(id => this.form.expectedCity[id]);
    },
    workTypeText () {
      return dictMap.workType[this.form.workType];
    }
  },
  components: {
    SlidePicker,
    Button,
    Form,
    FormItem,
    TextField,
    Chip,
    Radio
  },
  watch: {
    expectedCityList () {
      setTimeout(() => {
        this.rowHeight = this.$refs.chipCon.offsetHeight;
      }, 50);
    }
  },
  methods: {
    async edit () {
      tools.showProgress();
      const response = await service.updateUserBaesInfo({
        ...this.form,
        expectedCity: this.expectedCityList,
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          tools.toast({
            position: 'top',
            message: '期望工作编辑成功'
          });
          tools.closeWin();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '期望工作编辑失败，请稍后重试！！'
          });
          break;
      }
    },
    expectedCityHandle () {
      if (this.expectedCityList.length < 3) {
        tools.openWin({
          name: 'areaSelector',
          url: '../win.html',
          title: '选择期望城市',
          fname: 'areaSelector_f',
          furl: './common/areaSelector.html',
          hasLeft: 1,
          data: {
            nameSpace: 'areaSelector',
            area: [],
            level: 2,
            callback: (ret, err) => {
              // console.log(JSON.stringify(ret));
              const city = ret.value[ret.value.length - 1];
              // console.log(JSON.stringify(city));
              this.form.expectedCity[city.value] = city;
              this.form.expectedCity = {...this.form.expectedCity};
            }
          }
        });
      } else {
        tools.toast({
          position: 'top',
          message: '最多选择三个期望城市'
        });
      }
    },
    delCity (city) {
      delete this.form.expectedCity[city.value];
      this.form.expectedCity = {...this.form.expectedCity};
    },
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result === true) {
          this.edit();
        }
      });
    }
  },
  mounted () {
    this.rowHeight = this.$refs.chipCon.offsetHeight;
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
.chipCon{
  // background-color: red;
  position: absolute;
  left: 0;
  top: 28px;
  bottom: 17px;
  right: 0;
  &>div{
    min-height: 28px;
  }
}
.cityTip{
  border-radius: 10px;
  line-height: 20px;
  margin-bottom: 4px;
  margin-right: 4px;
}
</style>
