<template>
    <Container>
        <Button full-width large class="buttom" color="red" @click="submit">退出登录</Button>
    </Container>
</template>

<script>
import tool from "util/tools";
import { Container, Row, Col, Flex } from "muse-ui/lib/Grid";
import { Button } from "muse-ui";
import Paper from "muse-ui/lib/Paper";

export default {
  data() {
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
    submit() {
      tool.clearStorage("token");
      window.api.sendEvent({
        name: "logout"
      });
      window.api.closeToWin({
        name: "root",
        animation: {
          type: "flip",
          subType: "from_bottom",
          duration: 500
        }
      });
    }
  },
  mounted() {}
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
