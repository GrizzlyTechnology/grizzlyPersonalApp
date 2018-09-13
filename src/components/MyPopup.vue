<template>
    <Popup
      value="isShow"
      position="bottom"
      pop-transition="popup-fade"
      :closeOnClickModal="false"
    >
      <div class="">
        <slot></slot>
      </div>
    </Popup>
</template>

<script>
import { Popup } from 'mint-ui';

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  components: {
    Popup
  },
  methods: {},
  mounted () { }
};
</script>
<style lang="less" scoped>
.bodyer {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header,.content,.footer,.modalCon{
    position: relative;
  }
  .header{
    z-index: 2;
  }
  .footer{
    z-index: 4;
  }
  .modalCon{
    z-index: 3;
  }
  .content{
    flex: 1;
    z-index: 1;
    overflow: auto;
  }
}
</style>
