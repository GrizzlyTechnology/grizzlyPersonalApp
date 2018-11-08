<template>
  <div class="content">
    <div class="bodyer">
      <div class="listCon">
      <CellSwipe
        class="rowList"
        v-for="row in list"
        :key="row.id"
        :right="[
          {
            content: '设为默认',
            style: { background: '#07A9EA', color: '#fff' },
            handler: () => {setDefault(row)}
          },          {
            content: '删除',
            style: { background: '#e7585a', color: '#fff' },
            handler: () => {del(row)}
          }
        ]"
      >
        <div
          class="title"
          slot="title"
        >
          {{row.title}}
        </div>
        <i class="mu-icon icon-right isLink" />
      </CellSwipe>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="create">创建学籍</Button>
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
  data () {
    return {
      userInfo: {},
      list: []
    };
  },
  components: {
    Button,
    CellSwipe
  },
  methods: {
    async getList () {
      alert('addEventListener');
      // tools.showProgress();
      // const response = await service.getUserBaseInfo();
      // tools.hideProgress();
      // // console.log(JSON.stringify(response));
      // switch (response.code) {
      //   case 0:
      //     this.list = response.result.resumeInfo.length > 0 ? [response.result.resumeInfo[0]] : [];
      //     break;
      //   default:
      //     tools.toast({
      //       position: 'top',
      //       message: '简历列表获取失败'
      //     });
      //     break;
      // }
    },

    async create () {
      tools.openWin({
        name: 'studentInfo',
        url: '../win.html',
        title: '选择地区',
        fname: 'studentInfo_f',
        furl: './userCenter/userArea.html',
        hasLeft: 1
      });
    },

    del (data) {
      alert(data.id + data.name);
    },
    setDefault (data) {

    }
  },
  mounted () {
    tools.addEventListener(
      {
        name: 'studentInfoListCallback'
      },
      (ret, err) => {
        this.getList();
      }
    );
    this.getList();
  }
};
</script>
<style lang="less">
.rowList{
  .mint-cell-wrapper {
    background-image: none;
  }
  .mint-cell-swipe-button{
    line-height: 56px;
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
  top: 18px;
  right: 15px;
  font-size: 16px;
}
.rowList {
  font-size: 16px;
  background-color: #fff;
  height: 56px;
  &:active {
    background-color: #eee;
  }
  .title {
    .ell();
    padding: 0 15px;
    line-height: 56px;
  }
}
.footer{
  height: 44px;
}
</style>
