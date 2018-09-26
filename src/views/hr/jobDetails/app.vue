<template>
  <Container>
    <Card class='positionNameBox'>
      <CardTitle :title='position' :sub-title='firewood'>
      </CardTitle>
      <Row class='p16'>
        <Col span="3">
        <div class="grid-cell">
          <Icon size="16" value=":icon-chanpin"></Icon>
          {{experience}}年经验</div>
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
          {{workPlace}}</div>
        </Col>
        <Col span="3">
        <div class="grid-cell">
          <Icon size="16" value=":icon-chanpin"></Icon>
          人数：{{recruitsNum}}</div>
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
        <ListItemContent @click="companyInfo">
          <ListItemTitle>
            {{companyName}}
          </ListItemTitle>
          <ListItemSubTitle>
            <span>{{nature}}</span>
            <span>{{scale}}人</span>
            <span>{{industry}}</span>
          </ListItemSubTitle>
        </ListItemContent>
      </ListItem>
    </List>
    <CardText class='whiteBg detailBox'>
      <h2 class='titleBox'>职位描述</h2>
     <p>{{workDescription}}</p>
    </CardText>
    <CardText class='whiteBg detailBox mt8'>
      <h2 class='titleBox'>工作地址</h2>
      <p class='spaceBetween'>
        {{address}}
        <Icon size='14' value=":icon-jinru" right></Icon>
      </p>
    </CardText>

    <List class='whiteBg mt8 allPostion' textline="two-line">
      <CardText>
        <h2 class='titleBox spaceBetween' @click="jobSearchList">所有职位
          <Icon size='14' value=":icon-jinru" right style='font-weight:normal'></Icon>
        </h2>
      </CardText>
      <div v-for='jobs in lists' :key="jobs.id">
        <ListItem avatar :ripple="false" button class='listItem'  @click="jobDetails">
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
      <Button color="info" class='collection'>收藏</Button>
      <Button color="primary" class='deliveryButton'>立即投递</Button>
    </div>
  </Container>
</template>

<script>
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
export default {
  data () {
    return {
      id:1,
      position:'产品经理',
      firewood:'8-20万',
      experience:'3',
      education:'大专',
      workPlace:'镇江',
      recruitsNum:'10',
      companyImgSrc:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg',
      companyName:'飞龙信息发展股份有限公司',
      nature:'上市公司',
      scale:'500-1000',
      industry:'电子商务',
      workDescription:'1、负责零售后台/CRM等云平台产品规划设计，包括需求沟通与分析、产品设计（包括产品方案、功能和原型等的设计）、需求文档的撰写等； 2、全程负责 整个产品的全生命周期，通过产品数据监控、调研和分析，提出优化改进建议，完成产品的持续迭代优化；',
      address:'飞龙信息发展股份有限公司',
      lists: [
        {
          id: 1,
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        },
        {
          id: 2,
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        },
        {
          id: 3,
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        },
        {
          id: 4,
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        },
        {
          id: 5,
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        }
      ]
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
    jobSearchList () {
      tool.openWin({
        name: 'jobSearchList',
        url: '../win.html',
        title: '所有职位',
        fname: 'jobSearchList_f',
        furl: './hr/jobSearchList.html',
        hasLeft: 1
      });
    },
    jobDetails () {
      tool.openWin({
        name: 'jobDetails',
        url: '../win.html',
        title: '职位详情',
        fname: 'jobDetails_f',
        furl: './hr/jobDetails.html',
        hasLeft: 1,
        hasRight: 1
      });
    },
    companyInfo () {
      tool.openWin({
        name: 'companyInfo',
        url: '../win.html',
        title: '企业介绍',
        fname: 'companyInfo_f',
        furl: './hr/companyInfo.html',
        hasLeft: 1,
        hasRight: 1
      });
    }
  },
  mounted () {}
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

.allPostion{
  padding-bottom: 56px;
}

.allPostion .mu-card-text {
  padding-bottom: 0;
}

.fixBox{
  position:fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px;
  border-top:1px solid #eee;
  display: flex;
  justify-content: space-around;
}
</style>
