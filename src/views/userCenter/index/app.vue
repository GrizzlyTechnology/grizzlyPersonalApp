<template>
  <div class="content">
    <div class="ucHeader">
      <div class="ucAvatar"></div>
      <span class="ucNickname">人头原子弹
        <Icon :size="16" value=":icon-nv1" color="#FFF" /></span>
      <span class="ucSchoole">镇江高等专科学校 <span class="ucClass">电气系 / 电气专业</span></span>
      <span class="ucSetting" @click="systemSet">
        <Icon :size="14" value=":el-icon-setting" color="#FFF" />
        设置
      </span>
    </div>
    <div class="bodyer">
      <Cell class="ucCell">
        <div class="ucCellCon" @click="studentInfo">
          <span class="ucCellTitle">完善学生信息</span>
        </div>
        <i class="mu-icon icon-right isLink" />
        <Icon slot="icon" value=":el-icon-setting" :size="28" color="#999"/>
      </Cell>
      <Cell class="ucCell" icon="../../../assets/img/headpic.png">
        <div class="ucCellCon" @click="resumeList">
          <span class="ucCellTitle">简历管理</span>
        </div>
        <i class="mu-icon icon-right isLink" />
        <Icon slot="icon" value=":el-icon-setting" :size="28" color="#999"/>
      </Cell>
    </div>
  </div>
  <!-- <Container>
    <Row>
      <Col span="3" offset="9" @click="systemSet"> 设置
      </Col>
    </Row>
    <Row class="wrapper" align-items="center">
      <Flex class="headpic" justify-content="center" fill>
        <Paper class="paper" circle :z-depth="1"></Paper>
      </Flex>
      <Flex class="info" justify-content="center" fill>
        <div class="nickname">nickname</div>
        <div class="atter">无锡职业技术学院
          <span class="atter-more">计算机32102班</span>
        </div>
      </Flex>
    </Row>
    <Button full-width large class="buttom" color="red" @click="studentInfo">完善学生信息</Button>
    <Button full-width large class="buttom" color="red" @click="resumeList">简历管理</Button>

  </Container> -->
</template>

<script>
import { Icon } from 'muse-ui';
import { Cell } from 'mint-ui';
import tools from 'util/tools';

export default {
  data () {
    return {
      userInfo: tools.getStorage('userInfo')
    };
  },
  components: {
    Icon,
    Cell
  },
  methods: {
    studentInfo () {
      tools.openWin({
        name: 'userArea',
        url: '../win.html',
        title: '选择地区',
        fname: 'userArea_f',
        furl: './userCenter/userArea.html',
        hasLeft: 1
      });
    },
    resumeList () {
      tools.openWin({
        name: 'resumeList',
        url: '../win.html',
        title: '简历管理',
        fname: 'resumeList_f',
        furl: './userCenter/resumeList.html',
        hasLeft: 1
      });
    },
    systemSet () {
      tools.openWin({
        name: 'systemSet',
        url: '../win.html',
        title: '系统设置',
        fname: 'systemSet_f',
        furl: './userCenter/systemSet.html',
        hasLeft: 1
      });
    }
  },
  mounted () {
    //tools.fixStatusBar(tools.dom('.ucHeader'));
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.ucHeader {
  background-color: @baseColor;
  height: 140px;
  position: relative;
  color: #fff;
}
.ucAvatar {
  position: absolute;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: #fff;
  background-image: url("../../../assets/img/headpic.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  left: 20px;
  top: 40px;
}
.ucNickname {
  position: absolute;
  font-size: 18px;
  left: 120px;
  top: 55px;
}
.ucSchoole {
  position: absolute;
  font-size: 16px;
  left: 120px;
  top: 85px;
}
.ucClass {
  font-size: 12px;
}
.ucSetting {
  position: absolute;
  right: 20px;
  top: 20px;
}
.ucCell {
  position: relative;
  .ucCellCon{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    &:active {
      background-color: #eee;
    }
    .ucCellTitle{
      line-height: 56px;
      color: #333;
      margin-left: 48px;
    }
  }
  .mu-icon{
    z-index: 1;
    position: relative;
  }
  .mint-cell-wrapper {
    background-image: none;
    border-bottom: 1px solid #eee;
    height: 56px;
  }
  .isLink {
    position: absolute;
    top: 19px;
    font-size: 16px;
    right: 15px;
  }
}
// .container {
//   padding: 20px;
//   background: @baseColor;
//   height: 110px;
//   .headpic {
//     height: 80px;
//     width: 90px;
//     .paper {
//       height: 80px;
//       width: 80px;
//       background-image: url("../../../assets/img/headpic.png");
//       background-repeat: no-repeat;
//       background-position: center;
//       background-size: cover;
//     }
//   }
//   .row {
//     .col {
//       line-height: 40px;
//       text-align: right;
//       color: @grayFont;
//       font-size: @h3;
//     }
//   }
//   .info {
//     line-height: 30px;
//     color: @grayFont;
//     .nickname {
//       font-size: @h1;
//     }
//     .atter {
//       font-size: @h3;
//       color: @grayFontSmallTil;
//       .atter-more {
//         margin-left: 5px;
//       }
//     }
//   }
// }
</style>
