<template>
  <div>
    <Tabs :value.sync="active2" inverse indicator-color="#009688" color="#009688" text-color="rgba(0, 0, 0, .54)" full-width>
      <Tab>
        全部
        <i class='messageTips'>5</i>
      </Tab>
      <Tab>
        系统通知
      </Tab>
      <Tab>
        互动
      </Tab>
    </Tabs>
    <div class="demo-text" v-if="active2 === 0">
      <List>
        <ListItem v-for='newList in news' :key="newList.id">
          <ListItemContent>
            <ListItemTitle>
              {{newList.date}} {{newList.class}}
            </ListItemTitle>
            <ListItemSubTitle>
              <img :src="newList.imgSrc" alt=""> {{newList.con}}
            </ListItemSubTitle>
            <ListItemSubTitle class='borTop'>
              查看详情
            </ListItemSubTitle>
          </ListItemContent>
        </ListItem>
      </List>
    </div>
    <div class="demo-text" v-if="active2 === 1">
      <List>
        <ListItem v-for='newList in news' :key="newList.id">
          <ListItemContent>
            <ListItemTitle>
              {{newList.date}} {{newList.class}}
            </ListItemTitle>
            <ListItemSubTitle>
              <img :src="newList.imgSrc" alt=""> {{newList.con}}
            </ListItemSubTitle>
            <ListItemSubTitle class='borTop'>
              查看详情
            </ListItemSubTitle>
          </ListItemContent>
        </ListItem>
      </List>
    </div>
    <div class="demo-text" v-if="active2 === 2">
      <List>
        <ListItem v-for='newList in news' :key="newList.id">
          <ListItemContent>
            <ListItemTitle>
              {{newList.date}} {{newList.class}}
            </ListItemTitle>
            <ListItemSubTitle>
              <img :src="newList.imgSrc" alt=""> {{newList.con}}
            </ListItemSubTitle>
            <ListItemSubTitle class='borTop'>
              查看详情
            </ListItemSubTitle>
          </ListItemContent>
        </ListItem>
      </List>
    </div>
  </div>

</template>

<script>
import { Tabs } from 'muse-ui';
import { Tab } from 'muse-ui/lib/Tabs';
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
      active2: 0,
      news: [
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
    ListItemSubTitle
  },
  computed: {},
  methods: {}
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.bgW {
  background: #fff;
  padding-bottom: 15px;
}

.mu-item {
  height: auto;
}

.mu-item-sub-title {
  color: #666;
}

.mu-item-sub-title img {
  width: 100%;
  display: block;
  margin-bottom: 10px;
}

.mu-item-title {
  color: #a9a9a9;
  font-size: 12px;
  padding: 5px 0;
  line-height: auto;
  height: auto;
}

.borTop {
  border-top: 1px solid #dddddd;
  padding-top: 5px;
  margin-top: 10px;
}

.colorRed {
  color: #ff0000;
}

.mu-list li {
  background: #fff;
  margin-bottom: 15px;
  padding: 10px 0;
}

.mu-tab-wrapper {
  flex-direction: row;
}

.messageTips {
  border-radius: 50%;
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
}
</style>
