<template>
  <Container>
    <List textline="two-line" class='companyNameBox'>
      <ListItem avatar :ripple="false" button class='listItem whiteBg'>
        <ListAction>
          <Avatar>
            <img :src="companyImgSrc" alt="">
          </Avatar>
        </ListAction>
        <ListItemContent>
          <ListItemTitle>
            {{companyName}}
          </ListItemTitle>
          <ListItemSubTitle>
            <span>{{nature}}</span>
            <span>{{scale}}</span>
            <span>{{industry}}</span>
          </ListItemSubTitle>
        </ListItemContent>
      </ListItem>
    </List>
    <CardText class='whiteBg detailBox'>
      <h2 class='titleBox'>公司介绍</h2>
       <div v-html="companyIntro"></div>
    </CardText>
    <CardText class='whiteBg detailBox mt8'>
      <h2 class='titleBox'>公司地址</h2>
      <p class='spaceBetween'>
        {{comapnyAddress}}
      </p>
    </CardText>
    <List class='whiteBg mt8 allPostion' textline="two-line">
      <CardText>
        <h2 class='titleBox spaceBetween'>所有职位</h2>
      </CardText>
      <div v-for='jobs in lists' :key="jobs.id">
        <ListItem avatar :ripple="false" button class='listItem' @click="jobDetails(jobs.id)">
          <ListItemContent>
            <ListItemTitle>{{jobs.position}}
              <span class='claim'>{{jobs.claim}}</span>
            </ListItemTitle>
            <ListItemSubTitle>
              {{jobs.companyName}}
            </ListItemSubTitle>
          </ListItemContent>
          <ListAction>
            <ListItemAfterText class='salaryRange'>{{jobs.salaryRange}}</ListItemAfterText>
            <ListItemAfterText>{{jobs.date}}</ListItemAfterText>
          </ListAction>
        </ListItem>
        <Divider></Divider>
      </div>
    </List>
  </Container>
</template>

<script>
import { Toast } from 'mint-ui';
import { Container, Row, Col } from 'muse-ui/lib/Grid';
import { CardTitle, CardText } from 'muse-ui/lib/Card';
import {
  List,
  ListItem,
  ListAction,
  ListItemSubTitle,
  ListItemContent,
  ListItemTitle,
  ListItemAfterText
} from 'muse-ui/lib/List';
import { Card, Icon, Avatar, Divider, Button } from 'muse-ui';
import tool from 'util/tools';
import service from 'service';
export default {
  data () {
    return {
      companyImgSrc: '',
      companyName: '',
      nature: '',
      scale: '',
      industry: '',
      companyIntro: '',
      comapnyAddress: '',
      enterpriseId: window.api.pageParam.enterpriseId,
      lists: []
    };
  },
  components: {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    Icon,
    List,
    ListItem,
    ListAction,
    ListItemSubTitle,
    ListItemContent,
    ListItemTitle,
    ListItemAfterText,
    Avatar,
    CardText,
    Divider,
    Button
  },
  methods: {
    // 页面数据
    async detailsData () {
      const response = await service.getCompanyInfo({ enterpriseId: this.enterpriseId });
      switch (response.code) {
        case 0:
          this.companyImgSrc = response.result.companyImgSrc;
          this.companyName = response.result.companyName;
          this.nature = response.result.nature;
          this.scale = response.result.scale;
          this.industry = response.result.industry;
          this.companyIntro = response.result.companyIntro;
          this.comapnyAddress = response.result.comapnyAddress;
          break;
        default:
          Toast({
            position: 'top',
            message: '获取失败，请稍后重试！！'
          });
          break;
      }
    },
    async companyAllJob () {
      const response = await service.getCompanyJob({ enterpriseId: this.enterpriseId });
      switch (response.code) {
        case 0:
          this.lists = response.result.lists;
          console.log(response.result.lists);
          console.log(response.result);
          break;
        default:
          Toast({
            position: 'top',
            message: '获取失败，请稍后重试！！'
          });
          break;
      }
    },
    jobDetails (id) {
      tool.openWin({
        name: 'jobDetails_' + id,
        url: '../win.html',
        title: '职位详情',
        fname: 'jobDetails_f_' + id,
        furl: './hr/jobDetails.html',
        hasLeft: 1,
        hasRight: 1,
        data: {
          id: id
        }
      });
    }
  },
  mounted () {
    this.detailsData();
    this.companyAllJob();
  }
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.container {
  padding: 0;
}

.p16 {
  padding-left: 16px;
  padding-right: 16px;
}

.mt8 {
  margin-top: 8px;
}

.whiteBg {
  background: #fff;
}

.companyNameBox {
  padding-top: 0px;
}

.companyNameBox .mu-item-sub-title span {
  margin-right: 10px;
}

.companyNameBox .mu-avatar img {
  border-radius: 0px;
}

.titleBox {
  font-size: 16px;
  border-left: 3px solid #009688;
  padding-left: 5px;
  margin-top: 0;
}

.spaceBetween {
  display: flex;
  justify-content: space-between;
}

.claim {
  color: #666;
  font-size: 12px;
  margin-left: 10px;
}

.salaryRange {
  color: #009688;
  font-size: 14px;
}

.allPostion .mu-card-text {
  padding-bottom: 0;
}
</style>
