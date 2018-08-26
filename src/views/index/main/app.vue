<template>
    <div class="footer" :style="{height:footerHeight}">
        <BottomNav class="bottomNav" :value="bottomNavValue" @change="changeIteam">
            <BottomNavItem :value="0" title="首页" icon=":icon-zhaopin1"></BottomNavItem>
            <BottomNavItem :value="1" title="动态" icon=":icon-guanli"></BottomNavItem>
            <BottomNavItem :value="2" title="应用" icon=":icon-chanpin"></BottomNavItem>
            <BottomNavItem :value="3" title="我的" icon=":icon-icon-"></BottomNavItem>
        </BottomNav>
    </div>
</template>

<script>
import tool from "util/tools";
import { BottomNav } from "muse-ui";
import { BottomNavItem } from "muse-ui/lib/BottomNav";
export default {
  props: {
    footerHeight: {
      type: String,
      default: "50px"
    }
  },
  data() {
    return {
        bottomNavValue:0,
    };
  },
  components: {
    BottomNav,
    BottomNavItem
  },
  methods: {
      changeIteam(value){
            this.bottomNavValue=value;
            window.api.setFrameGroupIndex({
                name:"main",
                index: value
            });
      },
      mainGroup(){
          var footerH=tool.fixTabBar(tool.dom(".footer"));
          window.api.openFrameGroup({
              name: 'main',
              scrollEnabled: false,
              rect: {
                  x:0,
                  y:0,
                  w:'auto',
                  h:window.api.frameHeight-footerH
              },
              index: 0,
              frames: [{
                  name: 'hr', 
                  url: '../hr/index.html'
              },{
                  name: 'dynamic', 
                  url: '../dynamic/index.html'
              },{
                  name: 'application', 
                  url: '../application/index.html'
              },{
                  name: 'userCenter', 
                  url: '../userCenter/index.html'
              }]
          });
      }
  },
  mounted() {
      this.bottomNavValue=0;
      this.mainGroup();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.mu-bottom-item {
  .mu-bottom-item-icon {
    font-size: 18px;
    color: #cccccc;
  }
  .mu-bottom-item-text {
    color: #cccccc;
  }
}
.mu-bottom-item-active {
  .mu-bottom-item-text {
    font-size: 10px;
    color: #FFF;
  }
  .mu-bottom-item-icon {
    color: #FFF;
  }
}
.mu-bottom-item-text {
  font-size: 10px;
}
</style>

<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
.bottomNav {
  background-color:@baseColor;
  height: 50px;
}
</style>
