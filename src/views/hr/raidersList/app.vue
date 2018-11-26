<template>
  <Container ref="container" class="demo-loadmore-content">
    <LoadMore @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
      <List textline="three-line">
        <div v-for='raiders in raidersList' :key="raiders.id">
          <ListItem :ripple="false" button class='listBg' @click="raidersArticle(raiders.id)">
            <ListAction class='listAction' v-show='raiders.thumb !==""'>
              <Paper class="imgSpace" :z-depth="5">
                <img :src="raiders.thumb" class='raidersImg'>
              </Paper>
            </ListAction>
            <ListItemContent>
              <ListItemTitle>{{raiders.title}}</ListItemTitle>
              <ListItemSubTitle>
                {{raiders.content}}
              </ListItemSubTitle>
            </ListItemContent>
          </ListItem>
          <Divider></Divider>
        </div>
      </List>
    </LoadMore>
  </Container>
</template>

<script>
import { Toast } from "mint-ui";
import { Paper, Divider, LoadMore } from "muse-ui";
import { Container } from "muse-ui/lib/Grid";
import {
  List,
  ListItem,
  ListAction,
  ListItemContent,
  ListItemTitle,
  ListItemSubTitle
} from "muse-ui/lib/List";
import service from "service";
import tool from "util/tools";
export default {
  data() {
    return {
      refreshing: false,
      loading: false,
      page: 1,
      pagesize: 10,
      cid: 1, // 文章分类id,写死
      raidersList: [
        // {
        //   id: 1,
        //   thumb: "",
        //   title: "sdfsdf",
        //   content: "sdfsdfsdfsdfsdf"
        // },
        // {
        //   id: 1,
        //   thumb: "",
        //   title: "sdfsdf",
        //   content: "sdfsdfsdfsdfsdf"
        // },
        // {
        //   id: 1,
        //   thumb: "",
        //   title: "sdfsdf",
        //   content: "sdfsdfsdfsdfsdf"
        // },
        // {
        //   id: 1,
        //   thumb: "",
        //   title: "sdfsdf",
        //   content: "sdfsdfsdfsdfsdf"
        // },
        // {
        //   id: 1,
        //   thumb: "",
        //   title: "sdfsdf",
        //   content: "sdfsdfsdfsdfsdf"
        // }
      ]
    };
  },
  components: {
    List,
    ListItem,
    ListAction,
    ListItemContent,
    Paper,
    Divider,
    ListItemTitle,
    ListItemSubTitle,
    LoadMore,
    Container
  },
  computed: {
    isLoading() {
      return this.refreshing || this.loading;
    }
  },
  methods: {
    async raidersListData() {
      tool.showProgress();
      const response = await service.getrRaidersList({
        cid: this.cid,
        page: this.page
      });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          if (this.page === 1) {
            this.refreshing = false;
            this.raidersList = response.result.raidersList.map(message => {
              return {
                ...message
              };
            });
          }
          if (this.page > 1) {
            this.loading = false;
            response.result.raidersList.forEach(message => {
              this.raidersList.push({
                ...message
              });
            });
          }
          // this.raidersList = response.result.raidersList;
          break;
        default:
          Toast({
            position: "top",
            message: "获取失败，请稍后重试！！"
          });
          break;
      }
    },
    refresh() {
      // this.refreshing = true;
      // this.$refs.container.scrollTop = 0;
      // setTimeout(() => {
      //   this.refreshing = false;
      //   for (let i = 0; i < 10; i++) {
      //     this.raidersList.push({
      //       id: 1,
      //       thumb: '',
      //       title: 'sdfsdf',
      //       content: 'sdfsdfsdfsdfsdf'
      //     });
      //   }
      // }, 2000);
      if (!this.refreshing && !this.loading) {
        this.page = 1;
        this.refreshing = true;
        this.$refs[`container`].scrollTop = 0;
        this.raidersListData();
      }
    },
    load() {
      // this.loading = true;
      // setTimeout(() => {
      //   this.loading = false;
      //   for (let i = 0; i < 5; i++) {
      //     this.raidersList.push({
      //       id: 1,
      //       thumb: '',
      //       title: 'sdfsdf',
      //       content: 'sdfsdfsdfsdfsdf'
      //     });
      //   }
      // }, 2000);
      if (!this.refreshing && !this.loading) {
        this.page = this.page + 1;
        this.loading = true;
        this.raidersListData();
      }
    },
    raidersArticle(id) {
      tool.openWin({
        name: "raidersArticle",
        url: "../win.html",
        title: "",
        fname: "raidersArticle_f",
        furl: "./hr/raidersArticle.html",
        hasLeft: 1,
        hasRight: 0,
        data: {
          id: id
        }
      });
    }
  },
  mounted() {
    this.refresh();
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
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.listBg {
  background: #fff;
}

.listBg:active {
  background: #f0f0f0;
}
.listAction {
  min-width: 70px;
}
.imgSpace {
  padding: 5px;
}
.raidersImg {
  width: 50px;
  display: block;
}
</style>
