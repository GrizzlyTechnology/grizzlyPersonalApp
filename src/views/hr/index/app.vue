<template>
  <div>
      <br/>
      <br/>
      <br/>
      这是首页
      <div @click="raidersList()">职场攻略</div>
      <div @click="jobSearch()">职位搜索</div>
      <div @click="companyInfo()">企业信息展示</div>
    </div>
</template>

<script>
import tool from 'util/tools'
export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {
    raidersList(){
      tool.openWin({
          name: 'raidersList',
          url: '../win.html',
            title: '职场攻略',
            fname: 'raidersList_f',
            furl: './hr/raidersList.html',
            hasLeft: 1
        });
    },
    jobSearch(){
      tool.openWin({
          name: 'jobSearch',
          url: '../win.html',
            title: '职位搜索',
            fname: 'jobSearch_f',
            furl: './hr/jobSearch.html',
            hasLeft: 1
        });
    },
     companyInfo(){
      tool.openWin({
          name: 'companyInfo',
          url: '../win.html',
            title: '企业介绍',
            fname: 'companyInfo_f',
            furl: './hr/companyInfo.html',
            hasLeft: 1,
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

</style>
