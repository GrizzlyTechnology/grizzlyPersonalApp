<template>
<div class="dhx-imagesPopup" v-if="isShow">
  <Popup v-model="isShow" pop-transition="popup-fade" :closeOnClickModal="false">
    <Swipe :auto="0" :defaultIndex="index" :show-indicators="false" :continuous="false" :showIndicators="false" :prevent="true" :stopPropagation="true">
      <SwipeItem v-for="(url,index) in urlList" :key="index">
        <div class="imgCon" :style="{backgroundImage:'url('+url+')'}"></div>
      </SwipeItem>
    </Swipe>
  </Popup>
    <Icon value=":el-icon-close" color="#fff" class="close" :size="24" @click="cancel"/>
</div>
</template>

<script>
import { Icon } from 'muse-ui';
import { Popup, Picker, Swipe, SwipeItem } from 'mint-ui';
// import tools from 'util/tools';

export default {
  data () {
    return {
      isShow: false
    };
  },
  props: {
    urlList: {
      type: Array,
      default: function () {
        return [];
      }
    },
    index: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      default: ''
    }
  },
  components: {
    Popup,
    Picker,
    Swipe,
    SwipeItem,
    Icon
  },
  methods: {
    open () {
      this.isShow = true;
      // tools.sendEvent('openMarker');
    },
    cancel () {
      this.isShow = false;
      // tools.sendEvent('closeMarker');
    }
  },
  mounted () {}
};
</script>
<style lang="less">
.dhx-imagesPopup{
  .v-modal{
    opacity: 1;
  }
}
.dhx-imagesPopup {
  .mint-swipe {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;
  }
}
</style>

<style lang="less" scoped>
.dhx-imagesPopup {
  .mint-popup{
  width: 100%;
  height: 100%;
  // padding-top: 133%;
  background-color: #000;
  }
}
.close{
  position: fixed;
  z-index: 3000;
  top: 10px;
  right: 10px;
}
.imgCon{
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
</style>
