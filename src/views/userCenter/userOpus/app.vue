<template>
  <div class="content">
    <Navbar v-model="tabActive" class="tabHeader">
      <TabItem id="tabContainer0">作品图片</TabItem>
      <TabItem id="tabContainer1">在线作品</TabItem>
    </Navbar>
    <div class="bodyer" id="bodyer">
      <CellSwipe v-if="tabActive==='tabContainer0'" v-for="row in opusPic" :key="row.id" class="opus" :right="[
          {
            content: '删除',
            style: { background: '#e7585a', color: '#fff' },
            handler: () => {del(row)}
          }
        ]">
        <div @click="picEdit(row)" class="opusRow opusPicRow">
          <img v-lazy.bodyer="row.url" class="pic"/>
          <span class="mint-cell-text">{{row.title}}</span>
        </div>
        <i class="mu-icon icon-right isLink" />
      </CellSwipe>
      <CellSwipe v-if="tabActive==='tabContainer1'" v-for="row in opusOnline" :key="row.id" class="opus" :right="[
          {
            content: '删除',
            style: { background: '#e7585a', color: '#fff' },
            handler: () => {del(row)}
          }
        ]">
        <div @click="onlineEdit(row)" class="opusRow">
          <span class="mint-cell-text">{{row.title}}</span>
          <span class="mint-cell-label">{{row.url}}</span>
        </div>
        <i class="mu-icon icon-right isLink" />
      </CellSwipe>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="create">{{tabActive==='tabContainer0'?'创建作品图片':'创建在线作品'}}</Button>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash';
import {
  CellSwipe,
  TabContainer,
  TabContainerItem,
  Navbar,
  TabItem
} from 'mint-ui';
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
      return this.list.filter(r => {
        if (r.type === 0) {
          return r;
        }
      });
    },
    opusOnline () {
      return this.list.filter(r => {
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
        opus: ids,
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
            message: '作品删除失败'
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
          this.list = response.result.internshipExpInfo
            ? response.result.internshipExpInfo.map(row =>
              adapter.internshipAdapter(row)
            )
            : [];
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
        this.list
          .filter(r => {
            if (r.id !== data.id) {
              return r;
            }
          })
          .map(r => r.id)
          .join(',')
      );
    },
    onlineEdit (data) {
      tools.openWin({
        name: 'userOpusOnlineForm',
        url: '../win.html',
        title: '编辑在线作品',
        fname: 'userOpusOnlineForm_f',
        furl: './userCenter/userOpusOnlineForm.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userOpusOnlineForm',
          id: data.id,
          opus: data,
          callback: (ret, err) => {
            this.getList();
          }
        }
      });
    },
    create () {
      const base =
        this.tabActive === 'tabContainer0'
          ? {
            name: 'userOpusPicForm',
            url: '../win.html',
            title: '创建作品图片',
            fname: 'userOpusPicForm_f',
            furl: './userCenter/userOpusPicForm.html'
          }
          : {
            name: 'userOpusOnlineForm',
            url: '../win.html',
            title: '创建在线作品',
            fname: 'userOpusOnlineForm_f',
            furl: './userCenter/userOpusOnlineForm.html'
          };

      tools.openWin({
        ...base,
        hasLeft: 1,
        data: {
          nameSpace:
            this.tabActive === 'tabContainer0'
              ? 'userOpusPicForm'
              : 'userOpusOnlineForm',
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
  padding: 14px 0 0 10px;
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
  padding-top: 18px;
}
</style>
