<template>
  <div>
    <Container>
      <Row>
        <Col span="12">
        <div class="grid-cell" @click='internshipAgreement'><span class='cBlue'><i class='iconfont icon-xieyi'></i></span>实习协议</div>
        </Col>
        <Col span="12">
        <div class="grid-cell" @click='internshipAssessment'><span class='cRed'><i class='iconfont icon-kaohepingjia'></i></span>实习考核</div>
        </Col>
        <Col span="12">
        <div class="grid-cell" @click='internshipPlan'><span class='cYellow'><i class='iconfont icon-jihua'></i></span>实习计划</div>
        </Col>
        <Col span="12">
        <div class="grid-cell" @click='internshipReport'><span class='cPurple'><i class='iconfont icon-baogao'></i></span>实习报告</div>
        </Col>
        <Col span="12">
        <div class="grid-cell" @click='internshipLog'><span class='cLightGreen'><i class='iconfont icon-rizhi'></i></span>实习日志 </div>
        </Col>
        <Col span="12">
        <div class="grid-cell" @click='internshipSummary'><span class='cBrown'><i class='iconfont icon-zongjie'></i></span>实习总结</div>
        </Col>
      </Row>
    </Container>

  </div>
</template>

<script>
import { Row, Col, Container } from "muse-ui/lib/Grid";
import tool from "util/tools";
export default {
  data() {
    return {
      companyId: window.api.pageParam.companyId
    };
  },
  components: {
    Row,
    Col,
    Container
  },
  methods: {
    async internshipAgreement() {
      const response = await service.internshipAgreement({
        companyId: companyId
      });
      switch (response.code) {
        case 0:
          tool.openWin({
            name: "agreementDetails",
            url: "../win.html",
            title: "实习协议",
            fname: "agreementDetails_f",
            furl: "./application/agreementDetails.html",
            hasLeft: 1
          });
          break;
        default:
          Toast({
            position: "top",
            message: "加载失败，请稍后重试！！"
          });
          break;
      }
    },
    internshipAssessment() {
      tool.openWin({
        name: "internshipAssessment",
        url: "../win.html",
        title: "实习考核",
        fname: "internshipAssessment_f",
        furl: "./application/internshipAssessment.html",
        hasLeft: 1
      });
    },
    internshipPlan() {
      tool.openWin({
        name: "internshipPlan",
        url: "../win.html",
        title: "实习计划",
        fname: "internshipPlan_f",
        furl: "./application/internshipPlan.html",
        hasLeft: 1
      });
    },
    internshipReport() {
      tool.openWin({
        name: "internshipReport",
        url: "../win.html",
        title: "实习报告",
        fname: "internshipReport_f",
        furl: "./application/internshipReport.html",
        hasLeft: 1
      });
    },
    internshipLog() {
      tool.openWin({
        name: "internshipLog",
        url: "../win.html",
        title: "实习日志",
        fname: "internshipLog_f",
        furl: "./application/internshipLog.html",
        hasLeft: 1
      });
    },
    internshipSummary() {
      tool.openWin({
        name: "internshipSummary",
        url: "../win.html",
        title: "实习总结",
        fname: "internshipSummary_f",
        furl: "./application/internshipSummary.html",
        hasLeft: 1
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.mu-card {
  box-shadow: none;
}

.container {
  background: #fff;
}

.grid-cell {
  display: flex;
  padding: 10px 0;
  align-items: center;
  color: #333;
}

.col {
  border-bottom: 1px solid #f5f5f5;
}

.grid-cell span {
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-right: 15px;
}

.grid-cell .iconfont {
  font-size: 22px;
  color: #fff;
}

.cBlue {
  background: #a0d2f7;
}

.cYellow {
  background: #f8dc1c;
}

.cPurple {
  background: #eb8af7;
}

.cLightGreen {
  background: #68dcb7;
}

.cRed {
  background: #f9876c;
}

.cBrown {
  background: #a45a49;
}
</style>
