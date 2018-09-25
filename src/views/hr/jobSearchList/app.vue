<template>
  <Container ref="container" class="demo-loadmore-content">
    <LoadMore @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
      <List textline="two-line" class='bodyer'>
        <Form :model="{}">

          <div v-for='list in lists' v-model="lists" :key="list.id">
            <ListItem avatar :ripple="false" button class='listItem'>
              <ListItemContent @click="jobDetails">
                <ListItemTitle>{{list.position}}
                  <span class='claim'>{{list.claim}}</span>
                </ListItemTitle>
                <ListItemSubTitle>
                  {{list.companyName}}
                </ListItemSubTitle>
              </ListItemContent>
              <ListAction @click="jobDetails">
                <ListItemAfterText class='salaryRange'>{{list.salaryRange}}</ListItemAfterText>
                <ListItemAfterText>{{list.date}}</ListItemAfterText>
              </ListAction>
            </ListItem>
            <Divider></Divider>
          </div>
        </Form>
      </List>
    </LoadMore>
  </Container>
</template>

<script>
import { Toast } from "mint-ui";
import { Divider, Form, Button, LoadMore } from "muse-ui";
import { Container, Row, Col } from "muse-ui/lib/Grid";
import {
  List,
  ListItem,
  ListAction,
  ListItemSubTitle,
  ListItemContent,
  ListItemTitle,
  ListItemAfterText
} from "muse-ui/lib/List";
import tool from "util/tools";
import service from "service";
export default {
  data() {
    return {
      num: 10,
      refreshing: false,
      loading: false,
      lists: [],
      keyWord:window.api.pageParam.keyWord,
      area:window.api.pageParam.area || []
    };
  },
  components: {
    Container,
    List,
    ListItem,
    ListItemContent,
    ListItemTitle,
    ListItemSubTitle,
    ListAction,
    ListItemAfterText,
    Divider,
    Row,
    Col,
    Form,
    Button,
    LoadMore,
    Toast
  },
  methods: {
    // 列表数据
    async listsData() {
      const response = await service.searchBoxValue({
        keyWord:this.keyWord,
        area:this.area
        });
      switch (response.code) {
        case 0:
          this.lists = response.result.list;
          break;
        default:
          Toast({
            position: "top",
            message: "加载失败，请稍后重试！！"
          });
          break;
      }
    },

    jobDetails() {
      tool.openWin({
        name: "jobDetails",
        url: "../win.html",
        title: "职位详情",
        fname: "jobDetails_f",
        furl: "./hr/jobDetails.html",
        hasLeft: 1,
        hasRight: 1
      });
    },
    jobDetail: function() {
      tool.openWin({
        name: "zcgl",
        url: "../win.html",
        title: "职位详情",
        fname: "jobDetails_f",
        furl: "./hr/jobDetails.html",
        hasLeft: 1,
        hasRight: 1
      });
    },
    refresh() {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.num = 10;
      }, 2000);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
      }, 2000);
    }
  },
  watch: {

  },
  mounted() {
    this.listsData();
  }
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.container {
  padding: 0px;
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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

.p16 {
  padding: 16px;
  display: flex;
  background-color: #fff;
  align-items: center;
}

.mu-item-action {
  height: auto;
}

.listItem {
  background: #fff;
}
</style>
