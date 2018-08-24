<template>
  <UIFrame>
    <UIHeader
      slot="header"
      color="#ffffff"
      textColor="#000000"
      :z-depth="1"
      :title="title">
      <Button
        icon
        slot="left"
      >
        <Icon
          value=":icon-left"
          color="#19AD17"
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
@import url('../assets/css/base.less');
.mu-bottom-item{
    .mu-bottom-item-icon{
      font-size: 18px;
      color: #666;
    }
    .mu-bottom-item-text{
      color: #666;
    }
}
  .mu-bottom-item-active{
    .mu-bottom-item-text{
      font-size: 10px;
      color: @baseColor;
    }
    .mu-bottom-item-icon{
      color: @baseColor;
    }
  }
  .mu-bottom-item-text{
    font-size:10px;
  }
</style>

<style lang="less" scoped>
@import url('../assets/css/base.less');
.header{
  height: 50px;
  .left{
    height: 36px;
    padding: 0 6px;
  }
}
.bottomNav{
  background-color:  #fff;
  color:#fff;
  height: 50px;
  // {
  //   color:#fff;
  // }
}
</style>
