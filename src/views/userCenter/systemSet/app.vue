<template>
    <Container>
        <Button full-width large class="buttom" color="red" @click="submit">退出登录</Button>
        <Button full-width large class="buttom" color="red" @click="studentInfo">完善学生信息</Button>
    </Container>
</template>

<script>
import tool from 'util/tools';
import { Container, Row, Col, Flex } from 'muse-ui/lib/Grid';
import { Button } from 'muse-ui';
import Paper from 'muse-ui/lib/Paper';

export default {
  data () {
    return {};
  },
  components: {
    Container,
    Row,
    Col,
    Flex,
    Paper,
    Button
  },
  methods: {
    submit () {
      tool.clearStorage('token');
      window.api.sendEvent({
        name: 'event'
      });
      window.api.closeToWin({
        name: 'root'
      });
    },
    studentInfo () {
      tool.openWin({
        name: 'userArea',
        url: '../win.html',
        title: '选择地区',
        fname: 'userArea_f',
        furl: './userCenter/userArea.html'
      });
    }
  },
  mounted () {

  }
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.container {
  padding: 20px;
  .buttom {
    color: @grayFont;
    font-size: h3
  }
}
</style>
