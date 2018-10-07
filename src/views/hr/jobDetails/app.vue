<template>
  <Container>
    <Card class='positionNameBox'>
      <CardTitle :title='position' :sub-title='firewood'>
      </CardTitle>
      <Row class='p16'>
        <Col span="3">
        <div class="grid-cell">
          <Icon size="16" value=":icon-chanpin"></Icon>
          {{experience}}经验
        </div>
        </Col>
        <Col span="3">
        <div class="grid-cell">
          <Icon size="16" value=":icon-chanpin"></Icon>
          {{education}}
        </div>
        </Col>
        <Col span="3">
        <div class="grid-cell">
          <Icon size="16" value=":icon-chanpin"></Icon>
          {{workCity}}
        </div>
        </Col>
        <Col span="3">
        <div class="grid-cell">
          <Icon size="16" value=":icon-chanpin"></Icon>
          人数：{{recruitsNum}}
        </div>
        </Col>
      </Row>
    </Card>
    <List textline="two-line" class='companyNameBox'>
      <ListItem avatar :ripple="false" button class='listItem whiteBg'>
        <ListAction>
          <Avatar>
            <img :src="companyImgSrc" alt="">
          </Avatar>
        </ListAction>
        <ListItemContent @click="companyInfo(enterpriseId)">
          <ListItemTitle>
            {{companyName}}
          </ListItemTitle>
          <ListItemSubTitle>
            <span>{{nature}}</span>
            <span>{{industry}}</span>
          </ListItemSubTitle>
        </ListItemContent>
      </ListItem>
    </List>
    <CardText class='whiteBg detailBox'>
      <h2 class='titleBox'>职位描述</h2>
      <div v-html="workDescription"></div>
    </CardText>
    <CardText class='whiteBg detailBox mt8'>
      <h2 class='titleBox'>工作地址</h2>
      <p class='spaceBetween'>
        {{workPlace}}
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
    <div class='p16 fixBox whiteBg'>
      <Button color="primary" full-width class='deliveryButton' @click='delivery'>立即投递</Button>
    </div>
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
      id: window.api.pageParam.id,
      position: '',
      firewood: '',
      experience: '',
      education: '',
      workCity: '',
      recruitsNum: '',
      companyImgSrc: '',
      companyName: '',
      nature: '',
      industry: '',
      workDescription: '',
      workPlace: '',
      enterpriseId: '',
      lists: [],
      rList: []
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
    Button,
    Toast
  },
  methods: {
    // 页面数据
    async detailsData () {
      const response = await service.getDetailsData({ id: this.id });
      switch (response.code) {
        case 0:
          this.position = response.result.position;
          this.firewood = response.result.firewood;
          this.experience = response.result.experience;
          this.education = response.result.education;
          this.workCity = response.result.workCity;
          this.workPlace = response.result.workPlace;
          this.recruitsNum = response.result.recruitsNum;
          this.companyImgSrc = response.result.companyImgSrc;
          this.companyName = response.result.companyName;
          this.nature = response.result.nature;
          this.industry = response.result.industry;
          this.workDescription = response.result.workDescription;
          this.lists = response.result.lists;
          this.enterpriseId = response.result.enterpriseId;
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
    },
    companyInfo (enterpriseId) {
      tool.openWin({
        name: 'companyInfo',
        url: '../win.html',
        title: '企业介绍',
        fname: 'companyInfo_f',
        furl: './hr/companyInfo.html',
        hasLeft: 1,
        hasRight: 1,
        data: {
          enterpriseId: enterpriseId
        }
      });
    },
    async delivery () {
      tool.showProgress();
      const response = await service.getUserBaseInfo({});
      switch (response.code) {
        case 0:
          let rList = response.result.resumeInfo.length > 0 ? response.result.resumeInfo[0] : [];
          const responses = await service.pushDelivery({
            id: this.id,
            resumeId: rList.id
          });
          tool.hideProgress();
          switch (responses.code) {
            case 0:
              Toast({
                position: 'center',
                message: '简历投递成功！'
              });
              break;
            case 101:
              Toast({
                position: 'center',
                message: '已经投递过该职位！！'
              });
              break;
            default:
              Toast({
                position: 'center',
                message: '投递失败，请稍后重试！！'
              });
              break;
          }
          break;
        default:
          Toast({
            position: 'top',
            message: '暂无简历，请增加简历！'
          });
          break;
      }
    }
  },
  mounted () {
    this.detailsData();
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

.positionNameBox {
  box-shadow: none;
  padding-bottom: 5px;
}

.positionNameBox .mu-card-sub-title,
.positionNameBox .mu-card-title {
  display: inline;
}

.mu-card-title-container {
  padding-bottom: 5px;
}

.mu-card-title-container .mu-card-title {
  font-size: 16px;
  font-weight: bold;
  margin-right: 15px;
}

.mu-card-sub-title {
  color: #009688;
}

.grid-cell {
  color: #000;
  font-size: 14px;
}

.companyNameBox {
  padding-top: 1px;
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

.detailBox h3 {
  font-size: 14px;
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

.allPostion {
  padding-bottom: 56px;
}

.allPostion .mu-card-text {
  padding-bottom: 0;
}

.mu-item-action{
  height: auto;
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
