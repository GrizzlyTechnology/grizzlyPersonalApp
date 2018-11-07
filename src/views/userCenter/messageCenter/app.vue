<template>
  <div class="content">
    <Tabs :value="active" inverse indicator-color="#009688" color="#009688" text-color="rgba(0, 0, 0, .54)" full-width>
      <Tab v-for="(messageList,index) in messageLists" :key="index" @click="changeTab(index)">
        {{messageList.name}}
        <i class='message-tips'>{{messageList.list.length}}</i>
      </Tab>
    </Tabs>
    <TabContainer v-model="active" swipeable class="list-con">
      <TabContainerItem v-for="(messageList,index) in messageLists" :ref="'container' + index" :key="index" :id="index" class="message-list">
        <LoadMore @refresh="refresh" @load="load" :refreshing="messageList.refreshing" :loading="messageList.loading">
          <div class="message" v-for="message in messageList.list" :key="message.id">
            <div class="message-head">{{message.date}} {{message.class}}</div>
            <div class="message-body">{{message.con}}</div>
            <div class="message-foot"><span>查看详情</span></div>
          </div>
        </LoadMore>
      </TabContainerItem>
    </TabContainer>
  </div>
</template>

<script>
import { Tabs, LoadMore } from 'muse-ui';
import { Tab } from 'muse-ui/lib/Tabs';
import { TabContainer, TabContainerItem } from 'mint-ui';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemTitle,
  ListItemSubTitle
} from 'muse-ui/lib/List';

export default {
  data () {
    return {
      refreshing: false,
      loading: false,
      active: 0,
      messageLists: [
        {
          name: '全部',
          page: 1,
          refreshing: false,
          loading: false,
          list: [
            {
              id: 0,
              date: '2018年5月10日',
              class: '系统消息',
              imgSrc: '../../../assets/img/gz.jpg',
              con:
                '恭喜小哥哥/小姐姐，您今天又被10个人关注啦！需要再接 再厉哦，继续分享更多的小消息给大家吧！'
            },
            {
              id: 1,
              date: '2018年11月10日',
              class: '系统消息',
              con: 'gjghjghj33453453453453453454！'
            },
            {
              id: 2,
              date: '2018年3月10日',
              class: '系统消息',
              con: 'sdfgsdfsdfsdfsdf！'
            },
            {
              id: 3,
              date: '2018年5月10日',
              class: '系统消息',
              imgSrc: '../../../assets/img/gz.jpg',
              con:
                '恭喜小哥哥/小姐姐，您今天又被10个人关注啦！需要再接 再厉哦，继续分享更多的小消息给大家吧！'
            },
            {
              id: 4,
              date: '2018年11月10日',
              class: '系统消息',
              con: 'gjghjghj33453453453453453454！'
            },
            {
              id: 5,
              date: '2018年3月10日',
              class: '系统消息',
              con: 'sdfgsdfsdfsdfsdf！'
            }
          ]
        },
        {
          name: '系统通知',
          page: 1,
          refreshing: false,
          loading: false,
          list: [
            {
              id: 0,
              date: '2018年5月10日',
              class: '系统消息',
              imgSrc: '../../../assets/img/gz.jpg',
              con:
                '恭喜小哥哥/小姐姐，您今天又被10个人关注啦！需要再接 再厉哦，继续分享更多的小消息给大家吧！'
            },
            {
              id: 1,
              date: '2018年11月10日',
              class: '系统消息',
              con: 'gjghjghj33453453453453453454！'
            },
            {
              id: 2,
              date: '2018年3月10日',
              class: '系统消息',
              con: 'sdfgsdfsdfsdfsdf！'
            },
            {
              id: 3,
              date: '2018年5月10日',
              class: '系统消息',
              imgSrc: '../../../assets/img/gz.jpg',
              con:
                '恭喜小哥哥/小姐姐，您今天又被10个人关注啦！需要再接 再厉哦，继续分享更多的小消息给大家吧！'
            },
            {
              id: 4,
              date: '2018年11月10日',
              class: '系统消息',
              con: 'gjghjghj33453453453453453454！'
            },
            {
              id: 5,
              date: '2018年3月10日',
              class: '系统消息',
              con: 'sdfgsdfsdfsdfsdf！'
            }
          ]
        },
        {
          name: '互动',
          page: 1,
          refreshing: false,
          loading: false,
          list: [
            {
              id: 0,
              date: '2018年5月10日',
              class: '系统消息',
              imgSrc: '../../../assets/img/gz.jpg',
              con:
                '恭喜小哥哥/小姐姐，您今天又被10个人关注啦！需要再接 再厉哦，继续分享更多的小消息给大家吧！'
            },
            {
              id: 1,
              date: '2018年11月10日',
              class: '系统消息',
              con: 'gjghjghj33453453453453453454！'
            },
            {
              id: 2,
              date: '2018年3月10日',
              class: '系统消息',
              con: 'sdfgsdfsdfsdfsdf！'
            },
            {
              id: 3,
              date: '2018年5月10日',
              class: '系统消息',
              imgSrc: '../../../assets/img/gz.jpg',
              con:
                '恭喜小哥哥/小姐姐，您今天又被10个人关注啦！需要再接 再厉哦，继续分享更多的小消息给大家吧！'
            },
            {
              id: 4,
              date: '2018年11月10日',
              class: '系统消息',
              con: 'gjghjghj33453453453453453454！'
            },
            {
              id: 5,
              date: '2018年3月10日',
              class: '系统消息',
              con: 'sdfgsdfsdfsdfsdf！'
            }
          ]
        }
      ]
    };
  },
  components: {
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemContent,
    ListItemTitle,
    ListItemSubTitle,
    LoadMore,
    TabContainer,
    TabContainerItem
  },
  computed: {},
  methods: {
    changeTab (index) {
      this.active = index;
    },
    refresh () {
      this.messageLists[this.active].refreshing = true;
      this.$refs[`container${this.active}`].scrollTop = 0;
      setTimeout(() => {
        this.messageLists[this.active].list = [];
        this.messageLists[this.active].refreshing = false;
        for (let i = 0; i < 10; i++) {
          this.messageLists[this.active].list.push({
            id: this.messageLists[this.active].list.length,
            date:
              'NO:' +
              this.messageLists[this.active].list.length +
              ' 2018年11月10日',
            class: '系统消息',
            con: 'gjghjghj33453453453453453454！'
          });
        }
      }, 2000);
    },
    load () {
      this.messageLists[this.active].loading = true;
      setTimeout(() => {
        this.messageLists[this.active].loading = false;
        for (let i = 0; i < 5; i++) {
          this.messageLists[this.active].list.push({
            id: this.messageLists[this.active].list.length,
            date:
              'NO:' +
              this.messageLists[this.active].list.length +
              ' 2018年11月10日',
            class: '系统消息',
            con: 'gjghjghj33453453453453453454！'
          });
        }
      }, 2000);
    }
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.list-con {
  flex: 1;
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
    margin-bottom: 10px;
  }
  .message-foot {
    color: #666;
    padding-top: 10px;
    margin-top: 15px;
    border-top: 1px solid #dddddd;
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
