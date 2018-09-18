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
    <Panel title="项目经验" :noContent="project.length===0" v-if="isNotDetail || project.length>0">
      <Button v-if="type==='edit'" class="editBtn" slot="end" flat color="#009688" @click="projectEdit">
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <StepVertical class="stepVertical" :data="project" />
      <div slot="info">
        暂无项目经验
      </div>
    </Panel>
    <Panel title="工作经历" :noContent="job.length===0" v-if="isNotDetail || job.length>0">
      <Button v-if="type==='edit'" class="editBtn" slot="end" flat color="#009688" @click="jobEdit">
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <StepVertical class="stepVertical" :data="job" />
      <div slot="info">
        暂无工作经历
      </div>
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

    <Panel title="技能评价" :noContent="skills.length===0" v-if="isNotDetail|| skills.length>0">
      <Button v-if="type==='edit'" class="editBtn" slot="end" flat color="#009688" @click="skillsEdit">
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <SkillLine v-for="row in skills" :key="row.label" :title="row.label" :value="row.value" />
      <div slot="info">
        暂无技能评价
      </div>
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
    <Panel title="作品展示" :noContent="opus.length===0" v-if="isNotDetail|| opus.length>0">
      <Button v-if="type==='edit'" class="editBtn" slot="end" flat color="#009688" @click="opusEdit">
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <Cell v-for="row in opus" :key="row.id" class="opus">
        <div @click="openWebPage(row)" class="opusRow">
          <span class="mint-cell-text">{{row.title}}</span>
          <span class="mint-cell-label">{{row.url}}</span>
        </div>
        <i class="mu-icon icon-right isLink" />
      </Cell>
      <div slot="info">
        暂无作品展示
      </div>
    </Panel>
  </div>
  </div>
</template>

<script>
import moment from 'moment';
// import isJson from 'is-json';

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
      internship: [],
      project: [],
      job: [],
      skills: [],
      opus: [
        {
          id: 0,
          uid: 0,
          title: '作品名',
          url: 'www.baidu.com'
        },
        {
          id: 1,
          uid: 0,
          title: '作品名',
          url: 'www.baidu.com'
        }
      ]
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
          this.baseInfo = adapter.baseInfoAdapter(
            response.result.resumeInfo[0]
          );
          this.expectedWork = adapter.expectedWorkAdapter(
            response.result.resumeInfo[0]
          );
          this.introduction = response.result.resumeInfo[0].introduction || '';
          if (response.result.resumeInfo[0].skills) {
            this.skills = JSON.parse(response.result.resumeInfo[0].skills);
          }
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
      console.log('resumeId:' + this.id);
      tools.showProgress();
      const response = await service.getUserEducation({
        resumeId: this.id
      });
      tools.hideProgress();
      console.log(JSON.stringify(response));
      switch (response.code) {
        case 0:
          this.education = response.result.educationExpInfo.map(row =>
            adapter.educationAdapter(row)
          );
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
          this.internship = response.result.internshipExpInfo.map(row =>
            adapter.internshipAdapter(row)
          );
          break;
        default:
          tools.toast({
            position: 'top',
            message: '实习经历获取失败'
          });
          break;
      }
    },

    async getProject () {
      tools.showProgress();
      const response = await service.getUserProject({
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.project = response.result.projectExpInfo.map(row =>
            adapter.projectAdapter(row)
          );
          break;
        default:
          tools.toast({
            position: 'top',
            message: '项目经验获取失败'
          });
          break;
      }
    },

    async getJob () {
      tools.showProgress();
      const response = await service.getUserJob({
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.job = response.result.jobExpInfo.map(row =>
            adapter.jobAdapter(row)
          );
          break;
        default:
          tools.toast({
            position: 'top',
            message: '工作经验获取失败'
          });
          break;
      }
    },
    openWebPage (data) {
      window.api.openApp({
        androidPkg: 'android.intent.action.VIEW',
        uri: data.url
      }, function (ret, err) {
        console.log(JSON.stringify(ret));
      });
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
    },
    projectEdit () {
      tools.openWin({
        name: 'userProjectHistroy',
        url: '../win.html',
        title: '项目经验管理',
        fname: 'userProjectHistroy_f',
        furl: './userCenter/userProjectHistroy.html',
        hasLeft: 1,
        LCB: () => {
          this.getProject();
        },
        data: {
          nameSpace: 'userProjectHistroy',
          id: this.id
        }
      });
    },
    jobEdit () {
      tools.openWin({
        name: 'userJobHistroy',
        url: '../win.html',
        title: '工作经历管理',
        fname: 'userJobHistroy_f',
        furl: './userCenter/userJobHistroy.html',
        hasLeft: 1,
        LCB: () => {
          this.getJob();
        },
        data: {
          nameSpace: 'userJobHistroy',
          id: this.id
        }
      });
    },
    skillsEdit () {
      tools.openWin({
        name: 'userSkills',
        url: '../win.html',
        title: '技能评价管理',
        fname: 'userSkills_f',
        furl: './userCenter/userSkills.html',
        hasLeft: 1,
        LCB: () => {
          this.getUserBaseInfo();
        },
        data: {
          nameSpace: 'userSkills',
          id: this.id,
          skills: this.skills
        }
      });
    },
    opusEdit () {
      tools.openWin({
        name: 'userSkills',
        url: '../win.html',
        title: '技能评价管理',
        fname: 'userSkills_f',
        furl: './userCenter/userSkills.html',
        hasLeft: 1,
        LCB: () => {
          this.getUserBaseInfo();
        },
        data: {
          nameSpace: 'userSkills',
          id: this.id,
          skills: this.skills
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
            this.getProject();
            this.getJob();
            break;
        }
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.moduleBodyer {
  .mint-cell {
    .mint-cell-wrapper,
    &:last-child {
      font-size: 14px;
      background-image: none;
    }
  }
}
.opus {
  .mint-cell-allow-right {
    display: none;
  }
  .mint-cell-value {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    &:active {
      background-color: #eee;
    }
  }
  .mint-cell-text{
    color: #333;
    .ell();
    display: block;
    width: 90%;
  }
  .mint-cell-label{
    .ell();
    width: 90%;
  }
}
</style>
<style lang="less" scoped>
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
.opus {
  height: 56px;
}
.isLink {
  position: absolute;
  top: 19px;
  font-size: 16px;
  right: 15px;
}
.opusRow {
   position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 14px 0 0 10px;
}
</style>
