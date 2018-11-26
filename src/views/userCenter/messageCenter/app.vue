<template>
  <div class="content">
    <!-- <Tabs :value="active" inverse indicator-color="#009688" color="#009688" text-color="rgba(0, 0, 0, .54)" full-width>
      <Tab v-for="(messageList,index) in messageLists" :key="index" @click="changeTab(index)">
        {{messageList.name}}
        <i class='message-tips'>{{messageList.list.length}}</i>
      </Tab>
    </Tabs> -->
    <!-- <TabContainer v-model="active" swipeable class="list-con">
      <TabContainerItem v-for="(messageList,index) in messageLists" :key="index" :id="index" class="message-list"> -->
    <!-- <LoadMore :ref="'container' + index" @refresh="refresh(index)" @load="load(index)" :refreshing="messageList.refreshing" :loading="messageList.loading">
      <div class="message" v-for="message in messageList.list" :key="message.id"> -->
    <div ref="container0" class="list-con">
      <LoadMore @refresh="refresh(0)" @load="load(0)" :refreshing="messageLists[0].refreshing" :loading="messageLists[0].loading">
        <div class="message" v-for="message in messageLists[0].list" :key="message.id">
          <div class="message-head">{{message.sendTimeText}} <span class="unread" v-if="message.is_ready===0" @click="(doHasRead(message))">标为已读</span><span v-if="message.is_ready===1" class="readed">已读</span></div>
          <div class="message-body">{{message.content}}</div>
        </div>
      </LoadMore>
    </div>
    <!-- </TabContainerItem>
    </TabContainer> -->
  </div>
</template>

<script>
import service from 'service';
// import moment from 'moment';
import tools from 'util/tools';
import adapter from 'util/adapter';
import { LoadMore } from 'muse-ui';
// import { Tabs, LoadMore } from 'muse-ui';
// import { Tab } from 'muse-ui/lib/Tabs';
// import { TabContainer, TabContainerItem } from 'mint-ui';

export default {
  data () {
    return {
      // refreshing: false,
      // loading: false,
      active: 0,
      messageLists: [
        {
          name: '全部',
          refreshing: false,
          loading: false,
          page: 1,
          list: []
        }
      ]
    };
  },
  components: {
    // Tabs,
    // Tab,
    LoadMore
    // TabContainer,
    // TabContainerItem
  },
  computed: {
    isLoading () {
      return this.refreshing || this.loading;
    }
  },
  methods: {
    async doHasRead (message) {
      tools.showProgress();
      const response = await service.messageDoRead(message.id);
      tools.hideProgress();
      switch (response.code) {
        case 0:
          message.is_ready = 1;
          break;
        default:
          tools.toast({
            position: 'top',
            message: '标记失败，请稍后重试！！'
          });
          break;
      }
    },
    async getList (active) {
      const response = await service.getMessageList({
        page: this.messageLists[active].page
      });
      // console.log(JSON.stringify(response));
      if (this.messageLists[active].page === 1) {
        this.messageLists[active].refreshing = false;
      }
      if (this.messageLists[active].page > 1) {
        this.messageLists[active].loading = false;
      }
      switch (response.code) {
        case 0:
          if (this.messageLists[active].page === 1) {
            this.messageLists[active].list = response.result.lists.map(
              message => adapter.messageAdapter(message)
            );
          }
          if (this.messageLists[active].page > 1) {
            response.result.lists.forEach(message => {
              this.messageLists[active].list.push(
                adapter.messageAdapter(message)
              );
            });
          }
          break;
        default:
          tools.toast({
            position: 'top',
            message: '列表加载失败，请稍后重试！！'
          });
          break;
      }
    },
    changeTab (index) {
      // if (!this.isLoading) {
      this.active = index;
      // }
    },
    refresh (active) {
      if (
        !this.messageLists[active].refreshing &&
        !this.messageLists[active].loading
      ) {
        this.messageLists[active].page = 1;
        this.messageLists[active].refreshing = true;
        this.$refs[`container${active}`].scrollTop = 0;
        this.getList(active);
      }
    },
    load (active) {
      if (
        !this.messageLists[active].refreshing &&
        !this.messageLists[active].loading
      ) {
        this.messageLists[active].page = this.messageLists[active].page + 1;
        this.messageLists[active].loading = true;
        this.getList(active);
      }
    }
  },
  mounted () {
    this.refresh(this.active);
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.unread {
  float: right;
  color: @danger;
}
.readed {
  float: right;
}
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.list-con {
  flex: 1;
  .mu-load-more{
    min-height: 200px;
  }
  .mint-tab-container-wrap {
    height: 100%;
  }
  .message-list {
    padding: 15px 0 0;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.message {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  .message-head {
    color: #a9a9a9;
    font-size: 12px;
    margin-bottom: 15px;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 15px;
  }
  .message-foot {
    padding-top: 15px;
    color: #666;
    margin-top: 15px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    &:active > * {
      background-color: #eee;
    }
  }
}

.mu-tab-wrapper {
  flex-direction: row;
}

.message-tips {
  border-radius: 14px;
  color: #fff;
  background: red;
  font-style: normal;
  transform: scale(0.6);
  margin-left: 5px;
  padding: 6px;
  font-size: 16px;
  min-width: 14px;
  text-align: center;
  line-height: 14px;
  display: inline-block;
  min-width: 26px;
}
</style>
