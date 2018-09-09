<template>
  <Card>
      <CardTitle v-bind:title="title" class='txc'></CardTitle>
      <Row class='p16'>
        <Col span="4">
        <div class="grid-cell">文章类型:{{type}}</div>
        </Col>
        <Col span="4">
        <div class="grid-cell">作者：{{author}}</div>
        </Col>
        <Col span="4">
        <div class="grid-cell">{{date}}</div>
        </Col>
      </Row>
      <CardText>
        {{con}}
      </CardText>

    </Card>
</template>

<script>
import { Container, Row, Col } from "muse-ui/lib/Grid";
import { CardTitle, CardText } from "muse-ui/lib/Card";
import { Card } from "muse-ui";
export default {
  data() {
    return{
      title:'我是文章标题',
      type:'111',
      author:'大灰熊',
      date:'2016-05-02',
      con:' 散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。 调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。 似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光， 找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！'
    }
  },
  components: {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardText
  },
  methods: {},
  mounted() {}
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
