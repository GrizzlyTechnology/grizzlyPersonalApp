<template>
  <Container>
    <List textline="two-line" class='companyNameBox'>
      <ListItem avatar :ripple="false" button class='listItem whiteBg'>
        <ListAction>
          <Avatar>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt="">
          </Avatar>
        </ListAction>
        <ListItemContent>
          <ListItemTitle>
            飞龙信息发展股份有限公司
          </ListItemTitle>
          <ListItemSubTitle>
            <span>上市公司</span>
            <span>500-1000人</span>
            <span>电子商务</span>
          </ListItemSubTitle>
        </ListItemContent>
      </ListItem>
    </List>
    <CardText class='whiteBg detailBox'>
      <h2 class='titleBox'>公司介绍</h2>
      <p>
       广州凤凰互动科技有限公司，由广州游爱与多家发行公司共同投资，于2018年3月创立。公司主创团队由吉比特、4399、游爱等网游资深开发人员组成，曾主创参与过亿流水端游、页游、手游产品。
      </p>
    </CardText>
    <CardText class='whiteBg detailBox mt8'>
      <h2 class='titleBox'>公司地址</h2>
      <p class='spaceBetween'>
        飞龙信息发展股份有限公司
        <Icon size='14' value=":icon-jinru" right></Icon>
      </p>
    </CardText>

    <List class='whiteBg mt8 allPostion' textline="two-line">
      <CardText>
        <h2 class='titleBox spaceBetween'>所有职位
          <Icon size='14' value=":icon-jinru" right style='font-weight:normal'></Icon>
        </h2>
      </CardText>
      <template v-for='jobs in lists'>
        <ListItem avatar :ripple="false" button class='listItem'>
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
      </template>
    </List>
  </Container>
</template>

<script>
import { Container, Row, Col } from "muse-ui/lib/Grid";
import { CardTitle, CardText } from "muse-ui/lib/Card";
import {
  List,
  ListItem,
  ListAction,
  ListItemSubTitle,
  ListItemContent,
  ListItemTitle,
  ListItemAfterText
} from "muse-ui/lib/List";
import { Card, Icon, Avatar, Divider, Button } from "muse-ui";
export default {
  data() {
    return {
      lists: [
        {
          position: "产品经理",
          claim: "3年/大专/镇江",
          salaryRange: "6K-8K",
          companyName: "飞龙信息发展股份有限公司",
          date: "2018-08-06"
        },
        {
          position: "产品经理",
          claim: "3年/大专/镇江",
          salaryRange: "6K-8K",
          companyName: "飞龙信息发展股份有限公司",
          date: "2018-08-06"
        },
        {
          position: "产品经理",
          claim: "3年/大专/镇江",
          salaryRange: "6K-8K",
          companyName: "飞龙信息发展股份有限公司",
          date: "2018-08-06"
        },
        {
          position: "产品经理",
          claim: "3年/大专/镇江",
          salaryRange: "6K-8K",
          companyName: "飞龙信息发展股份有限公司",
          date: "2018-08-06"
        },
        {
          position: "产品经理",
          claim: "3年/大专/镇江",
          salaryRange: "6K-8K",
          companyName: "飞龙信息发展股份有限公司",
          date: "2018-08-06"
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
  methods: {},
  mounted() {}
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
