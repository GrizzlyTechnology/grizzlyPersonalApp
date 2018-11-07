<template>
  <Container>
    <List textline="two-line" class='companyNameBox'>
      <div v-for='company in companys' :key="company.id">
        <ListItem avatar :ripple="false" button class='listItem whiteBg' @click="companyInfo(company.id)">
          <ListAction>
            <Avatar>
              <img :src="company.imgSrc" alt="">
            </Avatar>
          </ListAction>
          <ListItemContent>
            <ListItemTitle>
              {{company.name}}
            </ListItemTitle>
          </ListItemContent>
        </ListItem>
        <Divider></Divider>
      </div>
    </List>
  </Container>
</template>

<script>
import { Toast } from "mint-ui";
import { Container } from "muse-ui/lib/Grid";
import {
  List,
  ListItem,
  ListAction,
  ListItemContent,
  ListItemTitle,
} from "muse-ui/lib/List";
import { Avatar, Divider, Button } from "muse-ui";
import tool from "util/tools";
import service from "service";
export default {
  data() {
    return {
      companys:[],
    };
  },
  components: {
    Container,
    List,
    ListItem,
    ListAction,
    ListItemContent,
    ListItemTitle,
    Avatar,
    Divider
  },
  methods: {
    // 页面数据
     async companyRecommend() {
      const response = await service.companyRecommendList({});
      switch (response.code) {
        case 0:
          this.companys = response.result.companys;
          break;
        default:
          Toast({
            position: "top",
            message: "加载失败，请稍后重试！！"
          });
          break;
      }
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
  },
  mounted() {
    this.companyRecommend();
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
