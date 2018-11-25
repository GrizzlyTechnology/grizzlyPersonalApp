<template>
  <Container>
    <Stepper :active-step="0" orientation="vertical" :linear="false">
      <template v-for='company in companys'>
        <Step :key='company.id' @click='Internship(company.id,company.companyName,company.department,company.group)'>
          <StepLabel  class='comStepper'>
            <Card>
              <p>{{company.practiceTime}}</p>
              <CardHeader :title="company.companyName" :sub-title="company.department + '  ' +company.group"></CardHeader>
            </Card>
            <span class='status'>{{company.practicesStatus}}</span>
            <Icon class='iconfont icon-jinru' right size="12" value=":mudocs-icon-communication-voicemail"></Icon>
          </StepLabel>
        </Step>
      </template>
    </Stepper>

     <!-- <div>你还未加入企业实习，立即去  <Button color="#009688" @click="hotJobListAll">投递职位</Button></div> -->
  </Container>
</template>
<script>
// import { Button } from 'muse-ui';
import { Card, Icon } from 'muse-ui';
import { CardHeader } from 'muse-ui/lib/Card';
import { Stepper, Step, StepLabel } from 'muse-ui/lib/Stepper';
import { Container } from 'muse-ui/lib/Grid';
import tool from 'util/tools';
import service from 'service';
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      companys: []
    };
  },
  components: {
    Container,
    Card,
    CardHeader,
    Stepper,
    Step,
    StepLabel,
    Icon
    // Button
  },
  methods: {
    // 列表数据
    async listsData () {
      const response = await service.internshipCompany({});
      switch (response.code) {
        case 0:
          this.companys = response.result.lists;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    },
    Internship (id, companyName, department, group) {
      tool.openWin({
        name: 'Internship',
        url: '../win.html',
        title: '校外实习',
        fname: 'Internship_f',
        furl: './application/Internship.html',
        hasLeft: 1,
        data: {
          companyId: id,
          companyName: companyName,
          department: department,
          group: group
        }
      });
    }
    // hotJobListAll () {
    //   tool.openWin({
    //     name: 'jobSearchList',
    //     url: '../win.html',
    //     title: '热门职位',
    //     fname: 'jobSearchList_f',
    //     furl: './hr/jobSearchList.html',
    //     hasLeft: 1,
    //     hasRight: 0,
    //     data: {
    //       istj: 1 // 1是推荐 0是不推荐
    //     }
    //   });
    // }
  },
  mounted () {
    this.listsData();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.mu-card {
  box-shadow: none;
  background: none;
  width: 75%;
}

.mu-card-header-title {
  padding-right: 10px;
}

.status {
  width: 15%;
  color: #999;
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
  padding: 50px 0 30px;
  text-align: center;
}

.mu-step-label.completed .mu-step-label-circle, .mu-step-label.active .mu-step-label-circle{
  background: #009688;
}

.mu-step-label.completed .status , .mu-step-label.active .status{
color: #009688;
}
</style>
