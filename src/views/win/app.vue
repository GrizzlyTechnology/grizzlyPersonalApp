<template>
  <div>
    <UIHeader color="#ffffff" textColor="#000000" :z-depth="0" class="header" :title="wtitle">
      <Button icon slot="left" v-if="hasLeft" @click="clickLeft">
        <Icon value=":icon-left" color="#666" :size="24" />
      </Button>
      <Button icon slot="right" v-if="hasRight" @click="clickRight">
        <Icon value=":icon-kefunv" color="#666" :size="24" />
      </Button>
    </UIHeader>
    <div v-if="showMarker" class="v-modal"></div>
  </div>
</template>

<script>
import tool from 'util/tools';
import { Icon, Button } from 'muse-ui';
import UIHeader from 'components/UIHeader';

export default {
  data () {
    return {
      showMarker: false,
      wtitle: window.api ? window.api.pageParam.wtitle : '测试标题',
      hasLeft: window.api ? window.api.pageParam.hasLeft : false,
      hasRight: window.api ? window.api.pageParam.hasRight : false
    };
  },
  components: {
    Button,
    Icon,
    UIHeader
  },
  methods: {
    clickLeft () {
      tool.back();
    },
    clickRight () {
      if (window.api) {
        window.api.execScript({
          frameName: this.fname,
          script: 'clickRight()'
        });
      }
    }
  },
  mounted () {
    var headerH = tool.fixStatusBar(tool.dom('.header'));
    if (window.api) {
      window.api.addEventListener(
        {
          name: 'keyback'
        },
        () => {
          tool.back();
        }
      );
      window.api.addEventListener(
        {
          name: 'openMarker'
        },
        () => {
          this.showMarker = true;
        }
      );
      window.api.addEventListener(
        {
          name: 'closeMarker'
        },
        () => {
          this.showMarker = false;
        }
      );
      window.api.openFrame({
        name: window.api.pageParam.fname,
        url: window.api.pageParam.furl,
        bounces: false,
        pageParam: window.api.pageParam.data || {},
        rect: {
          x: 0,
          y: headerH + 2,
          w: 'auto',
          h: 'auto'
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/base.less");
.header {
  height: 50px;
}
</style>
