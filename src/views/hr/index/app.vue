<template>
  <Container ref="container">
    <div class='topSearch'>
      <div class='flexCon' @click='jobSearch'>
        <AutoComplete disabled label="" placeholder="搜索公司/职位" class='searchBox' :solo='true'>
          <i class='iconfont icon-suosou'></i>
        </AutoComplete>
      </div>
    </div>
    <div class='demo-loadmore-content'>
      <LoadMore @refresh="refresh" :refreshing="refreshing">
        <Carousel hide-controls>
          <template v-for='carouselImg in carouselImgs'>
            <CarouselItem :key="carouselImg.index">
              <img :src="carouselImg">
            </CarouselItem>
          </template>
        </Carousel>
        <div class='bgWhite'>
          <div class='activeBox'>
            <h2 class='titleB' @click="companyListAll()">名企推荐<Icon class='iconfont icon-jinru' right size="12" value=":mudocs-icon-communication-voicemail" color="#000"></Icon>
            </h2>
          </div>
          <Row class='mqtj space15' gutter>
            <Col span="4" v-for='company in companys.slice(0,6)' :key='company.id' @click="companyInfo(company.id)">
            <div class="grid-cell">
              <img :src="company.imgSrc" alt="">
            </div>
            </Col>
          </Row>
        </div>
        <div v-show="resumeList.length>=1&& count >=1" class='suitables'>
          <h2 class='titleA'><span></span> 适合你的职位 <span></span></h2>
          <div class='bgWhite '>
            <List textline="two-line" v-if="suitablesLists.length > 0">
              <div v-for='suitablesList in suitablesLists.slice(0,6)' :key="suitablesList.id">
                <ListItem avatar :ripple="false" button class='listItem' @click="jobDetails(suitablesList.id)">
                  <ListItemContent>
                    <ListItemTitle>{{suitablesList.position}}
                      <span class='claim'>{{suitablesList.claim}}</span>
                    </ListItemTitle>
                    <ListItemSubTitle>
                      {{suitablesList.companyName}}
                    </ListItemSubTitle>
                  </ListItemContent>
                  <ListAction>
                    <ListItemAfterText class='salaryRange'>{{suitablesList.salaryRange}}</ListItemAfterText>
                    <ListItemAfterText>{{suitablesList.date}}</ListItemAfterText>
                  </ListAction>
                </ListItem>
                <Divider></Divider>
              </div>
            </List>
          </div>
        </div>
        <template v-for='resumeImg in resumeImgs'>
          <img :src="resumeImg.imgSrc" alt="" class='adv createResume' @click="createResume" v-show='resumeList.length===0' :key='resumeImg.index'>
        </template>
        <div class='bgWhite hotJobs'>
          <div class='activeBox'>
            <h2 class='titleB' @click="hotJobListAll()">热门职位 <Icon class='iconfont icon-jinru' right size="12" value=":mudocs-icon-communication-voicemail" color="#000"></Icon>
            </h2>
          </div>
        </div>
        <div class='bgWhite'>
          <List textline="two-line" v-if="hotJobs.length > 0">
            <div v-for='hotJob in hotJobs.slice(0,6)' :key="hotJob.id">
              <ListItem avatar :ripple="false" button class='listItem' @click="jobDetails(hotJob.id)">
                <ListItemContent>
                  <ListItemTitle>{{hotJob.position}}
                    <span class='claim'>{{hotJob.claim}}</span>
                  </ListItemTitle>
                  <ListItemSubTitle>
                    {{hotJob.companyName}}
                  </ListItemSubTitle>
                </ListItemContent>
                <ListAction>
                  <ListItemAfterText class='salaryRange'>{{hotJob.salaryRange}}</ListItemAfterText>
                  <ListItemAfterText>{{hotJob.date}}</ListItemAfterText>
                </ListAction>
              </ListItem>
              <Divider></Divider>
            </div>
          </List>
        </div>
        <template v-for='advImg in advImgs'>
          <img :src="advImg.imgSrc" alt="" class='adv' :key='advImg.index'>
        </template>
        <div class='bgWhite hotJobs activeBox'>
          <h2 class='titleB' @click="raidersListAll()">职场攻略 <Icon class='iconfont icon-jinru' right size="12" value=":mudocs-icon-communication-voicemail" color="#000"></Icon>
          </h2>
        </div>
        <div class='bgWhite'>
          <List textline="three-line">
            <div v-for='raiders in raidersList.slice(0,6)' :key="raiders.id">
              <ListItem :ripple="false" button class='listBg listItem' @click="raidersArticle(raiders.id)">
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
        </div>
      </LoadMore>
    </div>
  </Container>
</template>
<script>
import service from 'service';
import { Toast } from 'mint-ui';
import { Carousel, CarouselItem } from 'muse-ui/lib/Carousel';
import { Paper, Divider, AutoComplete, Icon, LoadMore } from 'muse-ui';
import { Container, Row, Col } from 'muse-ui/lib/Grid';
import tool from 'util/tools';
import {
  List,
  ListItem,
  ListAction,
  ListItemSubTitle,
  ListItemContent,
  ListItemTitle,
  ListItemAfterText
} from 'muse-ui/lib/List';
export default {
  data () {
    return {
      refreshing: false,
      companys: [],
      carouselImgs: [],
      suitablesLists: [],
      count: 0,
      resumeList: [],
      hotJobs: [],
      defaultResult: [],
      labelPosition: 'right',
      cid: 1, // 文章分类id,写死
      raidersList: [], // 职场攻略列表
      createResumeImgSrc: '',
      resumeImgs: [],
      advImgs: []
    };
  },
  components: {
    Carousel,
    CarouselItem,
    AutoComplete,
    Container,
    Row,
    Col,
    List,
    ListItem,
    ListItemContent,
    ListItemTitle,
    ListItemSubTitle,
    ListAction,
    ListItemAfterText,
    Divider,
    Icon,
    Paper,
    LoadMore
  },
  computed: {
    filterResult () {
      return this.defaultResult.filter(value =>
        new RegExp(this.value, 'i').test(value)
      );
    }
  },
  methods: {
    // 下拉刷新
    refresh () {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.carouselImg();
        this.getResumeList();
        this.raidersListData();
        this.companyRecommend();
        this.hotJobsData();
        this.imgAdv();
        this.resumeImgAdv();
      }, 2000);
    },
    // 搜索
    jobSearch () {
      tool.openWin({
        name: 'jobSearch',
        url: '../win.html',
        title: '职位搜索',
        fname: 'jobSearch_f',
        furl: './hr/jobSearch.html',
        hasLeft: 1,
        hasRight: 0
      });
    },
    // 滚动图
    async carouselImg () {
      tool.showProgress();
      const response = await service.carouselImgs({});
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.carouselImgs = response.result.carouselImgs;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    },
    // 名企推荐数据
    async companyRecommend () {
      tool.showProgress();
      const response = await service.companyRecommendList({});
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.companys = response.result.companys;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    },
    // 名企推荐所有列表
    companyListAll () {
      tool.openWin({
        name: 'companyList',
        url: '../win.html',
        title: '名企推荐',
        fname: 'companyList_f',
        furl: './hr/companyList.html',
        hasLeft: 1,
        hasRight: 0
      });
    },
    // 名企推荐详情
    companyInfo (enterpriseId) {
      tool.openWin({
        name: 'companyInfo',
        url: '../win.html',
        title: '企业介绍',
        fname: 'companyInfo_f',
        furl: './hr/companyInfo.html',
        hasLeft: 1,
        hasRight: 0,
        data: {
          enterpriseId: enterpriseId
        }
      });
    },
    // 显示适合你的职位
    async getResumeList () {
      tool.showProgress();
      const response = await service.getUserBaseInfo();
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.resumeList =
            response.result.resumeInfo.length > 0
              ? [response.result.resumeInfo[0]]
              : [];
          if (this.resumeList.length!==0) {
            this.listsData();
          }

          break;
        default:
          tool.toast({
            position: 'top',
            message: '简历列表获取失败'
          });
          break;
      }
    },
    // 适合你的职位列表数据
    async listsData () {
      tool.showProgress();
      const response = await service.searchBoxValue({
        keyWord: this.resumeList[0].desiredposition
      });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.suitablesLists = response.result.list;
          this.count = response.result.count;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    },
    // 创建简历广告
    async resumeImgAdv () {
      tool.showProgress();
      const response = await service.getAdv({
        cid: 1
      });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.resumeImgs = response.result;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    },
    // 广告
    async imgAdv () {
      tool.showProgress();
      const response = await service.getAdv({
        cid: 3
      });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.advImgs = response.result;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    },
    // 热门职位列表
    async hotJobsData () {
      tool.showProgress();
      const response = await service.hotJobsData({});
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.hotJobs = response.result.list;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    },
    // 所有热门职位
    hotJobListAll () {
      tool.openWin({
        name: 'jobSearchList',
        url: '../win.html',
        title: '热门职位',
        fname: 'jobSearchList_f',
        furl: './hr/jobSearchList.html',
        hasLeft: 1,
        hasRight: 0,
        data: {
          istj: 1 // 1是推荐 0是不推荐
        }
      });
    },
    // 职位详情
    jobDetails (id) {
      tool.openWin({
        name: 'jobDetails_' + id,
        url: '../win.html',
        title: '职位详情',
        fname: 'jobDetails_f_' + id,
        furl: './hr/jobDetails.html',
        hasLeft: 1,
        hasRight: 0,
        data: {
          id: id
        }
      });
    },
    // 跳转到职场攻略页面
    raidersListAll () {
      tool.openWin({
        name: 'raidersList',
        url: '../win.html',
        title: '职场攻略',
        fname: 'raidersList_f',
        furl: './hr/raidersList.html',
        hasLeft: 1,
        hasRight: 0
      });
    },
    // 获取职场攻略列表
    async raidersListData () {
      tool.showProgress();
      const response = await service.getrRaidersList({ cid: this.cid });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.raidersList = response.result.raidersList;
          break;
        default:
          Toast({
            position: 'top',
            message: '获取失败，请稍后重试！！'
          });
          break;
      }
    },
    // 职场攻略详情
    raidersArticle (id) {
      tool.openWin({
        name: 'raidersArticle',
        url: '../win.html',
        title: '职场攻略',
        fname: 'raidersArticle_f',
        furl: './hr/raidersArticle.html',
        hasLeft: 1,
        hasRight: 0,
        data: {
          id: id
        }
      });
    },
    // 创建简历
    createResume () {
      tool.openWin({
        name: 'resumeList',
        url: '../win.html',
        title: '创建简历',
        fname: 'resumeList_f',
        furl: './userCenter/resumeList.html',
        hasLeft: 1,
        hasRight: 0
      });
    }
  },
  mounted () {
    this.carouselImg();
    this.getResumeList();
    this.raidersListData();
    this.companyRecommend();
    this.hotJobsData();
    this.imgAdv();
    this.resumeImgAdv();
  }
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.container {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.demo-loadmore-content {
  height: 100%;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.mu-carousel {
  height: 200px;
  margin-bottom: 15px;
}
.mu-carousel-item > img {
  width: 100%;
}
.topSearch {
  padding-top: 30px;
  width: 100%;
  background: #f5f5f5;
}

.flexCon {
  display: flex;
  align-items: center;
  border: 1px solid #009688;
  border-radius: 5px;
  padding-left: 5px;
  background: #fff;
  width: 90%;
  margin: 0 auto 10px;
}
.araeBox {
  width: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mu-input.searchBox {
  // width: 80%;
  width: 98%;
  min-height: auto;
  padding-top: 0px;
  padding-bottom: 0px;
}

body .mu-secondary-text-color {
  color: #009688;
}

.flexCon .iconfont {
  font-size: 20px;
  color: #009688;
  margin-right: 15px;
}

.flexCon .iconfont.icon-weizhi-blue {
  margin-right: 0;
}

.searchBox input {
  width: 100%;
  height: 40px;
  padding-left: 1rem;
}

.suitables {
  margin-bottom: 15px;
}

.bgWhite {
  background: #fff;
}

.space15 {
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.titleB {
  border-left: 3px solid #009688;
  font-size: 14px;
  line-height: 1;
  padding-left: 5px;
  margin-top: 0;
  display: flex;
  margin-bottom: 0;
  justify-content: space-between;
}

.activeBox {
  padding: 15px;
  &:active {
    background: #f0f0f0;
  }
}

.titleA {
  font-size: 14px;
  line-height: 1;
  color: #999;
  font-weight: normal;
  text-align: center;
  margin-top: 25px;
}

.titleA span {
  display: inline-block;
  vertical-align: 3px;
  width: 25px;
  height: 1px;
  background: #999;
}

.col {
  margin-top: 8px;
  margin-bottom: 8px;
}

.mqtj img {
  width: 100%;
  height:100%;
  display: block;
}

.mqtj .grid-cell{
  border:1px solid #ccc;
  height: 100px;
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

.mu-list {
  padding-bottom: 0;
}

.hotJobs h2 {
  margin-bottom: 0;
}

.listItem:active {
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
.adv {
  width: 100%;
  margin: 15px 0;
}
.adv.createResume {
  margin-top: 0;
}
</style>
