<template>
  <div class="content">
    <div class="bodyer">
      <div class="listCon">
      <CellSwipe v-for="row in list" :key="row.id" class="rowList" :right="[
          {
            content: '删除',
            style: { background: '#e7585a', color: '#fff' },
            handler: () => {del(row)}
          }
        ]">
        <div class="title" slot="title">{{row.id}}{{row.name}}</div>
        <i class="mu-icon icon-right isLink" />
      </CellSwipe>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff"  :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="create">创建简历</Button>
    </div>
  </div>
</template>

<script>
// import service from 'service';
import { CellSwipe } from 'mint-ui';
import { Button } from 'muse-ui';
import tools from 'util/tools';
import service from 'service';

// import AreaSelected from 'components/AreaSelected';
export default {
  name: 'userClass',
  data () {
    return {
      userInfo: {},
      list: [
        // { id: 1 },
        // { id: 2 },
        // { id: 3 },
        // { id: 4 },
        // { id: 5 },
        // { id: 6 },
        // { id: 7 },
        // { id: 8 },
        // { id: 9 },
        // { id: 11 },
        // { id: 12 },
        // { id: 13 },
        // { id: 14 },
        // { id: 15 },
        // { id: 16 },
        // { id: 17 },
        // { id: 18 },
        // { id: 19 },
        // { id: 111 },
        // { id: 112 },
        // { id: 113 },
        // { id: 114 },
        // { id: 115 },
        // { id: 116 },
        // { id: 117 },
        // { id: 118 },
        // { id: 119 }
      ]
    };
  },
  components: {
    Button,
    CellSwipe
  },
  methods: {
    async getList () {
      tools.showProgress();
      const response = await service.getUserBaseInfo();
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.list = response.result.resumeInfo;
          break;
        default:
          tools.toast({
            position: 'top',
            message: '简历列表获取失败'
          });
          break;
      }
    },
    async create () {
      // 获取用户信息补充基本信息
      tools.showProgress();
      const response = await service.getUserInfo();
      tools.hideProgress();
      let baseInfo = {
        name: '',
        sex: '',
        phone: ''
      };
      switch (response.code) {
        case 0:
          baseInfo = {
            name: response.result.userInfo.name || '',
            sex: response.result.userInfo.sex,
            phone: response.result.userInfo.phone
          };
          break;
        default:
          break;
      }

      // 创建我的基本信息
      tools.openWin({
        name: 'userBaseInfo',
        url: '../win.html',
        title: '基本信息',
        fname: 'userBaseInfo_f',
        furl: './userCenter/userBaseInfo.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userBaseInfo',
          type: 'create',
          baseInfo: {
            name: '', // true string 真实姓名
            sex: 1, // true string 性别
            birthday: null, // true string生日
            houseHold: [], // true string 籍贯
            address: [],
            street: '',
            phone: '', // true string手机
            email: '', // true string 邮箱
            ...baseInfo
          }
        }
      });
    },
    del (data) {
      alert(data.id + data.name);
    }
  },
  mounted () {
    if (window.api) {
      window.api.addEventListener(
        {
          name: 'resumeListCallback'
        },
        (ret, err) => {
          this.getList();
        }
      );
    }
    this.getList();
  }
};
</script>
<style lang="less">
.rowList{
    .mint-cell-wrapper {
    background-image: none;
  }
}
</style>

<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.content {
  // padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.bodyer {
  flex: 1;
  overflow: auto;
}
.isLink {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 16px;
}
.rowList {
  font-size: 16px;
  border-bottom: 1px @grayLine solid;
  background-color: #fff;
  &:active {
    background-color: #eee;
  }
  .title {
    .ell();
    padding: 0 15px;
  }
}
.footer{
  height: 44px;
}
</style>
