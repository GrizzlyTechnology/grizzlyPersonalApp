<template>
  <div>
    <Container>
      <Row>
        <Col span="12">
        <div class="grid-cell" @click='internshipAgreement'><span class='cBlue'><i class='iconfont icon-xieyi'></i></span>实习协议</div>

        </Col>
        <Col span="12">
        <div class="grid-cell"><span class='cRed'><i class='iconfont icon-kaohepingjia'></i></span>实习考核</div>
        </Col>
        <Col span="12">
        <div class="grid-cell"><span class='cYellow'><i class='iconfont icon-jihua'></i></span>实习计划</div>
        </Col>
        <Col span="12">
        <div class="grid-cell"><span class='cPurple'><i class='iconfont icon-baogao'></i></span>实习报告</div>
        </Col>
        <Col span="12">
        <div class="grid-cell"><span class='cLightGreen'><i class='iconfont icon-rizhi'></i></span>实习日志 </div>
        </Col>
        <Col span="12">
        <div class="grid-cell"><span class='cBrown'><i class='iconfont icon-zongjie'></i></span>实习总结</div>
        </Col>
      </Row>
    </Container>

  </div>
</template>

<script>
// import { } from 'muse-ui';
// import { CardHeader } from 'muse-ui/lib/Card';
import { Row, Col, Container } from 'muse-ui/lib/Grid';
import tool from 'util/tools';
export default {
  data () {
    return {};
  },
  components: {
    Row,
    Col,
    Container
  },
  methods: {
    internshipAgreement () {
      tool.openWin({
        name: 'agreementDetails',
        url: '../win.html',
        title: '实习协议',
        fname: 'agreementDetails_f',
        furl: './application/agreementDetails.html',
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
}

.grid-cell{
  display: flex;
  padding: 10px 0;
  align-items: center;
  color: #333;
}

.col{
  border-bottom: 1px solid #f5f5f5;
}

.grid-cell span{
 display: flex;
width: 40px;
height: 40px;
justify-content: center;
align-items: center;
border-radius: 8px;
margin-right: 15px;
}

.grid-cell .iconfont{
font-size: 22px;
color: #fff;
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
