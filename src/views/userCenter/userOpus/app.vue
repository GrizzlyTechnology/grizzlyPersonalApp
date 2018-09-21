<template>
  <div class="content">
    <div class="bodyer">
      <Navbar v-model="tabActive" class="tabHeader">
        <TabItem id="tabContainer0">作品图片</TabItem>
        <TabItem id="tabContainer1">在线作品</TabItem>
      </Navbar>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="create">添加实习经历</Button>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash';
import { CellSwipe, TabContainer, TabContainerItem, Navbar, TabItem } from 'mint-ui';
import { Button } from 'muse-ui';
import tools from 'util/tools';
import service from 'service';
import adapter from 'util/adapter';

// import AreaSelected from 'components/AreaSelected';
export default {
  data () {
    return {
      tabActive: 'tabContainer0',
      id: window.api ? window.api.pageParam.id : null,
      // list: []
      list: [
        {
          id: 0,
          uid: 0,
          title: '图片作品',
          type: 0,
          url:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537412951566&di=18b588c557aed8fe9d47927c1d8dfde7&imgtype=0&src=http%3A%2F%2Fs11.sinaimg.cn%2Fmw690%2F006qsdYzzy78Eo0oJXI6a%26690'
        },
        {
          id: 1,
          uid: 0,
          type: 1,
          title: '线上作品',
          url: 'https://www.baidu.com'
        },
        {
          id: 2,
          uid: 0,
          title: '图片作品',
          type: 0,
          url:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537412951566&di=18b588c557aed8fe9d47927c1d8dfde7&imgtype=0&src=http%3A%2F%2Fs11.sinaimg.cn%2Fmw690%2F006qsdYzzy78Eo0oJXI6a%26690'
        },
        {
          id: 3,
          uid: 0,
          type: 1,
          title: '线上作品',
          url: 'https://www.baidu.com'
        },
        {
          id: 4,
          uid: 0,
          title: '图片作品',
          type: 0,
          url:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537412951566&di=18b588c557aed8fe9d47927c1d8dfde7&imgtype=0&src=http%3A%2F%2Fs11.sinaimg.cn%2Fmw690%2F006qsdYzzy78Eo0oJXI6a%26690'
        },
        {
          id: 5,
          uid: 0,
          type: 1,
          title: '线上作品',
          url: 'https://www.baidu.com'
        },
        {
          id: 6,
          uid: 0,
          title: '图片作品',
          type: 0,
          url:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537412951566&di=18b588c557aed8fe9d47927c1d8dfde7&imgtype=0&src=http%3A%2F%2Fs11.sinaimg.cn%2Fmw690%2F006qsdYzzy78Eo0oJXI6a%26690'
        },
        {
          id: 7,
          uid: 0,
          type: 1,
          title: '线上作品',
          url: 'https://www.baidu.com'
        }
      ]
    };
  },
  components: {
    Button,
    CellSwipe,
    TabContainer,
    TabContainerItem,
    Navbar,
    TabItem
  },
  computed: {
    opusPic () {
      return this.opus.filter(r => {
        if (r.type === 0) {
          return r;
        }
      });
    },
    opusOnline () {
      return this.opus.filter(r => {
        if (r.type === 1) {
          return r;
        }
      });
    }
  },
  methods: {
    async unLink (ids) {
      tools.showProgress();
      const response = await service.updateUserBaesInfo({
        internShipExps: ids,
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
            message: '实习经历删除失败'
          });
          break;
      }
    },
    async getList () {
      tools.showProgress();
      const response = await service.getUserInternship({
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.list = response.result.internshipExpInfo ? response.result.internshipExpInfo.map(row =>
            adapter.internshipAdapter(row)
          ) : [];
          break;
        default:
          tools.toast({
            position: 'top',
            message: '实习经历列表获取失败'
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
        name: 'userInternshipForm',
        url: '../win.html',
        title: '编辑实习经历',
        fname: 'userInternshipForm_f',
        furl: './userCenter/userInternshipForm.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userInternshipForm',
          id: data.id,
          internship: data,
          callback: (ret, err) => {
            this.getList();
          }
        }
      });
    },
    create () {
      tools.openWin({
        name: 'userInternshipForm',
        url: '../win.html',
        title: '创建实习经历',
        fname: 'userInternshipForm_f',
        furl: './userCenter/userInternshipForm.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userInternshipForm',
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
@import url("../../../assets/css/base.less");
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
.tabHeader {
  .mint-tab-item-label {
    color: #666;
    font-size: 14px;
  }
  .is-selected {
    .mint-tab-item-label {
      color: @baseColor;
    }
  }
  .mint-tab-item {
    border-bottom: 1px solid #ddd;
  }
  .mint-tab-item.is-selected {
    border-bottom: 1px solid @baseColor;
    margin-bottom: 0;
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
