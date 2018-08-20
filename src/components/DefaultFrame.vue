<template>
  <UIFrame>
    <UIHeader
      slot="header"
      color="#067BDA"
      textColor="#ffffff"
      :z-depth="1"
      :title="title">
      <Button
        icon
        slot="left"
      >
        <Icon
          value=":icon-left"
          :size="24"
        />
      </Button>
      <Button
        icon
        slot="right"
      >
        <Icon
          value=":icon-bars"
          :size="24"
        />
      </Button>
    </UIHeader>
    <slot></slot>
    <BottomNav
      slot="footer"
      class="bottomNav"
    >
      <BottomNavItem title="首页" icon=":icon-home"></BottomNavItem>
      <BottomNavItem title="熊论" icon=":icon-flag"></BottomNavItem>
      <BottomNavItem title="实习" icon=":icon-rocket1"></BottomNavItem>
      <BottomNavItem title="我的" icon=":icon-user"></BottomNavItem>
    </BottomNav>
    <slot slot="modalCon" name="modalCon"></slot>
  </UIFrame>
</template>

<script>
import { Icon, Button, BottomNav } from 'muse-ui';
import { BottomNavItem } from 'muse-ui/lib/BottomNav';

import UIFrame from './UIFrame';
import UIHeader from './UIHeader';

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    BottomNavItem,
    BottomNav,
    UIFrame,
    UIHeader,
    Button,
    Icon
  },
  methods: {},
  mounted () { }
};
</script>
<style lang="less">
.mu-bottom-item{
    .mu-bottom-item-icon{
      font-size: 18px;
    }
}
  .mu-bottom-item-active{
    .mu-bottom-item-text{
      font-size: 10px;
    }
    color:#fff;
    background-color: rgb(11, 137, 240)
  }
  .mu-bottom-item-text{
    font-size:10px;
  }
</style>

<style lang="less" scoped>
.header{
  height: 50px;
  .left{
    height: 36px;
    padding: 0 6px;
  }
}
.bottomNav{
  background-color: #067BDA;
  color:#fff;
  height: 50px;
  // {
  //   color:#fff;
  // }
}
</style>
