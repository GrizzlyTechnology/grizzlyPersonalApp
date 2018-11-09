<template>
  <Card>
      <CardTitle v-bind:title="title" class='txc'></CardTitle>
      <Row class='p16'>
        <Col span="6">
        <div class="grid-cell">来源：{{source}}</div>
        </Col>
        <Col span="6">
        <div class="grid-cell">{{date}}</div>
        </Col>
      </Row>
      <CardText v-html='con'>
      </CardText>

    </Card>
</template>

<script>
import { Toast } from 'mint-ui';
import { Container, Row, Col } from 'muse-ui/lib/Grid';
import { CardTitle, CardText } from 'muse-ui/lib/Card';
import { Card } from 'muse-ui';
import service from 'service';
export default {
  data () {
    return {
      ArticleId: window.api.pageParam.id,
      title: '',
      source: '',
      date: '',
      con: ''
    };
  },
  components: {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardText
  },
  methods: {
    async raidersArticleData () {
      const response = await service.getRaidersArticleData({ ArticleId: this.ArticleId });
      switch (response.code) {
        case 0:
          this.title = response.result.title;
          this.source = response.result.source;
          this.date = response.result.date;
          this.con = response.result.con;
          break;
        default:
          Toast({
            position: 'top',
            message: '获取失败，请稍后重试！！'
          });
          break;
      }
    }
  },
  mounted () {
    this.raidersArticleData();
  }
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.p16 {
  padding: 0 16px;
}

.txc .mu-card-title,.grid-cell{
  text-align: center;
}

.grid-cell {
  color: #999;
}
</style>
