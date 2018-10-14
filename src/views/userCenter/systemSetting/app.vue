<template>
  <Container>
    <Button full-width large class="buttom" color="red" @click="logout">退出登录</Button>
  </Container>
</template>

<script>
import tools from 'util/tools';
import service from 'service';
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
      async query () {
      tools.showProgress();
      const response = await service.logout();
      tools.hideProgress();
      switch (response.code) {
        case 0:
            tools.clearStorage('token');
            tools.openWin({
                name: 'login',
                url: '../win.html',
                title: '登录',
                fname: 'login_f',
                furl: './index/login.html',
                data:{
                    comefrom:'systemSet'
                }
            });
        break;
        default:
        tools.toast({
            position: 'top',
            message: response.message,
          });
          break;
      }
      },
    logout () {
      this.query();
    }
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.container {
  padding: 20px;
  .buttom {
    color: @grayFont;
    font-size: h3;
  }
}
</style>
