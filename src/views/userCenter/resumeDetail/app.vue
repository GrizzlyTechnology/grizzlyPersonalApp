<template>
  <div class="content">
    <Panel title="基本信息" label="必填">
      <Cell title="姓名" :value="baseInfo.name"></Cell>
      <Cell title="性别" :value="sexText"></Cell>
      <Cell title="出生年月" :value="birthdayText"></Cell>
      <Cell title="户籍" :value="houseHoldText"></Cell>
      <Cell title="地址" :value="addressText"></Cell>
      <Cell title="手机号码" :value="baseInfo.phone"></Cell>
      <Cell title="电子邮箱" :value="baseInfo.email"></Cell>
      <Button
        v-if="type==='create'||type==='edit'"
        class="editBtn"
        slot="end"
        flat
        color="#009688"
        :ripple="false"
        @click="baseInfoEdit"
      >
        <Icon left value=":icon-75bianji" />编辑
      </Button>
    </Panel>
    <Panel title="教育经历" label="必填">
      <StepVertical class="stepVertical" :data="education" />
    </Panel>
    <Panel title="实习经历" label="必填">
      <StepVertical class="stepVertical" :data="education" />
    </Panel>
    <Panel title="项目经验" label="必填">
      <StepVertical class="stepVertical" :data="education" />
    </Panel>
    <Panel title="自我介绍" label="必填">
      <div class="introduction">自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍</div>
    </Panel>
    <Panel title="技能评价" label="必填">
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
    <Panel title="期望工作" label="必填">
      <Cell title="期望职位" value="说明文字"></Cell>
      <Cell title="期望月薪" value="说明文字"></Cell>
      <Cell title="期望城市" value="说明文字"></Cell>
      <Cell title="工作性质" value="说明文字"></Cell>
      <Cell title="当前状态" value="说明文字"></Cell>
      <Cell title="到岗时间" value="说明文字"></Cell>
    </Panel>
  </div>
  </div>
</template>

<script>
// import service from 'service';
import { Button, Icon } from 'muse-ui';
import { Cell } from 'mint-ui';
import tools from 'util/tools';
import dictMap from 'util/dictMap';
import moment from 'moment';
import Panel from 'components/Panel';
import StepVertical from 'components/StepVertical';
import SkillLine from 'components/SkillLine';

export default {
  name: 'userClass',
  data () {
    return {
      type: 'detail',
      baseInfo: {
        title: '', // 简历名称
        name: '', // true string 真实姓名
        sex: null, // true string 性别
        birthday: null, // true string生日
        houseHold: {
          province: null,
          city: null
        }, // true string 籍贯
        address: {
          province: null,
          city: null,
          street: ''
        },
        phone: '', // true string手机
        email: '' // true string 邮箱
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
      ],
      list: [
        // {
        //   id: 0,
        //   title: '我的简历1'
        // },
        // {
        //   id: 1,
        //   title: '我的简历2'
        // }
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
    birthdayText () {
      return this.baseInfo.birthday ? moment(this.baseInfo.birthday).format('YYYY年MM月DD日') : '';
    },
    sexText () {
      return this.baseInfo.sex ? dictMap.sex[this.baseInfo.sex] : '';
    },
    houseHoldText () {
      return this.baseInfo.houseHold.province && this.baseInfo.houseHold.city ? this.baseInfo.houseHold.province.label + this.baseInfo.houseHold.city.label : '';
    },
    addressText () {
      return this.baseInfo.address.province && this.baseInfo.address.city && this.baseInfo.address.street ? this.baseInfo.address.province.label + this.baseInfo.address.city.label + this.baseInfo.address.street.label : '';
    }
  },
  methods: {
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
          baseInfo: this.baseInfo
        }

      });
    }
  },
  mounted () {
    if (window.api && window.api.pageParam.nameSpace === 'resumeDetail') {
      this.type = window.api.pageParam.type;
      this.baseInfo = {...this.baseInfo, ...window.api.pageParam.resume.baseInfo};
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
