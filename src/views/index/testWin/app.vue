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
      num: window.api.pageParam.num + 1
    };
  },
  components: {

  },
  methods: {
    openSelf (n) {
      window.api.openWin({
        name: 'registered',
        url: './win.html',
        bounces: false,
        pageParam: {
          wtitle: '用户注册',
          fname: 'registered_f',
          furl: './registered.html',
          hasLeft: 0,
          hasRight: 0
        }
      });
    },
    close () {
      window.api.closeWin();
    }
  },
  mounted () {
  }
};
</script>
