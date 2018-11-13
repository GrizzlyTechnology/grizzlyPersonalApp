<template>
  <Container ref="container" class="demo-loadmore-content">
    <LoadMore @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
      <List textline="two-line" v-show="lists.length > 0">
        <div v-for='list in lists' :key="list.id">
          <ListItem avatar :ripple="false" button class='listItem' @click="jobDetails(list.id)">
            <ListItemContent>
              <ListItemTitle>{{list.position}}
                <span class='claim'>{{list.claim}}</span>
              </ListItemTitle>
              <ListItemSubTitle>
                {{list.companyName}}
              </ListItemSubTitle>
            </ListItemContent>
            <ListAction>
              <ListItemAfterText class='salaryRange'>{{list.salaryRange}}</ListItemAfterText>
              <ListItemAfterText>{{list.date}}</ListItemAfterText>
            </ListAction>
          </ListItem>
          <Divider></Divider>
        </div>
      </List>
    </LoadMore>
    <div v-show='lists.length <= 0' class='bodyer noList'>
      暂无记录
    </div>
  </Container>
</template>

<script>
import { Toast } from 'mint-ui';
import { Divider, Button, LoadMore } from 'muse-ui';
import { Container, Row, Col } from 'muse-ui/lib/Grid';
import {
  List,
  ListItem,
  ListAction,
  ListItemSubTitle,
  ListItemContent,
  ListItemTitle,
  ListItemAfterText
} from 'muse-ui/lib/List';
import tool from 'util/tools';
import service from 'service';
export default {
  data () {
    return {
      refreshing: false,
      loading: false,
      lists: [
        // {
        //   id:'1',
        //   position: "1111",
        //   claim: "222",
        //   companyName: "sdsdfsd",
        //   salaryRange: "xddg",
        //   date: "2010-11-11",
        // },
        //  {
        //   id:'1',
        //   position: "1111",
        //   claim: "222",
        //   companyName: "sdsdfsd",
        //   salaryRange: "xddg",
        //   date: "2010-11-11"
        // },
        //  {
        //   id:'1',
        //   position: "1111",
        //   claim: "222",
        //   companyName: "sdsdfsd",
        //   salaryRange: "xddg",
        //   date: "2010-11-11"
        // },
        //  {
        //   id:'1',
        //   position: "1111",
        //   claim: "222",
        //   companyName: "sdsdfsd",
        //   salaryRange: "xddg",
        //   date: "2010-11-11"
        // },
        //  {
        //   id:'1',
        //   position: "1111",
        //   claim: "222",
        //   companyName: "sdsdfsd",
        //   salaryRange: "xddg",
        //   date: "2010-11-11"
        // }
      ],
      keyWord: window.api.pageParam.keyWord,
      area: window.api.pageParam.area,
      istj: window.api.pageParam.istj || ''
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
    Button,
    LoadMore,
    Toast
  },
  methods: {
    // 列表数据
    async listsData () {
      tool.showProgress();
      const response = await service.searchBoxValue({
        keyWord: this.keyWord,
        area: this.area,
        istj: this.istj
      });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.lists = response.result.list;
          console.log(this.lists.length);
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
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
    refresh () {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        for (let i = 0; i < 10; i++) {
          this.lists.push({
            position: '1111',
            claim: '222',
            companyName: 'sdsdfsd',
            salaryRange: 'xddg',
            date: '2010-11-11'
          });
        }
      }, 2000);
    },
    load () {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        for (let i = 0; i < 5; i++) {
          this.lists.push({
            position: '35345',
            claim: 'dfgdfg',
            companyName: '111',
            salaryRange: 'dfgdfg',
            date: '2010-11-12'
          });
        }
      }, 2000);
    }
  },
  watch: {},
  mounted () {
    this.listsData();
  }
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.container {
  padding: 0px;
}

.bodyer {
  flex: 1;
  overflow: auto;
}
.demo-loadmore-content {
  flex: 1;
  height: 100%;
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

.mu-item-action {
  height: auto;
}

.listItem {
  background: #fff;
}

.noList {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333;
}
</style>
