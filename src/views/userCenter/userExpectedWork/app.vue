<template>
  <div class="content">
    <div class="bodyer">
      <div style="padding:15px">
        <Form ref="form" :model="form">
          <FormItem label="期望职位" prop="desiredPosition" :rules="desiredPositionRules">
            <TextField v-model="form.desiredPosition"></TextField>
          </FormItem>
          <FormItem label="期望月薪" prop="expectedSalary" >
            <TextField v-model="form.expectedSalary" readonly @click="expectedSalaryPopup"></TextField>
          </FormItem>
          <!-- <FormItem label="期望城市" prop="expectedCity" :rules="expectedCityRules">
            <TextField readonly multi-line :style="{height:rowHeight + 'px'}" />
            <div class="chipCon" @click="expectedCityHandle">
              <div ref="chipCon">
                <Chip @click.stop="()=>{}" class="cityTip" v-for="row in expectedCityList" :key="row.id" :delete="true" @delete="delCity(row)">{{row.label}}</Chip>
              </div>
            </div>
          </FormItem> -->
          <FormItem label="期望城市" prop="expectedCity" :rules="expectedCityRules">
            <TextField readonly v-model="form.expectedCity" @click="expectedCityHandle">
            </TextField>
          </FormItem>
          <FormItem label="工作性质" prop="workType">
            <TextField v-model="form.workType" readonly @click="openWorkTypePopup"></TextField>
          </FormItem>
          <FormItem label="当前状态" prop="currentState">
            <TextField v-model="form.currentState" readonly @click="currentStatePopup"></TextField>
          </FormItem>
          <FormItem label="到岗时间" prop="timeToPost">
            <TextField v-model="form.timeToPost" readonly @click="timeToPostPopup"></TextField>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="submit">保存</Button>
    </div>

    <PickerPopup ref="expectedSalaryPopup" :slots="expectedSalaryPopupSlots" @confirm="setExpectedSalary"></PickerPopup>
    <PickerPopup ref="workTypePopup" :slots="workTypePopupSlots" @confirm="setWorkType"></PickerPopup>
    <PickerPopup ref="currentStatePopup" :slots="currentStatePopupSlots" @confirm="setCurrentStatePopup"></PickerPopup>
    <PickerPopup ref="timeToPostPopup" :slots="timeToPostPopupSlots" @confirm="setTimeToPostPopup"></PickerPopup>
  </div>
</template>

<script>
import service from 'service';
// import moment from 'moment';
import { Button, TextField, Chip } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import PickerPopup from 'components/PickerPopup';
// import regexps from 'util/regexps';
import tools from 'util/tools';
import dictMap from 'util/dictMap';
export default {
  data () {
    return {
      id: window.api.pageParam.id || null,
      // id: 2,
      // rowHeight: 28,
      form: {
        desiredPosition: window.api.pageParam.expectedWork.desiredPosition,
        expectedSalary: window.api.pageParam.expectedWork.expectedSalary || dictMap.expectedSalary[0],
        expectedCity: window.api.pageParam.expectedWork.expectedCity,
        workType: window.api.pageParam.expectedWork.workType || dictMap.workType[0],
        currentState: window.api.pageParam.expectedWork.currentState || dictMap.currentState[0],
        timeToPost: window.api.pageParam.expectedWork.timeToPost || dictMap.timeToPost[0]
      },
      desiredPositionRules: [
        { validate: val => !!val, message: '必须填写期望职位' }
      ],
      // expectedSalaryRules: [
      //   { validate: val => !!val, message: '必须填写期望月薪' }
      // ],
      // expectedCityRules: [
      //   {
      //     validate: val => Object.keys(this.form.expectedCity).length > 0,
      //     message: '至少选择一个期望城市'
      //   },
      //   {
      //     validate: val => Object.keys(this.form.expectedCity).length <= 3,
      //     message: '最多选择三个期望城市'
      //   }
      // ]
      expectedCityRules: [
        {
          validate: val => val,
          message: '请选择一个期望城市'
        }
      ]
    };
  },
  computed: {
    expectedSalaryPopupSlots () {
      return [
        {
          flex: 1,
          defaultIndex: dictMap.expectedSalary.indexOf(this.form.expectedSalary),
          values: dictMap.expectedSalary
        }
      ];
    },
    workTypePopupSlots () {
      return [
        {
          flex: 1,
          defaultIndex: dictMap.workType.indexOf(this.form.workType),
          values: dictMap.workType
        }
      ];
    },
    currentStatePopupSlots () {
      return [
        {
          flex: 1,
          defaultIndex: dictMap.currentState.indexOf(this.form.currentState),
          values: dictMap.currentState
        }
      ];
    },
    timeToPostPopupSlots () {
      return [
        {
          flex: 1,
          defaultIndex: dictMap.timeToPost.indexOf(this.form.timeToPost),
          values: dictMap.timeToPost
        }
      ];
    },
    // expectedCityList () {
    //   return Object.keys(this.form.expectedCity).map(
    //     id => this.form.expectedCity[id]
    //   );
    // },
    // expectedSalaryText () {
    //   return dictMap.expectedSalary[this.form.expectedSalary];
    // },
    workTypeText () {
      return dictMap.workType[this.form.workType];
    },
    currentStateText () {
      return dictMap.currentState[this.form.currentState];
    },
    timeToPostText () {
      return dictMap.timeToPost[this.form.timeToPost];
    }
  },
  components: {
    Button,
    Form,
    FormItem,
    TextField,
    Chip,
    PickerPopup
  },
  watch: {
    // expectedCityList () {
    //   setTimeout(() => {
    //     this.rowHeight = this.$refs.chipCon.offsetHeight;
    //   }, 50);
    // }
  },
  methods: {
    async edit () {
      // console.log(JSON.stringify({
      //   ...this.form,
      //   // expectedCity: this.expectedCityList,
      //   workType: dictMap.workType.indexOf(this.form.workType),
      //   currentState: dictMap.currentState.indexOf(this.form.currentState),
      //   timeToPost: dictMap.timeToPost.indexOf(this.form.timeToPost),
      //   resumeId: this.id
      // }));
      tools.showProgress();
      const response = await service.updateUserBaesInfo({
        ...this.form,
        // expectedCity: this.expectedCityList,
        workType: dictMap.workType.indexOf(this.form.workType),
        currentState: dictMap.currentState.indexOf(this.form.currentState),
        timeToPost: dictMap.timeToPost.indexOf(this.form.timeToPost),
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          // tools.toast({
          //   position: 'top',
          //   message: '期望工作编辑成功'
          // });
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
    setExpectedSalary (data) {
      this.form.expectedSalary = data;
    },
    setWorkType (data) {
      this.form.workType = data;
    },
    setCurrentStatePopup (data) {
      this.form.currentState = data;
    },
    setTimeToPostPopup (data) {
      this.form.timeToPost = data;
    },
    expectedSalaryPopup () {
      this.$refs.expectedSalaryPopup.open();
    },
    openWorkTypePopup () {
      this.$refs.workTypePopup.open();
    },
    currentStatePopup () {
      this.$refs.currentStatePopup.open();
    },
    timeToPostPopup () {
      this.$refs.timeToPostPopup.open();
    },
    expectedCityHandle () {
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
          callback: (ret, err) => {
            this.form.expectedCity = ret.value[ret.value.length - 1].label;
          }
        }
      });
    },
    // expectedCityHandle () {
    //   if (this.expectedCityList.length < 3) {
    //     tools.openWin({
    //       name: 'areaSelector',
    //       url: '../win.html',
    //       title: '选择期望城市',
    //       fname: 'areaSelector_f',
    //       furl: './common/areaSelector.html',
    //       hasLeft: 1,
    //       data: {
    //         nameSpace: 'areaSelector',
    //         area: [],
    //         level: 2,
    //         callback: (ret, err) => {
    //           // console.log(JSON.stringify(ret));
    //           const city = ret.value[ret.value.length - 1];
    //           // console.log(JSON.stringify(city));
    //           this.form.expectedCity[city.value] = city;
    //           this.form.expectedCity = { ...this.form.expectedCity };
    //         }
    //       }
    //     });
    //   } else {
    //     tools.toast({
    //       position: 'top',
    //       message: '最多选择三个期望城市'
    //     });
    //   }
    // },
    // delCity (city) {
    //   delete this.form.expectedCity[city.value];
    //   this.form.expectedCity = { ...this.form.expectedCity };
    // },
    submit () {
      this.$refs.form.validate().then(result => {
        if (result === true) {
          this.edit();
        }
      });
    }
  },
  mounted () {
    // this.rowHeight = this.$refs.chipCon.offsetHeight;
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
// .chipCon {
//   // background-color: red;
//   position: absolute;
//   left: 0;
//   top: 28px;
//   bottom: 17px;
//   right: 0;
//   & > div {
//     min-height: 28px;
//   }
// }
// .cityTip {
//   border-radius: 10px;
//   line-height: 20px;
//   margin-bottom: 4px;
//   margin-right: 4px;
// }
</style>
