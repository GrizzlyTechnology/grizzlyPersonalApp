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
        <Col span="4">
        <div class="grid-cell"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt=""></div>
        </Col>
        <Col span="4">
        <div class="grid-cell"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt=""></div>

        </Col>
        <Col span="4">
        <div class="grid-cell"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt=""></div>

        </Col>
      </Row>
      <Row class='mqtj' gutter>
        <Col span="4">
        <div class="grid-cell"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt=""></div>
        </Col>
        <Col span="4">
        <div class="grid-cell"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt=""></div>

        </Col>
        <Col span="4">
        <div class="grid-cell"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt=""></div>

        </Col>
      </Row>
    </div>
    <br />
    <br />
    <br /> 这是首页
    <div @click="raidersList()">职场攻略</div>
    <div @click="jobSearch()">职位搜索</div>
    <div @click="companyInfo()">企业信息展示</div>
  </Container>
</template>

<script>
import service from 'service';
import { Carousel, CarouselItem } from 'muse-ui/lib/Carousel';
import { AutoComplete } from 'muse-ui';
import { Container, Row, Col } from 'muse-ui/lib/Grid';
import tool from 'util/tools';
export default {
  data () {
    return {
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
      area: [],
      defaultResult: [],
      labelPosition: 'right'
    };
  },
  components: {
    Carousel,
    CarouselItem,
    AutoComplete,
    Container,
    Row,
    Col
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
    raidersList () {
      tool.openWin({
        name: 'raidersList',
        url: '../win.html',
        title: '职场攻略',
        fname: 'raidersList_f',
        furl: './hr/raidersList.html',
        hasLeft: 1
      });
    },
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
    jobSearch () {
      tool.openWin({
        name: 'jobSearch',
        url: '../win.html',
        title: '职位搜索',
        fname: 'jobSearch_f',
        furl: './hr/jobSearch.html',
        hasLeft: 1
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
}

.mqtj img {
  width: 100%;
}
</style>
