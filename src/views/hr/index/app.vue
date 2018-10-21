<template>
  <Container>
    <div class='topSearch'>
      <div class='flexCon'>
        <span @click="areaHandle" class='araeBox'>
          <i class='iconfont icon-weizhi-blue'></i>{{areaText}}</span>
        <AutoComplete :data="filterResult" @select="submit" @keyup.enter='submit' @keyup="getAllSearchValue" label="" v-model="form.keyWord" placeholder="搜索公司/职位" class='searchBox' :solo='true'>
          <i class='iconfont icon-suosou' @click='submit'></i>
        </AutoComplete>
      </div>
    </div>

    <Carousel hide-controls>
      <CarouselItem>
        <img :src="carouselImg1">
      </CarouselItem>
      <CarouselItem>
        <img :src="carouselImg2">
      </CarouselItem>
      <CarouselItem>
        <img :src="carouselImg3">
      </CarouselItem>
      <CarouselItem>
        <img :src="carouselImg4">
      </CarouselItem>
    </Carousel>
    <div class='bgWhite space15'>
      <h2 class='titleB'>名企推荐</h2>
      <Row class='mqtj' gutter>
        <Col span="4" v-for='company in companys.slice(0,6)' :key='company.id'>
        <div class="grid-cell">
          <img :src="company.imgSrc" alt="">
        </div>
        </Col>
      </Row>
    </div>
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
    <div class="adv"></div>
    <!-- <img src="../../../assets/img/adv.jpg" alt="" class='adv'> -->
    <div class='bgWhite hotJobs'>
      <h2 class='titleB'>热门职位 <Icon class='iconfont icon-jinru' right size="12" value=":mudocs-icon-communication-voicemail" color="#000"></Icon>
      </h2>
    </div>
    <div class='bgWhite'>
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
    <div class='bgWhite hotJobs'>
      <h2 class='titleB' @click="raidersListAll()">职场攻略 <Icon class='iconfont icon-jinru' right size="12" value=":mudocs-icon-communication-voicemail" color="#000"></Icon>
      </h2>
    </div>
    <div class='bgWhite'>
      <List textline="three-line">
        <div v-for='raiders in raidersList.slice(0,6)' :key="raiders.id">
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
    </div>
    <!-- <br />
    <br />
    <br /> 这是首页
    <div @click="raidersList()">职场攻略</div>
    <div @click="jobSearch()">职位搜索</div>
    <div @click="companyInfo()">企业信息展示</div> -->
  </Container>
</template>

<script>
import service from 'service';
import { Toast } from 'mint-ui';
import { Carousel, CarouselItem } from 'muse-ui/lib/Carousel';
import { Paper, Divider, AutoComplete, Icon } from 'muse-ui';
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
      companys: [ ],
      carouselImg1:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg',
      carouselImg2:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg',
      carouselImg3:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg',
      carouselImg4:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg',
      form: {
        keyWord: '',
        area: null
      },
      suitablesLists: [],
      area: [],
      defaultResult: [],
      labelPosition: 'right',
      cid: 1, // 文章分类id,写死
      raidersList: [] // 职场攻略列表
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
    Paper
  },
  computed: {
    areaText () {
      return this.area.length > 0
        ? this.area[this.area.length - 1].label
        : '全国';
    },
    filterResult () {
      return this.defaultResult.filter(value =>
        new RegExp(this.value, 'i').test(value)
      );
    }
  },
  methods: {
    areaHandle () {
      tool.openWin({
        name: 'areaSelector',
        url: '../win.html',
        title: '选择地区',
        fname: 'areaSelector_f',
        furl: './common/areaSelector.html',
        hasLeft: 1,
        data: {
          nameSpace: 'areaSelector',
          area: this.area,
          level: 2,
          callback: (ret, err) => {
            this.area = ret.value;
          }
        }
      });
    },
    // 点击搜索
    search () {
      tool.openWin({
        name: 'jobSearchList',
        url: '../win.html',
        title: '所有职位',
        fname: 'jobSearchList_f',
        furl: './hr/jobSearchList.html',
        hasLeft: 1,
        data: {
          nameSpace: 'jobSearchList',
          area: this.form.area,
          keyWord: this.form.keyWord
        }
      });
    },

    // 获取职位
    async getAllSearchValue () {
      const response = await service.getAllPosition(this.form.keyWord);
      switch (response.code) {
        case 0:
          this.defaultResult = response.result.info;
          break;
        default:
          tool.toast({
            position: 'top',
            message: '搜索失败，请重试'
          });
          break;
      }
    },
    submit () {
      this.search();
    },
    // 名企推荐列表
    async companyRecommend () {
      const response = await service.companyRecommendList({});
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
    // 适合你的职位列表数据
    async listsData () {
      const response = await service.searchBoxValue({
        keyWord: this.keyWord,
        area: this.area
      });
      switch (response.code) {
        case 0:
          this.suitablesLists = response.result.list;
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
    // 跳转到职场攻略页面
    raidersListAll () {
      tool.openWin({
        name: 'raidersList',
        url: '../win.html',
        title: '职场攻略',
        fname: 'raidersList_f',
        furl: './hr/raidersList.html',
        hasLeft: 1
      });
    },
    // 获取职场攻略列表
    async raidersListData () {
      const response = await service.getrRaidersList({ cid: this.cid });
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
    raidersArticle (id) {
      tool.openWin({
        name: 'raidersArticle',
        url: '../win.html',
        title: '',
        fname: 'raidersArticle_f',
        furl: './hr/raidersArticle.html',
        hasLeft: 1,
        hasRight: 1,
        data: {
          id: id
        }
      });
    }
  },
  mounted () {
    this.listsData();
    this.raidersListData();
    this.companyRecommend();
  }
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.container {
  padding: 0;
}
.mu-carousel {
  height: 200px;
  margin-top: 68px;
}

.topSearch {
  position: fixed;
  padding-top: 30px;
  z-index: 999;
  top: 0;
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
  width: 80%;
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

.bgWhite {
  background: #fff;
}

.space15 {
  padding: 15px;
  margin: 15px 0;
}
.titleB {
  border-left: 3px solid #009688;
  font-size: 14px;
  line-height: 1;
  padding-left: 5px;
  margin-top: 0;
  display: flex;
  justify-content: space-between;
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
  display: block;
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

.hotJobs {
  padding: 15px 15px 0;
  margin-top: 15px;
}
.hotJobs h2 {
  margin-bottom: 0;
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
  background: url(../../../assets/img/adv.jpg);
  background-size: 100%;
  width: 100%;
  height: 100px;
  margin: 15px 0;
}
</style>
