<template>
 <List textline="three-line">
    <ListItem avatar :ripple="false" button>
      <ListAction>
        <Avatar>
          <img src="../../assets/images/avatar1.jpg">
        </Avatar>
      </ListAction>
      <ListItemContent>
        <ListItemTitle>这个周末一起吃饭么?</ListItemTitle>
        <ListItemSubTitle>
          <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
        </ListItemSubTitle>
      </ListItemContent>
    </ListItem>
    <Divider></Divider>
    <ListItem avatar :ripple="false" button>
      <ListAction>
        <Avatar>
          <img src="../../assets/images/avatar2.jpg">
        </Avatar>
      </ListAction>
      <ListItemContent>
        <ListItemTitle>Alex Qin</ListItemTitle>
        <ListItemSubTitle>
          <span style="color: rgba(0, 0, 0, .87)">看电影啊</span><br/>
          我们去看电影，最近有部烂片上映，又有吐槽的了
        </ListItemSubTitle>
      </ListItemContent>
    </ListItem>
    <Divider></Divider>
    <ListItem avatar :ripple="false" button>
      <ListAction>
        <Avatar>
          <img src="../../assets/images/avatar3.jpg">
        </Avatar>
      </ListAction>
      <ListItemContent>
        <ListItemTitle>LOL</ListItemTitle>
        <ListItemSubTitle>
          <span style="color: rgba(0, 0, 0, .87)">去打游戏啊</span><br/>
          周末一起 LOL
        </ListItemSubTitle>
      </ListItemContent>
    </ListItem>
    <Divider></Divider>
    <ListItem avatar :ripple="false" button>
      <ListAction>
        <Avatar>
          <img src="../../assets/images/uicon.jpg">
        </Avatar>
      </ListAction>
      <ListItemContent>
        <ListItemTitle>LOL</ListItemTitle>
        <ListItemSubTitle>
          <span style="color: rgba(0, 0, 0, .87)">哇去</span><br/>
          实在编不下去，这就是个demo
        </ListItemSubTitle>
      </ListItemContent>
    </ListItem>
  </List>
</template>

<script>
import { Avatar,Divider} from 'muse-ui';
import { List, ListItem, ListAction, ListItemContent, ListItemTitle, ListItemSubTitle } from 'muse-ui/lib/List';
// import { DefaultFrame } from 'components';
export default {
  data () {
  },
  components: {
    List,
    ListItem,
    ListAction,
    ListItemContent,
    Avatar,
    Divider
  },
  methods: {

  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');

</style>
