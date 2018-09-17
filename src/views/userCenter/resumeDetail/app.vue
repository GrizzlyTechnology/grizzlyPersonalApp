<template>
  <div class="content">
    <Panel title="基本信息" :label="isRequired">
      <Cell title="姓名" :value="baseInfo.name"></Cell>
      <Cell title="性别" :value="sexText"></Cell>
      <Cell title="出生年月" :value="birthdayText"></Cell>
      <Cell title="户籍" :value="houseHoldText"></Cell>
      <Cell title="地址" :value="addressText"></Cell>
      <Cell title="手机号码" :value="baseInfo.phone"></Cell>
      <Cell title="电子邮箱" :value="baseInfo.email"></Cell>
      <Button v-if="type==='edit'" class="editBtn" slot="end" flat color="#009688" @click="baseInfoEdit">
        <Icon left value=":icon-75bianji" />编辑
      </Button>
    </Panel>
    <Panel title="教育经历" :noContent="education.length===0" v-if="isNotDetail || education.length>0" :label="isRequired">
      <Button v-if="type==='edit'" class="editBtn" slot="end" flat color="#009688" @click="educationEdit">
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <StepVertical class="stepVertical" :data="education" />
      <div slot="info">
        暂无教育经历
      </div>
    </Panel>
    <Panel title="实习经历" :noContent="internship.length===0" v-if="isNotDetail || internship.length>0">
      <Button v-if="type==='edit'" class="editBtn" slot="end" flat color="#009688" @click="internshipEdit">
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <StepVertical class="stepVertical" :data="internship" />
      <div slot="info">
        暂无实习经历
      </div>
    </Panel>
    <Panel title="项目经验">
      <StepVertical class="stepVertical" :data="education" />
    </Panel>
    <Panel title="自我描述" :noContent="introduction.length===0" v-if="isNotDetail|| introduction.length>0">
      <Button v-if="type==='edit'" class="editBtn" slot="end" flat color="#009688" @click="introductionEdit">
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <div class="introduction" v-html="introduction.replace(/\n|\r\n/g,'<br/>')" />
      <div slot="info">
        暂无自我描述
      </div>
    </Panel>

    <Panel title="技能评价">
      <SkillLine title="Axure" :value="0" />
      <SkillLine title="Axure" :value="10" />
      <SkillLine title="Axure" :value="20" />
      <SkillLine title="Axure" :value="30" />
      <SkillLine title="Axure" :value="40" />
      <SkillLine title="Axure" :value="50" />
      <SkillLine title="Axure" :value="60" />
      <SkillLine title="Axure" :value="70" />
      <SkillLine title="Axure" :value="80" />
      <SkillLine title="Axure" :value="90" />
      <SkillLine title="Axure" :value="100" />
    </Panel>
    <Panel title="期望工作" :label="isRequired">
      <Button v-if="type==='edit'" class="editBtn" slot="end" flat color="#009688" @click="expectedWorkEdit">
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <Cell title="期望职位" :value="expectedWork.desiredPosition"></Cell>
      <Cell title="期望月薪" :value="expectedWork.expectedSalary"></Cell>
      <Cell title="期望城市" :value="expectedWork.expectedCity"></Cell>
      <Cell title="工作性质" :value="workTypeText"></Cell>
      <Cell title="当前状态" :value="currentStateText"></Cell>
      <Cell title="到岗时间" :value="timeToPostText"></Cell>
    </Panel>
  </div>
  </div>
</template>

<script>
import moment from 'moment';

import service from 'service';
import tools from 'util/tools';
import dictMap from 'util/dictMap';
import adapter from 'util/adapter';

import { Button, Icon } from 'muse-ui';
import { Cell } from 'mint-ui';
import Panel from 'components/Panel';
import StepVertical from 'components/StepVertical';
import SkillLine from 'components/SkillLine';

export default {
  data () {
    return {
      type: window.api ? window.api.pageParam.type : 'detail',
      id: window.api ? window.api.pageParam.id : null,
      introduction: '',
      baseInfo: {
        title: '', // 简历名称
        name: '', // true string 真实姓名
        sex: null, // true string 性别
        birthday: null, // true string生日
        houseHold: [], // true string 籍贯
        address: [],
        street: '',
        phone: '', // true string手机
        email: '' // true string 邮箱，
      },
      expectedWork: {
        desiredPosition: '',
        expectedSalary: '',
        expectedCity: '',
        workType: null,
        currentState: null,
        timeToPost: null
      },
      education: [],
      internship: []
    };
  },
  components: {
    Button,
    Cell,
    Panel,
    StepVertical,
    SkillLine,
    Icon
  },
  computed: {
    isNotDetail () {
      return this.type === 'creat' || this.type === 'edit';
    },
    isRequired () {
      return this.type === 'edit' ? '必填' : '';
    },
    birthdayText () {
      return this.baseInfo.birthday
        ? moment(this.baseInfo.birthday).format('YYYY年MM月DD日')
        : '';
    },
    sexText () {
      return this.baseInfo.sex !== null ? dictMap.sex[this.baseInfo.sex] : '';
    },
    houseHoldText () {
      return this.baseInfo.houseHold.map(row => row.label).join(' ');
    },
    addressText () {
      return (
        this.baseInfo.address.map(row => row.label).join(' ') +
        (this.baseInfo.street || '')
      );
    },
    // expectedCityText () {
    //   return this.expectedWork.expectedCity.map(row => row.label).join('，');
    // },
    // expectedSalaryText () {
    //   return this.expectedWork.expectedSalary
    //     ? dictMap.expectedSalary[Number(this.expectedWork.expectedSalary)]
    //     : '';
    // },
    workTypeText () {
      return this.expectedWork.workType !== null
        ? dictMap.workType[Number(this.expectedWork.workType)]
        : '';
    },
    currentStateText () {
      return this.expectedWork.currentState !== null
        ? dictMap.currentState[Number(this.expectedWork.currentState)]
        : '';
    },
    timeToPostText () {
      return this.expectedWork.timeToPost !== null
        ? dictMap.timeToPost[Number(this.expectedWork.timeToPost)]
        : '';
    }
  },
  methods: {
    // 一次获取所有信息
    // async getAll () {
    //   tools.showProgress();
    //   const response = await Promise.all([
    //     service.getUserBaseInfo({
    //       resumeId: this.id
    //     }),
    //     service.getUserEducation({
    //       resumeId: this.id
    //     })
    //   ]);
    //   tools.hideProgress();
    //   if (response.length) {
    //     switch (response[0].code) {
    //       case 0:
    //         this.baseInfo = adapter.baseInfoAdapter(response[0].result.resumeInfo[0]);
    //         this.expectedWork = adapter.expectedWorkAdapter(
    //           response[0].result.resumeInfo[0]
    //         );
    //         this.introduction = response[0].result.resumeInfo[0].introduction || '';
    //         break;

    //       default:
    //         break;
    //     }
    //     switch (response[1].code) {
    //       case 0:
    //         this.education = response[1].result.educationExpInfo.map(row => adapter.educationAdapter(row));
    //         break;
    //       default:
    //         break;
    //     }
    //   } else {
    //     tools.toast({
    //       position: 'top',
    //       message: '简历信息获取失败'
    //     });
    //   }
    // },
    // 获取用户基础信息
    async getUserBaseInfo () {
      tools.showProgress();
      const response = await service.getUserBaseInfo({
        resumeId: this.id
      });
      tools.hideProgress();
      // console.log(JSON.stringify(response));
      switch (response.code) {
        case 0:
          this.baseInfo = adapter.baseInfoAdapter(response.result.resumeInfo[0]);
          this.expectedWork = adapter.expectedWorkAdapter(
            response.result.resumeInfo[0]
          );
          this.introduction = response.result.resumeInfo[0].introduction || '';
          // alert(this.baseInfo.houseHold[0].label);
          break;
        default:
          tools.toast({
            position: 'top',
            message: '简历信息获取失败'
          });
          break;
      }
    },

    async getEducation () {
      tools.showProgress();
      const response = await service.getUserEducation({
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.education = response.result.educationExpInfo.map(row => adapter.educationAdapter(row));
          break;
        default:
          tools.toast({
            position: 'top',
            message: '教育经历获取失败'
          });
          break;
      }
    },

    async getInternship () {
      tools.showProgress();
      const response = await service.getUserInternship({
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.internship = response.result.educationExpInfo.map(row => adapter.educationAdapter(row));
          break;
        default:
          tools.toast({
            position: 'top',
            message: '实习经历获取失败'
          });
          break;
      }
    },

    baseInfoEdit () {
      tools.openWin({
        name: 'userBaseinfo',
        url: '../win.html',
        title: '编辑基本信息',
        fname: 'userBaseinfo_f',
        furl: './userCenter/userBaseinfo.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userBaseinfo',
          baseInfo: this.baseInfo,
          id: this.id,
          callback: (ret, err) => {
            this.getUserBaseInfo();
          }
        }
      });
    },

    introductionEdit () {
      tools.openWin({
        name: 'userIntroduction',
        url: '../win.html',
        title: '编辑自我描述',
        fname: 'userIntroduction_f',
        furl: './userCenter/userIntroduction.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userIntroduction',
          introduction: this.introduction,
          id: this.id,
          callback: (ret, err) => {
            this.getUserBaseInfo();
          }
        }
      });
    },

    expectedWorkEdit () {
      // const expectedCity = {};
      // this.expectedWork.expectedCity.forEach(element => {
      //   expectedCity[element.value] = element;
      // });
      tools.openWin({
        name: 'userExpectedWork',
        url: '../win.html',
        title: '编辑期望工作',
        fname: 'userExpectedWork_f',
        furl: './userCenter/userExpectedWork.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userExpectedWork',
          expectedWork: {
            ...this.expectedWork,
            workType: dictMap.workType[this.expectedWork.workType],
            currentState: dictMap.currentState[this.expectedWork.currentState],
            timeToPost: dictMap.timeToPost[this.expectedWork.timeToPost]
            // expectedCity
          },
          id: this.id,
          callback: (ret, err) => {
            this.getUserBaseInfo();
          }
        }
      });
    },
    educationEdit () {
      tools.openWin({
        name: 'userEducationHistroy',
        url: '../win.html',
        title: '教育经历管理',
        fname: 'userEducationHistroy_f',
        furl: './userCenter/userEducationHistroy.html',
        hasLeft: 1,
        LCB: () => {
          this.getEducation();
        },
        data: {
          nameSpace: 'userEducationHistroy',
          id: this.id
        }
      });
    },
    internshipEdit () {
      tools.openWin({
        name: 'userInternshipHistroy',
        url: '../win.html',
        title: '实习经历管理',
        fname: 'userInternshipHistroy_f',
        furl: './userCenter/userInternshipHistroy.html',
        hasLeft: 1,
        LCB: () => {
          this.getInternship();
        },
        data: {
          nameSpace: 'userInternshipHistroy',
          id: this.id
        }
      });
    }
  },

  mounted () {
    if (window.api) {
      if (window.api.pageParam.nameSpace === 'resumeDetail') {
        switch (window.api.pageParam.from) {
          case 'userBaseInfo': // 创建基本信息后的回调
            this.getUserBaseInfo();
            window.api.closeWin({
              name: 'userBaseInfo'
            });
            break;
          default:
            // this.getAll();
            this.getUserBaseInfo();
            this.getEducation();
            this.getInternship();
            break;
        }
      }
    }
  }
};
</script>
<style lang="less">
.moduleBodyer {
  .mint-cell {
    .mint-cell-wrapper,
    &:last-child {
      font-size: 14px;
      background-image: none;
    }
  }
}
</style>
<style lang="less" scoped>
.infoNotice {
}
.introduction {
  padding: 15px;
  line-height: 1.8;
  color: #666;
}
.stepVertical {
  margin-top: 5px;
}
.editBtn {
  float: right;
  font-size: 14px;
  margin-top: 8px;
}
</style>
