<template>
  <Container>
      <Row>
          <Col span="3" offset="9" @click="systemSet">
          设置
          </Col>
      </Row>
    <Row class="wrapper" align-items="center">
        <Flex class="headpic" justify-content="center" fill>
            <Paper class="paper" circle :z-depth="1"></Paper>
        </Flex>
    <Flex class="info" justify-content="center" fill>
        <div class="nickname">{{userInfo.nickname}}</div>
        <div class="atter">无锡职业技术学院<span class="atter-more">计算机32102班</span></div>
    </Flex>
  </Row>
  </Container>
</template>

<script>
import tool from 'util/tools';
import { Container, Row, Col, Flex} from 'muse-ui/lib/Grid';
import Paper from 'muse-ui/lib/Paper';

export default {
  data () {
    return {
      userInfo: tool.getStorage('userInfo')
    };
  },
  components: {
    Container,
    Row,
    Col,
    Flex,
    Paper
  },
  methods: {
    systemSet () {
      window.api.openWin({
        name: 'systemSet',
        url: '../index/win.html',
        bounces: false,
        pageParam: {
          wtitle: '系统设置',
          fname: 'systemSet_f',
          furl: '../userCenter/systemSet.html',
          hasLeft: 1,
          hasRight: 0
        }
      });
    }
  },
  mounted () {
    tool.fixStatusBar(tool.dom('.container'));
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
    .container{
        padding: 20px;
        background: @baseColor;
        height: 150px;
        .headpic{
            height: 80px;
            width: 90px;
            .paper{
                height: 80px;
                width: 80px;
                // background-image: url('../../../assets/images/headpic.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
            }
        }
        .row{
            .col{
                line-height: 40px;
                text-align: right;
                color:@grayFont;
                font-size: @h3;
            }
        }
        .info{
            line-height: 30px;
            color:@grayFont;
            .nickname{
                font-size: @h1;
            }
            .atter{
                font-size: @h3;
                color:@grayFontSmallTil;
                .atter-more{
                    margin-left: 5px;
                }
            }
        }

    }
</style>
