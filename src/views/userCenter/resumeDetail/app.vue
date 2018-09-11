<template>
  <div class="content">
    <Panel title="基本信息" :label="labelText">
      <Cell title="姓名" :value="baseInfo.name"></Cell>
      <Cell title="性别" :value="sexText"></Cell>
      <Cell title="出生年月" :value="birthdayText"></Cell>
      <Cell title="户籍" :value="houseHoldText"></Cell>
      <Cell title="地址" :value="addressText"></Cell>
      <Cell title="手机号码" :value="baseInfo.phone"></Cell>
      <Cell title="电子邮箱" :value="baseInfo.email"></Cell>
      <Button
        v-if="type==='edit'"
        class="editBtn"
        slot="end"
        flat
        color="#009688"
        @click="baseInfoEdit"
      >
        <Icon left value=":icon-75bianji" />编辑
      </Button>
    </Panel>
    <Panel title="教育经历" :label="labelText">
      <StepVertical class="stepVertical" :data="education" />
    </Panel>
    <Panel title="实习经历" >
      <StepVertical class="stepVertical" :data="education" />
    </Panel>
    <Panel title="项目经验" >
      <StepVertical class="stepVertical" :data="education" />
    </Panel>
    <Panel v-if="type!=='detail' || introduction.length>0" title="自我描述">
      <Button
        v-if="type==='edit'"
        class="editBtn"
        slot="end"
        flat
        color="#009688"
        @click="introductionEdit"
      >
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <div v-if="introduction.length>0" class="introduction">
        {{introduction}}
      </div>
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
    <Panel title="期望工作" :label="labelText">
      <Button
        v-if="type==='edit'"
        class="editBtn"
        slot="end"
        flat
        color="#009688"
        @click="expectedWorkEdit"
      >
        <Icon left value=":icon-75bianji" />编辑
      </Button>
      <Cell title="期望职位" :value="expectedWork.desiredPosition"></Cell>
      <Cell title="期望月薪" :value="expectedWork.desiredPosition"></Cell>
      <Cell title="期望城市" :value="expectedCityText"></Cell>
      <Cell title="工作性质" :value="workTypeText"></Cell>
      <Cell title="当前状态" :value="currentStateText"></Cell>
      <Cell title="到岗时间" :value="timeToPostText"></Cell>
    </Panel>
  </div>
  </div>
</template>

<script>
import service from 'service';
import { Button, Icon } from 'muse-ui';
import { Cell } from 'mint-ui';
import tools from 'util/tools';
import dictMap from 'util/dictMap';
import moment from 'moment';
import Panel from 'components/Panel';
import StepVertical from 'components/StepVertical';
import SkillLine from 'components/SkillLine';

// 基础信息的适配器
function baseInfoAdapter (data) {
  return {
    title: data.title, // 简历名称
    name: data.name, // true string 真实姓名
    sex: data.sex, // true string 性别
    birthday: data.birthday * 1000, // true string生日
    // houseHold: JSON.parse(data.houseHold), // true string 籍贯
    houseHold: [], // true string 籍贯
    address: JSON.parse(data.address),
    street: data.street,
    phone: data.phone, // true string手机
    email: data.email // true string 邮箱
  };
}
export default {
  name: 'resumeDetail',
  data () {
    return {
      type: 'edit',
      id: null,
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
        expectedCity: [],
        workType: null,
        currentState: null,
        timeToPost: null
      },
      education: [
        {
          head: '2017.5-2020.2',
          title: '交通技师学院',
          info: '大专/信息系'
        },
        {
          head: '2017.5-2020.2',
          title: 'sdfsdf',
          info: '大专/信息系'
        },
        {
          head: '2017.5-2020.2',
          title: '交通技师学院',
          info: '大专/信息系'
        },
        {
          head: '2017.5-2020.2',
          title: '交通技师学院',
          info: '大专/信息系'
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
    labelText () {
      return this.type === 'edit' ? '必填' : '';
    },
    birthdayText () {
      return this.baseInfo.birthday ? moment(this.baseInfo.birthday).format('YYYY年MM月DD日') : '';
    },
    sexText () {
      return this.baseInfo.sex ? dictMap.sex[this.baseInfo.sex] : '';
    },
    houseHoldText () {
      return this.baseInfo.houseHold.map(row => row.label).join(' ');
    },
    addressText () {
      return this.baseInfo.address.map(row => row.label).join(' ') + (this.baseInfo.street || '');
    },
    expectedCityText () {
      return this.expectedWork.expectedCity.map(r => r.label).join('，');
    },
    workTypeText () {
      return this.expectedWork.workType ? dictMap.workType[Number(this.expectedWork.workType)] : '';
    },
    currentStateText () {
      return this.expectedWork.currentState ? dictMap.currentState[Number(this.expectedWork.currentState)] : '';
    },
    timeToPostText () {
      return this.expectedWork.timeToPost ? dictMap.timeToPost[Number(this.expectedWork.timeToPost)] : '';
    }
  },
  methods: {
    // 一次获取所有信息
    async getAll () {
      tools.showProgress();
      const response = await Promise.all([
        service.getUserBaseInfo({
          id: this.id
        })
      ]);
      tools.hideProgress();
      if (response.length) {
        this.baseInfo = baseInfoAdapter(response[0].result.resumeInfo[0]);
        this.introduction = response[0].result.resumeInfo[0].introduction || '';
      } else {
        tools.toast({
          position: 'top',
          message: '简历信息获取失败'
        });
      }
    },
    // 获取用户基础信息
    async getUserBaseInfo () {
      tools.showProgress();
      const response = await service.getUserBaseInfo({
        id: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.baseInfo = baseInfoAdapter(response.result.resumeInfo[0]);
          this.introduction = response.result.resumeInfo[0].introduction || '';
          break;
        default:
          tools.toast({
            position: 'top',
            message: '简历信息获取失败'
          });
          break;
      }
    },

    baseInfoEdit () {
      tools.openWin({
        name: 'userBaseinfo',
        url: '../win.html',
        title: '基本信息',
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
        title: '自我描述',
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
      tools.openWin({
        name: 'userExpectedWork',
        url: '../win.html',
        title: '期望工作',
        fname: 'userExpectedWork_f',
        furl: './userCenter/userExpectedWork.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userExpectedWork',
          expectedWork: this.expectedWork,
          id: this.id,
          callback: (ret, err) => {
            this.getUserBaseInfo();
          }
        }
      });
    }
  },

  mounted () {
    if (window.api) {
      if (window.api.pageParam.nameSpace === 'resumeDetail') {
        this.id = window.api.pageParam.id;
        this.type = window.api.pageParam.type || 'detail';
        switch (window.api.pageParam.from) {
          case 'userBaseInfo':// 创建基本信息后的回调
            this.getUserBaseInfo();
            window.api.closeWin({
              name: 'userBaseInfo'
            });
            break;
          default:
            this.getAll();
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
.infoNotice{

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
