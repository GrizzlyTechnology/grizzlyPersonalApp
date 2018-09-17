<template>
  <div class="content">
    <div class="bodyer">
      <div class="listCon">
        <CellSwipe class="rowList" v-for="row in list" value="oko" :key="row.id" :right="[
          {
            content: '删除',
            style: { background: '#e7585a', color: '#fff' },
            handler: () => {del(row)}
          }
        ]">
          <div @click="edit(row)">
            <div class="title">
              {{row.title}}
            </div>
            <div class="label">
              {{row.head}}
            </div>
            <i class="mu-icon icon-right isLink" />
          </div>
        </CellSwipe>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="create">添加教育经历</Button>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash';
import { CellSwipe } from 'mint-ui';
import { Button } from 'muse-ui';
import tools from 'util/tools';
import service from 'service';
import adapter from 'util/adapter';

// import AreaSelected from 'components/AreaSelected';
export default {
  data () {
    return {
      id: window.api ? window.api.pageParam.id : null,
      list: [{title: 'sdfsfsdf', head: 'sdfsdf'}]
    };
  },
  components: {
    Button,
    CellSwipe
  },
  methods: {
    async unLink (ids) {
      tools.showProgress();
      const response = await service.updateUserBaesInfo({
        educationExps: ids,
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
            message: '教育经历删除失败'
          });
          break;
      }
    },
    async getList () {
      tools.showProgress();
      const response = await service.getUserEducation({
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.list = response.result.educationExpInfo.map(row =>
            adapter.educationAdapter(row)
          );
          break;
        default:
          tools.toast({
            position: 'top',
            message: '教育经历列表获取失败'
          });
          break;
      }
    },

    del (data) {
      this.unLink(
        this.list.filter(r => {
          if (r.id !== data.id) {
            return r;
          }
        }).map(r => r.id).join(',')
      );
    },
    edit (data) {
      tools.openWin({
        name: 'userEducationForm',
        url: '../win.html',
        title: '编辑教育经历',
        fname: 'userEducationForm_f',
        furl: './userCenter/userEducationForm.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userEducationForm',
          id: data.id,
          education: data,
          callback: (ret, err) => {
            this.getList();
          }
        }
      });
    },
    create () {
      tools.openWin({
        name: 'userEducationForm',
        url: '../win.html',
        title: '创建教育经历',
        fname: 'userEducationForm_f',
        furl: './userCenter/userEducationForm.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userEducationForm',
          resumeId: this.id,
          callback: (ret, err) => {
            this.getList();
          }
        }
      });
    }
  },
  mounted () {
    this.getList();
  }
};
</script>
<style lang="less">
.rowList {
  .mint-cell-wrapper {
    background-image: none;
  }
  .mint-cell-title {
    display: none;
  }
  .mint-cell-value {
    display: block;
    width: 100%;
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
  top: 19px;
  right: 15px;
  font-size: 16px;
}
.rowList {
  border-bottom: 1px @grayLine solid;
  font-size: 16px;
  background-color: #fff;
  height: 56px;
  &:active {
    background-color: #eee;
  }
  .title {
    color: #333;
    padding-top: 9px;
    .ell();
  }
  .label {
    font-size: 14px;
    padding-top: 5px;
  }
}
.footer {
  height: 44px;
}
</style>
