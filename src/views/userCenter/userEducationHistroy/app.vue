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
            content: '删除',
            style: { background: '#e7585a', color: '#fff' },
            handler: () => {del(row)}
          }
        ]"
      >
        <div
          class="title"
          slot="title"
          @click="edit(row)"
        >
          {{row.title}}
        </div>
        <i class="mu-icon icon-right isLink" />
      </CellSwipe>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="()=>{}">添加教育经历</Button>
    </div>
  </div>
</template>

<script>
// import service from 'service';
import { CellSwipe } from 'mint-ui';
import { Button } from 'muse-ui';
// import tools from 'util/tools';
// import service from 'service';

// import AreaSelected from 'components/AreaSelected';
export default {
  data () {
    return {
      id: window.api ? window.api.pageParam.id : null,
      list: window.api ? window.api.pageParam.education : []
    };
  },
  components: {
    Button,
    CellSwipe
  },
  methods: {
    edit (data) {

    },
    del (data) {
      alert(data.id + data.name);
    }
  },
  mounted () {
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
