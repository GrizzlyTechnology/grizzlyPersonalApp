<template>
  <div class="content">
    <Tabs :value.sync="active" inverse indicator-color="#009688" color="#009688" text-color="rgba(0, 0, 0, .54)" full-width>
      <Tab>
        全部
        <i class='message-tips'>99</i>
      </Tab>
      <Tab>
        系统通知
      </Tab>
      <Tab>
        互动
      </Tab>
    </Tabs>
    <TabContainer v-model="active" swipeable class="list-con">
      <TabContainerItem v-for="key in Object.keys(messageList)" :key="key" :id="Number(key)" class="message-list">
        <div class="message" v-for="message in messageList[key]" :key="message.id" >
          <div class="message-head">{{message.date}}</div>
          <div class="message-body">{{message.con}}</div>
          <div class="message-foot"><span>查看详情</span></div>
        </div>
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
      messageList: {
        0: [
          {
            id: 1,
            date: '2018年5月10日',
            class: '系统消息',
            imgSrc: '../../../assets/img/gz.jpg',
            con:
              '恭喜小哥哥/小姐姐，您今天又被10个人关注啦！需要再接 再厉哦，继续分享更多的小消息给大家吧！'
          },
          {
            id: 2,
            date: '2018年11月10日',
            class: '系统消息',
            con: 'gjghjghj33453453453453453454！'
          },
          {
            id: 3,
            date: '2018年3月10日',
            class: '系统消息',
            con: 'sdfgsdfsdfsdfsdf！'
          },
          {
            id: 4,
            date: '2018年5月10日',
            class: '系统消息',
            imgSrc: '../../../assets/img/gz.jpg',
            con:
              '恭喜小哥哥/小姐姐，您今天又被10个人关注啦！需要再接 再厉哦，继续分享更多的小消息给大家吧！'
          },
          {
            id: 5,
            date: '2018年11月10日',
            class: '系统消息',
            con: 'gjghjghj33453453453453453454！'
          },
          {
            id: 6,
            date: '2018年3月10日',
            class: '系统消息',
            con: 'sdfgsdfsdfsdfsdf！'
          }
        ],
        1: [
          {
            id: 1,
            date: '2018年5月10日',
            class: '系统消息',
            imgSrc: '../../../assets/img/gz.jpg',
            con:
              '恭喜小哥哥/小姐姐，您今天又被10个人关注啦！需要再接 再厉哦，继续分享更多的小消息给大家吧！'
          },
          {
            id: 2,
            date: '2018年11月10日',
            class: '系统消息',
            con: 'gjghjghj33453453453453453454！'
          },
          {
            id: 3,
            date: '2018年3月10日',
            class: '系统消息',
            con: 'sdfgsdfsdfsdfsdf！'
          }
        ],
        2: [
          {
            id: 1,
            date: '2018年5月10日',
            class: '系统消息',
            imgSrc: '../../../assets/img/gz.jpg',
            con:
              '恭喜小哥哥/小姐姐，您今天又被10个人关注啦！需要再接 再厉哦，继续分享更多的小消息给大家吧！'
          },
          {
            id: 2,
            date: '2018年11月10日',
            class: '系统消息',
            con: 'gjghjghj33453453453453453454！'
          }
        ]
      }
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
  methods: {}
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
  -webkit-overflow-scrolling: touch;
  .mint-tab-container-wrap {
    height: 100%;
  }
  .message-list {
    padding: 15px 0 0;
    height: 100%;
    overflow: auto;
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
    &:active > *{
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
