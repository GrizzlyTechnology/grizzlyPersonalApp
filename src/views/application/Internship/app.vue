<template>
  <div>
    <SubHeader>
      目前在职：
    </SubHeader>
    <Card>
      <CardHeader title="大灰熊科技有限公司" sub-title="技术部 研发组"></CardHeader>
    </Card>
    <Container>
      <Row>
        <Col span="6">
        <div class="grid-cell"><span class='cGreen'><i class='iconfont icon-jianli'></i></span>实习履历</div>
        </Col>
        <Col span="6">
        <div class="grid-cell"><span class='cOrange'><i class='iconfont icon-details'></i></span>学习履历</div>
        </Col>
        <Col span="6">
        <div class="grid-cell" @click='internshipAgreement'><span class='cBlue'><i class='iconfont icon-xieyi'></i></span>实习协议</div>
        </Col>
        <Col span="6">
        <div class="grid-cell"><span class='cRed'><i class='iconfont icon-kaohepingjia'></i></span>实习考核</div>
        </Col>
        <Col span="6">
        <div class="grid-cell"><span class='cYellow'><i class='iconfont icon-jihua'></i></span>实习计划</div>
        </Col>
        <Col span="6">
        <div class="grid-cell"><span class='cPurple'><i class='iconfont icon-baogao'></i></span>实习报告</div>
        </Col>
        <Col span="6">
        <div class="grid-cell"><span class='cLightGreen'><i class='iconfont icon-rizhi'></i></span>实习日志 </div>
        </Col>
        <Col span="6">
        <div class="grid-cell"><span class='cBrown'><i class='iconfont icon-zongjie'></i></span>实习总结</div>
        </Col>
      </Row>
    </Container>

  </div>
</template>

<script>
import { SubHeader, Card } from 'muse-ui';
import { CardHeader } from 'muse-ui/lib/Card';
import { Row, Col, Container } from 'muse-ui/lib/Grid';
import tool from 'util/tools';
export default {
  data () {
    return {};
  },
  components: {
    SubHeader,
    Card,
    CardHeader,
    Row,
    Col,
    Container
  },
  methods: {
    internshipAgreement () {
      tool.openWin({
        name: 'internshipAgreement',
        url: '../win.html',
        title: '实习协议',
        fname: 'internshipAgreement_f',
        furl: './application/internshipAgreement.html',
        hasLeft: 1
      });
    }
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.mu-card {
  box-shadow: none;
}

.container{
  background: #fff;
  margin-top:15px ;
}

.grid-cell{
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
}

.col{
  border-bottom: 1px solid #f5f5f5;
}

.col:nth-child(odd){
border-right: 1px solid #f5f5f5;
}

.grid-cell span{
 display: flex;
width: 40px;
height: 40px;
justify-content: center;
align-items: center;
border-radius: 8px;
margin-right: 5px;
}

.grid-cell .iconfont{
font-size: 22px;
color: #fff;
}

.cOrange{
  background: #fbae44;
}

.cGreen{
  background: #4fca6f;
}

.cBlue{
   background: #a0d2f7;
}

.cYellow{
   background: #f8dc1c;
}

.cPurple{
  background: #eb8af7;
}

.cLightGreen{
  background: #68dcb7;
}

.cRed{
  background: #f9876c;
}

.cBrown{
  background:#a45a49;
}

</style>
