<template>
    <UIHeader
      color="#ffffff"
      textColor="#000000"
      :z-depth="0"
      class="header"
      :title="wtitle">
      <Button
        icon
        slot="left"
        v-if="hasLeft"
        @click="clickLeft"
      >
        <Icon
          value=":icon-left"
          color="#666"
          :size="24"
        />
      </Button>
      <Button
        icon
        slot="right"
        v-if="hasRight"
        @click="clickRight"
      >
        <Icon
          value=":icon-kefunv"
          color="#666"
          :size="24"
        />
      </Button>
    </UIHeader>
</template>

<script>
import tool from 'util/tools';
import { Icon, Button } from 'muse-ui';
import UIHeader from 'components/UIHeader';

export default {
  data () {
    return {
      wtitle: window.api.pageParam.wtitle,
      fname: window.api.pageParam.fname,
      furl: window.api.pageParam.furl,
      hasLeft: window.api.pageParam.hasLeft,
      hasRight: window.api.pageParam.hasRight
    };
  },
  components: {
    Button,
    Icon,
    UIHeader
  },
  methods: {
    clickLeft () {
      window.api.closeWin();
      // window.api.execScript({
      //     frameName: this.fname,
      //     script:'window.clickLeft();'
      // });
    },
    clickRight () {
      alert('right');
    }
  },
  mounted () {
    var headerH = tool.fixStatusBar(tool.dom('.header'));
    window.api.openFrame({
      name: this.fname,
      url: this.furl,
      bounces: true,
      rect: {
        x: 0,
        y: headerH + 5,
        w: 'auto',
        h: 'auto'
      }
    });
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
.header{
    height: 50px;
}
</style>
