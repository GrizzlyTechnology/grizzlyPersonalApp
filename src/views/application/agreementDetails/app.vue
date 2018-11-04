<template>
  <div>
    <List class='whiteBg'>
      <ListItem>
        <ListItemContent>
          <ListItemTitle>
            {{companyName}}
          </ListItemTitle>
          <ListItemSubTitle>
            <span>{{department}}</span>
            <span>{{group}}</span>
            <span class='companyInfo' @click="companyInfo(enterpriseId)">查看详情></span>
          </ListItemSubTitle>
        </ListItemContent>
      </ListItem>
    </List>
    <ImagesPopup ref="imagesPopup" :urlList="this.agreementImgs" :index="urlListIndex"></ImagesPopup>
    <Row class='whiteBg space15' gutter>
        <div v-for='(agreementImg,index) in agreementImgs' v-show="agreementImgs.length > 0" :key='agreementImg.index'>
          <Col span="6" @click='imagesPopupOpen(agreementImg,index)' >
          <div class="grid-cell">
            <img :src="agreementImg" alt="">
          </div>
          </Col>
        </div>
        <div v-show='agreementImgs.length === 0' class='noCon'>
          <span>暂无协议</span>
          <Button color="primary">立即上传</Button>
        </div>
    </Row>
  </div>
</template>

<script>
import { Dialog, Button } from 'muse-ui';
import { Row, Col } from 'muse-ui/lib/Grid';
import {
  List,
  ListItem,
  ListAction,
  ListItemSubTitle,
  ListItemContent,
  ListItemTitle,
  ListItemAfterText
} from 'muse-ui/lib/List';
import ImagesPopup from 'components/ImagesPopup';
// import { Row, Col, Container } from 'muse-ui/lib/Grid';
import tool from 'util/tools';
export default {
  data () {
    return {
      companyName: '大灰熊科技有限公司',
      department: '技术部',
      group: '前端组',
      agreementImgs: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg',
        'http://img.zcool.cn/community/0125fd5770dfa50000018c1b486f15.jpg@1280w_1l_2o_100sh.jpg',
        'http://pic29.nipic.com/20130511/9252150_174018365301_2.jpg',
        'http://pic19.nipic.com/20120308/4970979_102637717125_2.jpg'
      ],
      urlListIndex: 0
    };
  },
  components: {
    List,
    ListItem,
    ListAction,
    ListItemSubTitle,
    ListItemContent,
    ListItemTitle,
    ListItemAfterText,
    Row,
    Col,
    Dialog,
    Button,
    ImagesPopup
  },
  methods: {
    imagesPopupOpen (list, index) {
      // this.agreementImgs = list.map((r, i) => {
      //   return r.url;
      // });
      this.urlListIndex = index;
      this.$refs.imagesPopup.open();
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
    }
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.whiteBg {
  background: #fff;
}

.mu-item-sub-title {
  margin-top: 5px;
}

.mu-item-sub-title span {
  margin-right: 15px;
}

.companyInfo {
  color: #009688;
}
.space15 {
  padding: 15px;
  margin: 15px 0;
}

.grid-cell img {
  width: 100%;
}

.pDialog .mu-dialog-body img {
  width: 100%;
}

.noCon {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.noCon span {
  color: #ccc;
  height: 100px;
  line-height: 100px;
}
</style>
