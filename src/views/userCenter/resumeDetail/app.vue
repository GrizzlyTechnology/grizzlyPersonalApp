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
      <SkillLine v-for="row in skills" :key="row.id" :title="row.label" :value="row.value" />
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
    <!-- <Panel title="作品展示" :noContent="opus.length===0" v-if="isNotDetail|| opus.length>0">
      <Button v-if="type==='edit'" class="editBtn" slot="end" flat color="#009688" @click="opusEdit">
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <Navbar v-model="tabActive" class="tabHeader">
        <TabItem id="tabContainer0">作品图片</TabItem>
        <TabItem id="tabContainer1">在线作品</TabItem>
      </Navbar>
      <TabContainer v-model="tabActive" :swipeable="true">
        <TabContainerItem id="tabContainer0">
          <div v-if="opusPic.length===0" class="infoNotice">
            暂无作品图片
          </div>
          <div class="picList">
            <div class="picCon" v-for="row in opusPic" :key="row.id">
              <div class="con" :style="{backgroundImage:'url('+row.url+')'}" />
              <div class="picTitle">{{row.title}}</div>
            </div>
          </div>
        </TabContainerItem>
        <TabContainerItem id="tabContainer1">
          <div v-if="opusOnline.length===0" class="infoNotice">
            暂无在线作品
          </div>
          <Cell v-for="row in opusOnline" :key="row.id" class="opus">
            <div @click="openWebPage(row)" class="opusRow">
              <span class="mint-cell-text">{{row.title}}</span>
              <span class="mint-cell-label">{{row.url}}</span>
            </div>
            <i class="mu-icon icon-right isLink" />
          </Cell>
        </TabContainerItem>
      </TabContainer>
      <div slot="info">
        暂无作品展示
      </div>
    </Panel> -->
    <Panel title="荣誉展示" :noContent="honor.length===0" v-if="isNotDetail|| honor.length>0">
      <Button v-if="type==='edit'" class="editBtn" slot="end" flat color="#009688" @click="honorEdit">
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <div :key="row.id" v-for="row in honor">
        <div class="listTitle">
          {{row.title}}
        </div>
        <div class="listDate">
          {{row.honorDateText}}
        </div>
        <div class="picList">
          <div class="picCon" v-for="(file,index) in row.reslist" :key="file.url">
            <div class="con" @click="imagesPopupOpen(row.reslist,index, row.desc)" :style="{backgroundImage:'url('+file.url+')'}" />
          </div>
        </div>
      </div>
      <div slot="info">
        暂无荣誉展示
      </div>
    </Panel>
    <ImagesPopup ref="imagesPopup" :urlList="urlList" :index="urlListIndex" :description="imagesDesc"></ImagesPopup>
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
import { Cell, TabContainer, TabContainerItem, Navbar, TabItem } from 'mint-ui';
import Panel from 'components/Panel';
import StepVertical from 'components/StepVertical';
import SkillLine from 'components/SkillLine';
import ImagesPopup from 'components/ImagesPopup';

export default {
  data () {
    return {
      urlList: [],
      imagesDesc: {},
      urlListIndex: 0,
      tabActive: 'tabContainer0',
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
      opus: [],
      honor: []
    };
  },
  components: {
    Button,
    Cell,
    Panel,
    StepVertical,
    SkillLine,
    Icon,
    TabContainer,
    TabContainerItem,
    Navbar,
    TabItem,
    ImagesPopup
  },
  computed: {
    opusPic () {
      return this.opus.filter(r => {
        if (r.type === 0) {
          return r;
        }
      });
    },
    opusOnline () {
      return this.opus.filter(r => {
        if (r.type === 1) {
          return r;
        }
      });
    },
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
      return this.expectedWork.workType || this.expectedWork.workType === 0
        ? dictMap.workType[Number(this.expectedWork.workType)]
        : '';
    },
    currentStateText () {
      return this.expectedWork.currentState ||
        this.expectedWork.currentState === 0
        ? dictMap.currentState[Number(this.expectedWork.currentState)]
        : '';
    },
    timeToPostText () {
      return this.expectedWork.timeToPost || this.expectedWork.timeToPost === 0
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
      console.log(JSON.stringify(response));
      switch (response.code) {
        case 0:
          this.baseInfo = adapter.baseInfoAdapter(
            response.result.resumeInfo[0]
          );
          this.expectedWork = adapter.expectedWorkAdapter(
            response.result.resumeInfo[0]
          );
          this.introduction = response.result.resumeInfo[0].introduction || '';
          // if (response.result.resumeInfo[0].skills) {
          //   this.skills = JSON.parse(response.result.resumeInfo[0].skills);
          // }
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
      // console.log('resumeId:' + this.id);
      // tools.showProgress();
      const response = await service.getUserEducation({
        resumeId: this.id
      });
      // tools.hideProgress();
      // console.log(JSON.stringify(response));
      switch (response.code) {
        case 0:
          this.education = response.result.educationExpInfo
            ? response.result.educationExpInfo.map(row =>
              adapter.educationAdapter(row)
            )
            : [];
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
      // tools.showProgress();
      const response = await service.getUserInternship({
        resumeId: this.id
      });
      // tools.hideProgress();
      switch (response.code) {
        case 0:
          this.internship = response.result.internshipExpInfo
            ? response.result.internshipExpInfo.map(row =>
              adapter.internshipAdapter(row)
            )
            : [];
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
      // tools.showProgress();
      const response = await service.getUserProject({
        resumeId: this.id
      });
      // tools.hideProgress();
      // console.log(JSON.stringify(response));
      switch (response.code) {
        case 0:
          this.project = response.result.projectExpInfo
            ? response.result.projectExpInfo.map(row =>
              adapter.projectAdapter(row)
            )
            : [];
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
      // tools.showProgress();
      const response = await service.getUserJob({
        resumeId: this.id
      });
      // tools.hideProgress();
      switch (response.code) {
        case 0:
          this.job = response.result.jobExpInfo
            ? response.result.jobExpInfo.map(row => adapter.jobAdapter(row))
            : [];
          break;
        default:
          tools.toast({
            position: 'top',
            message: '工作经验获取失败'
          });
          break;
      }
    },

    async getSkill () {
      // tools.showProgress();
      const response = await service.getUserSkill({
        resumeId: this.id
      });
      // tools.hideProgress();
      switch (response.code) {
        case 0:
          this.skills = response.result.skillsInfo
            ? response.result.skillsInfo.map(row => adapter.skillAdapter(row))
            : [];
          break;
        default:
          tools.toast({
            position: 'top',
            message: '技能评价获取失败'
          });
          break;
      }
    },
    async getOpus () {
      // tools.showProgress();
      const response = await service.getUserOpus({
        resumeId: this.id
      });
      // tools.hideProgress();
      switch (response.code) {
        case 0:
          this.opus = response.result.opusInfo ? response.result.opusInfo : [];
          break;
        default:
          tools.toast({
            position: 'top',
            message: '作品列表获取失败'
          });
          break;
      }
    },
    async getHonor () {
      // tools.showProgress();
      const response = await service.getUserHonor({
        resumeId: this.id
      });
      // tools.hideProgress();
      switch (response.code) {
        case 0:
          this.honor = response.result.honorInfo ? response.result.honorInfo.map(r => adapter.honorAdapter(r)) : [];
          break;
        default:
          tools.toast({
            position: 'top',
            message: '荣誉列表获取失败'
          });
          break;
      }
    },
    openWebPage (data) {
      tools.openWebPage(data.url);
    },

    baseInfoEdit () {
      tools.openWin({
        name: 'userBaseinfo',
        url: '../win.html',
        title: '编辑基本信息',
        fname: 'userBaseinfo_f',
        furl: './userCenter/userBaseInfo.html',
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
          this.getSkill();
        },
        data: {
          nameSpace: 'userSkills',
          id: this.id
        }
      });
    },

    opusEdit () {
      tools.openWin({
        name: 'userOpus',
        url: '../win.html',
        title: '作品展示管理',
        fname: 'userOpus_f',
        furl: './userCenter/userOpus.html',
        hasLeft: 1,
        LCB: () => {
          this.getOpus();
        },
        data: {
          nameSpace: 'userSkills',
          id: this.id
        }
      });
    },

    honorEdit () {
      tools.openWin({
        name: 'userHonor',
        url: '../win.html',
        title: '荣誉展示管理',
        fname: 'userHonor_f',
        furl: './userCenter/userHonor.html',
        hasLeft: 1,
        LCB: () => {
          this.getHonor();
        },
        data: {
          nameSpace: 'userHonor',
          id: this.id
        }
      });
    },

    imagesPopupOpen (list, index, description) {
      this.urlList = list.map((r, i) => {
        this.imagesDesc[i] = description;
        return r.url;
      });
      this.urlListIndex = index;
      this.$refs.imagesPopup.open();
    }
  },

  mounted () {
    if (window.api) {
      if (window.api.pageParam.nameSpace === 'resumeDetail') {
        switch (window.api.pageParam.from) {
          case 'userBaseInfo': // 创建基本信息后的回调
            this.getUserBaseInfo();
            // window.api.closeWin({
            //   name: 'userBaseInfo'
            // });
            break;
          default:
            // this.getAll();
            this.getUserBaseInfo();
            this.getEducation();
            this.getInternship();
            this.getProject();
            this.getJob();
            this.getSkill();
            // this.getOpus();
            // this.getHonor();
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
  .mint-cell-text {
    color: #333;
    .ell();
    display: block;
    width: 90%;
  }
  .mint-cell-label {
    .ell();
    width: 90%;
  }
}
.tabHeader {
  .mint-tab-item-label {
    color: #666;
    font-size: 14px;
  }
  .is-selected {
    .mint-tab-item-label {
      color: @baseColor;
    }
  }
  .mint-tab-item {
    border-bottom: 1px solid #ddd;
  }
  .mint-tab-item.is-selected {
    border-bottom: 1px solid @baseColor;
    margin-bottom: 0;
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
.infoNotice {
  overflow: hidden;
  background-color: #e4f2fb;
  padding: 20px 15px;
  text-align: center;
  color: #a2d4f7;
}
.picList {
  font-size: 0;
  margin: -5px;
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
  .picTitle {
    position: absolute;
    z-index: 1;
    color: #fff;
    bottom: 5px;
    left: 5px;
    right: 5px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    padding-left: 5px;
    line-height: 30px;
  }
}
.listTitle {
  padding: 10px 10px 0;
  font-size: 14px;
}
.listDate {
  font-size: 14px;
  padding: 0 10px 10px;
  color: #999;
}
</style>
