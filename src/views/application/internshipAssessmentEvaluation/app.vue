<template>
  <div class="content">
    <div class="bodyer">
      <div class='companyIdentification'>
        <div class="ucCell jd">
          <div class="ucCellCon">
            <span class="ucCellTitle">单位鉴定：</span>
            <p class="ucCellLabel">{{companyIdentification}}</p>
          </div>
        </div>
        <Cell class="ucCell">
          <div class="ucCellCon">
            <span class="ucCellTitle">考核成绩</span>
            <span class="ucCellLabel">{{testScores}}</span>
          </div>
        </Cell>
      </div>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">实习单位</span>
          <span class="ucCellLabel">{{internshipCompanyInfo.companyName}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">实习时间</span>
          <span class="ucCellLabel">{{internshipStart}} 至 {{internshipEnd}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">实习部门</span>
          <span class="ucCellLabel">{{internshipCompanyInfo.department}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">实习岗位</span>
          <span class="ucCellLabel">{{internshipCompanyInfo.group}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">姓名</span>
          <span class="ucCellLabel">{{internshipCompanyInfo.name}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">性别</span>
          <span class="ucCellLabel">{{internshipCompanyInfo.sex===0?'女':'男'}}</span>
        </div>
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon">
          <span class="ucCellTitle">班级</span>
          <span class="ucCellLabel">{{internshipCompanyInfo.class}}</span>
        </div>
      </Cell>
      <div class="ucCell jd">
        <div class="ucCellCon">
          <span class="ucCellTitle">自我鉴定：</span>
          <p class="ucCellLabel">{{workContent}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from 'service';
import { Toast, Cell } from 'mint-ui';
import tool from 'util/tools';
export default {
  data () {
    return {
      companyId: window.api ? window.api.pageParam.companyId : 'wwww',
      internshipStart: '',
      internshipEnd: '',
      workContent: '',
      companyIdentification: '',
      testScores: '',
      internshipCompanyInfo: {
        companyName: window.api ? window.api.pageParam.companyName : '',
        department: window.api ? window.api.pageParam.department : '',
        group: window.api ? window.api.pageParam.group : '',
        name: '',
        class: '',
        sex: ''
      }
    };
  },
  components: {
    Cell
  },
  computed: {},
  methods: {
    async getStudentInfoData () {
      tool.showProgress();
      const response = await service.getStudentInfo({});
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.internshipCompanyInfo.name = response.result.studentInfo.name;
          this.internshipCompanyInfo.sex = response.result.studentInfo.sex;
          this.internshipCompanyInfo.class =
            response.result.studentInfo.majorname +
            '系' +
            response.result.studentInfo.classname;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    },
    async internshipAssessmentDetail () {
      tool.showProgress();
      const response = await service.getInternshipAssessmentDetail({
        enterpriseid: this.companyId
      });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.internshipStart = response.result.internshipStart;
          this.internshipEnd = response.result.internshipEnd;
          this.workContent = response.result.workContent;
          this.companyIdentification = response.result.companyIdentification;
          this.testScores = response.result.testScores;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    }
  },
  mounted () {
    this.getStudentInfoData();
    this.internshipAssessmentDetail();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.content {
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bodyer {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
  font-size: 16px;
  .ucCellCon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: auto;
    .ucCellTitle {
      line-height: 56px;
      color: #000;
      margin-left: 15px;
    }
    .ucCellLabel {
      float: right;
      line-height: 56px;
      color: #666;
      margin-right: 15px;
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

.jd.ucCell {
   .ucCellLabel {
    line-height: 28px;
    padding-left: 15px;
    float: none;
    margin:0px;
  }
   .mint-cell-wrapper {
     height:auto;
  }
}

.companyIdentification{
  margin-bottom: 10px;
}
</style>
