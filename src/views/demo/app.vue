<template>
  <UIFrame
    title="this is a title just for demo"
  >
    <ul>
      <li v-for="team in list" :key="team" @click="()=>{delList(team)}">{{team}}</li>
    </ul>
   <h1 v-if="isShow">ccc</h1>
  <Button color="primary" @click="addList">add</Button>
  <Button color="primary" @click="changIsShow">Primary</Button>

  </UIFrame>
</template>

<script>
import { LoadMore, Button } from 'muse-ui';
import { DefaultFrame } from 'components';
export default {
  data () {
    return {
      list:[1,2,3,4,5,6,7],
      isShow:true,
      num: 10,
      refreshing: false,
      loading: false,
      text: 'List'
    };
  },
  components: {
    UIFrame: DefaultFrame,
    LoadMore,
    Button
  },
  methods: {
    addList(){
      this.list.push(this.list.length + 1);
    },
    delList(index){
      this.list= this.list.filter((r,  i)=>{
       return ( index !== i);
      });
    },
    changIsShow(){
      this.isShow = !this.isShow;
    },
    refresh () {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.text = this.text === 'List' ? 'Menu' : 'List';
        this.num = 10;
      }, 2000);
    },
    load () {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
      }, 2000);
    }
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/base.less');

</style>
