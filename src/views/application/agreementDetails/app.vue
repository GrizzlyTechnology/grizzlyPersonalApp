<template>
  <div>
    <List class='whiteBg'>
      <ListItem>
        <ListItemContent>
          <ListItemTitle>
            大灰熊科技有限公司
            <!-- {{companyName}} -->
          </ListItemTitle>
          <ListItemSubTitle>
            <span>技术部 </span>
            <span>研发组</span>
            <span class='companyInfo'>查看详情></span>
          </ListItemSubTitle>
        </ListItemContent>
      </ListItem>
    </List>
    <!-- <div>

    </div> -->
    <Row class='whiteBg space15' gutter>
      <Col span="6" @click="openSimpleDialog">
      <div class="grid-cell">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt="">
      </div>
      <Dialog width="560" :open.sync="openSimple" class='pDialog'>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt="">
        <Button slot="actions" flat color="primary" @click="closeSimpleDialog">Close</Button>
      </Dialog>
      </Col>
      <Col span="6">
      <div class="grid-cell">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt="">
      </div>
      </Col>
      <Col span="6">
      <div class="grid-cell">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt="">
      </div>
      </Col>
      <Col span="6">
      <div class="grid-cell">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg" alt="">
      </div>
      </Col>
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
// import { Row, Col, Container } from 'muse-ui/lib/Grid';
// import tool from 'util/tools';
export default {
  data () {
    return {
      openSimple: false
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
    Button
  },
  methods: {
    openSimpleDialog () {
      this.openSimple = true;
    },
    closeSimpleDialog () {
      this.openSimple = false;
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

.pDialog .mu-dialog-body img{
  width: 100%;
}
</style>
