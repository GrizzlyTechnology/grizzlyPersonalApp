<template>
  <div>
    <Container>
      <div><span class='cRed'>6月3日</span> 至 <span class='cRed'>6月10日</span> 周志还未提交，<Button color="error" @click="releaseLog">去提交</Button></div>
      <Stepper :active-step="0" orientation="vertical" :linear="false">
        <template v-for='log in logs'>
          <Step :key='log.id'>
            <StepLabel class='comStepper' @click='logDetail'>
              <Card>
                <p>{{log.cycle}}</p>
                <CardHeader :title="log.content.slice(0,18)"></CardHeader>
              </Card>
              <Icon class='iconfont icon-jinru' right size="12" value=":mudocs-icon-communication-voicemail"></Icon>
            </StepLabel>
          </Step>
        </template>
      </Stepper>
    </Container>
    <div class='p16 fixBox whiteBg'>
      <Button color="primary" full-width class='deliveryButton' @click='releaseLog'>发布日志</Button>
    </div>
  </div>

</template>
<script>
import { Button, Card, Icon } from "muse-ui";
import { Container } from "muse-ui/lib/Grid";
import { CardHeader } from "muse-ui/lib/Card";
import { Stepper, Step, StepLabel } from "muse-ui/lib/Stepper";
import tool from "util/tools";
export default {
  data() {
    return {
      logs: [
        {
          id: 1,
          cycle: "2015.03——至今",
          content:
            "本周在师傅指导下，学会留言板本周在师傅指导下，学会留言板本周在师傅指导下，学会留言板本周在师傅指导下，学会留言板本周在师傅指导下，学会留言板"
        },
        {
          id: 2,
          cycle: "2011.05—2015.02",
          content: "本周在师傅指导下，学会留言板"
        },
        {
          id: 3,
          cycle: "1999.05—2011.04",
          content: "本周在师傅指导下，学会留言板"
        }
      ]
    };
  },
  components: {
    Container,
    Button,
    Card,
    CardHeader,
    Stepper,
    Step,
    StepLabel,
    Icon
  },
  methods: {
    releaseLog() {
      tool.openWin({
        name: "releaseLog",
        url: "../win.html",
        title: "实习日志",
        fname: "releaseLog_f",
        furl: "./application/releaseLog.html",
        hasLeft: 1
      });
    },
    logDetail() {
      tool.openWin({
        name: "logDetail",
        url: "../win.html",
        title: "日志详情",
        fname: "logDetail_f",
        furl: "./application/logDetail.html",
        hasLeft: 1
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.container {
  background: #fff;
  padding: 25px 15px 15px;
}

.cRed {
  color: red;
}

.mu-card {
  box-shadow: none;
  background: none;
  width: 100%;
}
.mu-stepper {
  margin-top: 30px;
}

.mu-card-header,
.mu-card-header-title {
  padding: 0;
}

.mu-card p {
  margin: 0;
  font-size: 12px;
}

.mu-step-label.completed .mu-step-label-circle,
.mu-step-label.active .mu-step-label-circle {
  background: #009688;
}

.mu-step-label.completed .status,
.mu-step-label.active .status {
  color: #009688;
}

.whiteBg {
  background: #fff;
}

.p16 {
  padding-left: 16px;
  padding-right: 16px;
}

.fixBox {
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
}
</style>
