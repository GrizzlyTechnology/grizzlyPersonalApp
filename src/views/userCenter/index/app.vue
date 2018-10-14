<template>
  <div class="content">
    <div class="ucHeader">
      <div class="ucAvatar" :style="{backgroundImage:'url:(\'' + headphoto + '\')'}"></div>
      <span class="ucNickname">{{nickname}}
        <Icon :size="16" :value="sex===1?':icon-nan2':':icon-nv1'" :color="sex===1?'#61bce8':'#fd7777'" /></span>
      <span class="ucSchoole">镇江高等专科学校 <span class="ucClass">电气系 / 电气专业</span></span>
      <span class="ucSetting" @click="setting">
        <Icon :size="14" value=":el-icon-setting" color="#FFF" />
        设置
      </span>
    </div>
    <div class="bodyer">
      <Cell class="ucCell">
        <div class="ucCellCon" @click="studentInfo">
          <span class="ucCellTitle">学籍管理</span>
        </div>
        <i class="mu-icon icon-right isLink" />
        <Icon slot="icon" value=":el-icon-setting" :size="28" color="#999" />
      </Cell>
      <Cell class="ucCell">
        <div class="ucCellCon" @click="resumeList">
          <span class="ucCellTitle">简历管理</span>
        </div>
        <i class="mu-icon icon-right isLink" />
        <Icon slot="icon" value=":el-icon-setting" :size="28" color="#999" />
      </Cell>
    </div>
  </div>
</template>

<script>
import { Icon } from 'muse-ui';
import { Cell } from 'mint-ui';
import tools from 'util/tools';
import service from 'service';

export default {
  data () {
    return {
      nickname: '暂无',
      sex: 1,
      headphoto: '../../../assets/img/headpic.png'
    };
  },
  components: {
    Icon,
    Cell
  },
  methods: {
    async getUserinfo () {
      tools.showProgress();
      const response = await service.getUserInfo();
      tools.hideProgress();
      switch (response.code) {
        case 0:
          console.log(JSON.stringify(response));
          this.nickname = response.result.userInfo.nickname;
          this.sex = response.result.userInfo.sex;
          this.headphoto = response.result.userInfo.headphoto || this.headphoto;
          break;
        default:
          tools.toast({
            position: 'top',
            message: '用户信息获取失败'
          });
          break;
      }
    },
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
    setting () {
      tools.openWin({
        name: 'setting',
        url: '../win.html',
        title: '设置',
        fname: 'setting_f',
        furl: './userCenter/setting.html',
        hasLeft: 1,
        data: {
          nameSpace: 'setting',
          callback: (ret, err) => {
            this.getUserinfo();
          }
        }
      });
    }
  },
  mounted () {
    this.getUserinfo();
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
  // background-image: url("../../../assets/img/headpic.png");
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
  .ucCellCon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    &:active {
      background-color: #eee;
    }
    .ucCellTitle {
      line-height: 56px;
      color: #333;
      margin-left: 48px;
    }
  }
  .mu-icon {
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
</style>
