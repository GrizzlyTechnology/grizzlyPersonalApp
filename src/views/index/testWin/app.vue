<template>
  <div style="padding-top:50px">
      <input type="submit" @click="openSelf(num)" :value="'打开新的'+num"/>
      <input type="submit" @click="close" value="关闭"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
        num:api.pageParam.num+1,
    };
  },
  components: {

  },
  methods: {
    openSelf(n){
        window.api.openWin({
            name: 'winname'+n,
            url: './testWin.html',
            bounces: false,
            pageParam: {num : n}
        });
    },
    close(){
        window.api.closeWin();
    }
  },
  mounted () {
  }
};
</script>
