<template>
  <Container>
    <Stepper :active-step="0" orientation="vertical" :linear="false">
      <Step>
        <StepLabel>
          <Card>
            <p>2011.10—至今</p>
            <CardHeader title="大灰熊科技有限公司" sub-title="技术部 研发组"></CardHeader>
          </Card>
          <Icon class='iconfont icon-jinru' right size="12" value=":mudocs-icon-communication-voicemail" color="#000"></Icon>
        </StepLabel>
      </Step>
      <Step>
        <StepLabel>
          <Card>
            <p>2011.05—2015.02</p>
            <CardHeader title="大灰熊科技有限公司" sub-title="技术部 研发组"></CardHeader>
          </Card>
           <Icon class='iconfont icon-jinru' right size="12" value=":mudocs-icon-communication-voicemail" color="#000"></Icon>
        </StepLabel>
      </Step>
      <Step>
        <StepLabel>
          <Card>
            <p>1999.05—2011.04</p>
            <CardHeader title="大灰熊科技有限公司" sub-title="技术部 研发组"></CardHeader>
          </Card>
           <Icon class='iconfont icon-jinru' right size="12" value=":mudocs-icon-communication-voicemail" color="#000"></Icon>
        </StepLabel>
      </Step>
    </Stepper>
    <!-- <SubHeader>
      目前在职：
    </SubHeader>
    <Card>
      <CardHeader title="大灰熊科技有限公司" sub-title="技术部 研发组"></CardHeader>
    </Card>
    <Card>
      <CardHeader title="大灰熊科技有限公司" sub-title="技术部 研发组"></CardHeader>
    </Card> -->
  </Container>
</template>

<script>
import { SubHeader, Card, Icon } from 'muse-ui';
import { CardHeader } from 'muse-ui/lib/Card';
import { Stepper, Step, StepLabel } from 'muse-ui/lib/Stepper';
import { Container } from 'muse-ui/lib/Grid';
// import tool from 'util/tools';
export default {
  data () {
    return {};
  },
  components: {
    Container,
    SubHeader,
    Card,
    CardHeader,
    Stepper,
    Step,
    StepLabel,
    Icon
  },
  methods: {
    // internshipAgreement () {
    //   tool.openWin({
    //     name: 'internshipAgreement',
    //     url: '../win.html',
    //     title: '实习协议',
    //     fname: 'internshipAgreement_f',
    //     furl: './application/internshipAgreement.html',
    //     hasLeft: 1
    //   });
    // }
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.mu-card {
  box-shadow: none;
  background: none;
  width: 100%;
}

.mu-card-header {
  padding: 0;
}

.mu-card p {
  margin: 0;
  font-size: 12px;
}

.container {
  background: #fff;
  padding: 30px 0;
}

.grid-cell {
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
}

.col {
  border-bottom: 1px solid #f5f5f5;
}

.col:nth-child(odd) {
  border-right: 1px solid #f5f5f5;
}

.grid-cell span {
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-right: 5px;
}

.grid-cell .iconfont {
  font-size: 22px;
  color: #fff;
}

.cOrange {
  background: #fbae44;
}

.cGreen {
  background: #4fca6f;
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
