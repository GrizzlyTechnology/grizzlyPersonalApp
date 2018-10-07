<template>
 <List textline="three-line" >
   <div  v-for='raiders in raidersList' :key="raiders.id">
    <ListItem :ripple="false" button class='listBg'  @click="raidersArticle(raiders.id)">
      <ListAction class='listAction' v-show='raiders.thumb !==""'>
        <Paper class="imgSpace" :z-depth="5">
          <img :src="raiders.thumb" class='raidersImg'>
        </Paper>
      </ListAction>
      <ListItemContent>
        <ListItemTitle>{{raiders.title}}</ListItemTitle>
        <ListItemSubTitle>
         {{raiders.content}}
        </ListItemSubTitle>
      </ListItemContent>
    </ListItem>
    <Divider></Divider>
    </div>
  </List>
</template>

<script>
import { Toast } from 'mint-ui';
import { Paper, Divider } from 'muse-ui';
import { List, ListItem, ListAction, ListItemContent, ListItemTitle, ListItemSubTitle } from 'muse-ui/lib/List';
import service from 'service';
import tool from 'util/tools';
export default {
  data () {
    return {
      cid: 1, // 文章分类id,写死
      raidersList: []
    };
  },
  components: {
    List,
    ListItem,
    ListAction,
    ListItemContent,
    Paper,
    Divider,
    ListItemTitle,
    ListItemSubTitle
  },
  methods: {
    async raidersListData () {
      const response = await service.getrRaidersList({ cid: this.cid });
      switch (response.code) {
        case 0:
          this.raidersList = response.result.raidersList;
          break;
        default:
          Toast({
            position: 'top',
            message: '获取失败，请稍后重试！！'
          });
          break;
      }
    },
    raidersArticle (id) {
      tool.openWin({
        name: 'raidersArticle',
        url: '../win.html',
        title: '',
        fname: 'raidersArticle_f',
        furl: './hr/raidersArticle.html',
        hasLeft: 1,
        hasRight: 1,
        data: {
          id: id
        }
      });
    }
  },
  mounted () {
    this.raidersListData();
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
.listBg{
  background: #fff;
}
.listAction{
  min-width: 70px;
}
.imgSpace{
padding: 5px;
}
.raidersImg{
  width: 50px;
  display: block;
}
</style>
