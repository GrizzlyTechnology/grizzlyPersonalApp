<template>
  <div class="content">
    <div class="bodyer" id="bodyer">
      <CellSwipe v-for="row in list" :key="row.id" class="opus" :right="[
          {
            content: '删除',
            style: { background: '#e7585a', color: '#fff' },
            handler: () => {del(row)}
          }
        ]">
        <div @click="edit(row)" class="opusRow opusPicRow">
          <img v-lazy.bodyer="row.reslist.length > 0?row.reslist[0].coverUrl:''" class="pic"/>
          <span class="mint-cell-text">{{row.title}}</span>
          <span class="mint-cell-label">{{row.honorDateText}}</span>
        </div>
        <i class="mu-icon icon-right isLink" />
      </CellSwipe>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="create">添加荣誉展示</Button>
    </div>
  </div>
</template>
<script>
// import _ from 'lodash';
import { CellSwipe } from 'mint-ui';
import { Button } from 'muse-ui';
// import { Form, FormItem } from 'muse-ui/lib/Form';

import tools from 'util/tools';
import service from 'service';
import adapter from 'util/adapter';

export default {
  data () {
    return {
      id: window.api ? window.api.pageParam.id : null,
      list: []
    };
  },
  components: {
    Button,
    CellSwipe
  },

  methods: {
    async getList () {
      tools.showProgress();
      const response = await service.getUserHonor({
        resumeId: this.id
      });
      tools.hideProgress();
      // console.log(JSON.stringify(response));
      switch (response.code) {
        case 0:
          this.list = response.result.honorInfo
            ? response.result.honorInfo.map(row => adapter.honorAdapter(row))
            : [];
          break;
        default:
          tools.toast({
            position: 'top',
            message: '荣誉获取失败'
          });
          break;
      }
    },
    async updateHonor (honors) {
      tools.showProgress();
      const response = await service.updateUserBaesInfo({
        honors,
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.getList();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '荣誉删除失败'
          });
          break;
      }
    },
    del (data, index) {
      // tools.confirm({
      //   title: '确认',
      //   content: `删除 ${data.label} 技能？`,
      //   callback: () => {
      this.updateHonor(
        JSON.stringify(
          this.list
            .filter(r => {
              if (r.label !== data.label) {
                return r;
              }
            })
            .map(r => r.id)
            .join(',')
        )
      );
      //   }
      // });
    },
    edit (data) {
      tools.openWin({
        name: 'userHonorForm',
        url: '../win.html',
        title: '编辑荣誉评估',
        fname: 'userHonorForm_f',
        furl: './userCenter/userHonorForm.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userHonorForm',
          id: data.id,
          honor: data,
          callback: (ret, err) => {
            this.getList();
          }
        }
      });
    },
    create () {
      tools.openWin({
        name: 'userHonorForm',
        url: '../win.html',
        title: '创建荣誉评估',
        fname: 'userHonorForm_f',
        furl: './userCenter/userHonorForm.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userHonorForm',
          resumeId: this.id,
          callback: (ret, err) => {
            this.getList();
          }
        }
      });
    }
    // cancel () {
    //   this.isShow = false;
    //   this.curRow = -1;
    //   this.$refs.form.clear();
    // },
    // confirm () {
    //   this.$refs.form.validate().then(result => {
    //     if (result === true) {
    //       const list = [...this.list];
    //       if (this.isEdit === true) {
    //         list[this.curRow] = this.form;
    //       } else {
    //         list.push(this.form);
    //       }
    //       this.updateSkills(JSON.stringify(list));
    //     }
    //   });
    // }
  },
  mounted () {
    this.getList();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.opus {
  .mint-cell-wrapper {
    background-image: none;
    border-bottom: 1px solid #eee;
    height: 56px;
  }
  .mint-cell-swipe-button {
    line-height: 56px;
  }
  &:active {
    background-color: #eee;
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
.footer {
  height: 44px;
}
.isLink {
  position: absolute;
  top: 19px;
  font-size: 16px;
  right: 15px;
}
.opusRow {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 10px 0 0 10px;
  .mint-cell-text {
    color: #333;
  }
}
.pic {
  position: absolute;
  height: 56px;
  width: 56px;
  left: 0;
  top: 0;
}
.opusPicRow {
  padding-left: 65px;
}
</style>
