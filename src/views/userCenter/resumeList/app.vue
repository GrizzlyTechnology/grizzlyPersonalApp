<template>
  <div class="content">
    <div class="bodyer">
      <CellSwipe v-for="row in list" :key="row.id" class="row" :right="[
          {
            content: '删除',
            style: { background: '#e7585a', color: '#fff' },
            handler: () => {del(row)}
          }
        ]">
        <div class="title" slot="title">{{row.title}}</div>
        <i class="mu-icon icon-left isLink" />
      </CellSwipe>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" v-if="list.length===0" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="create">新增简历</Button>
    </div>
  </div>
</template>

<script>
// import service from 'service';
import { CellSwipe } from 'mint-ui';
import { Button } from 'muse-ui';
import tools from 'util/tools';
// import AreaSelected from 'components/AreaSelected';
export default {
  name: 'userClass',
  data () {
    return {
      list: [
        // {
        //   id: 0,
        //   title: '我的简历1'
        // },
        // {
        //   id: 1,
        //   title: '我的简历2'
        // }
      ]
    };
  },
  components: {
    Button,
    CellSwipe
  },
  methods: {
    create () {
      tools.openWin({
        name: 'resumeDetail',
        url: '../win.html',
        title: '创建简历',
        fname: 'resumeDetail_f',
        furl: './userCenter/resumeDetail.html',
        hasLeft: 1,
        data: {
          nameSpace: 'resumeDetail',
          type: 'create',
          userInfo: {}
        }
      });
    },
    del (data) {
      console.log(data);
    }
  },
  mounted () {}
};
</script>
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
  transform: rotate(180deg);
}
.row {
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
</style>
