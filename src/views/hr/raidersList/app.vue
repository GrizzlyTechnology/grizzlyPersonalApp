<template>
 <List textline="three-line" >
   <template  v-for='raiders in raidersList'>
    <ListItem :ripple="false" button class='listBg' @click="raidersArticle">
      <ListAction class='listAction'>
        <Paper class="imgSpace" :z-depth="5">
          <img :src="raiders.path" class='raidersImg'>
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
    </template>
  </List>
</template>

<script>
import { Paper,Divider} from 'muse-ui';
import { List, ListItem, ListAction, ListItemContent, ListItemTitle, ListItemSubTitle } from 'muse-ui/lib/List';
import tool from 'util/tools';
export default {
  data () {
    return {
      raidersList:[
        {path:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg',title:'初次面试，为啥企业要求带简历后还得再写一个简历？',content:'昨天和学弟聊天，说起他最近在找工作的事情，HR约他初次面试，要他带一份简历....'},
        {path:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg',title:'初次面试，为啥企业要求带简历后还得再写一个简历？',content:'昨天和学弟聊天，说起他最近在找工作的事情，HR约他初次面试，要他带一份简历....'},
        {path:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg',title:'初次面试，为啥企业要求带简历后还得再写一个简历？',content:'昨天和学弟聊天，说起他最近在找工作的事情，HR约他初次面试，要他带一份简历....'},
        {path:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535281190856&di=889bdc8c5e0d502ec811b6562768d5a8&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg2012%2F2%2F0220%2F31%2F41.jpg',title:'初次面试，为啥企业要求带简历后还得再写一个简历？',content:'昨天和学弟聊天，说起他最近在找工作的事情，HR约他初次面试，要他带一份简历....'},
        ]
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
    raidersArticle(){
      tool.openWin({
          name: 'raidersArticle',
          url: '../win.html',
          title: '',
          fname: 'raidersArticle_f',
          furl: './hr/raidersArticle.html',
          hasLeft:1,
          hasRight:1
        });
    }
  },
  mounted () {
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
