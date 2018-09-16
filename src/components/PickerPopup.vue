<template>
  <Popup v-model="isShow" position="bottom" pop-transition="popup-fade" :closeOnClickModal="true" class="myPopup">
    <div class="myPopupTopBar">
      <span class="cancel" @click="cancel">{{ cancelText }}</span>
      <span class="ok" @click="confirm">{{ confirmText }}</span>
    </div>
    <Picker ref="picker" :slots="slots" value-key="label" @change="changeHandle"/>
  </Popup>
</template>

<script>
import { Popup, Picker } from 'mint-ui';
// import tools from 'util/tools';

export default {
  data () {
    return {
      picker: null,
      isShow: false,
      oldSelected: null,
      selected: null
    };
  },
  props: {
    slots: {
      type: Array,
      default: function () {
        return [];
      }
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  components: {
    Popup,
    Picker
  },
  methods: {
    changeHandle (picker, values) {
      if (this.selected === null && this.slots.values) {
        this.oldSelected = this.slots.values[this.slots.defaultIndex];
      } else {
        this.oldSelected = this.selected;
      }
      this.selected = values[0];
    },
    open () {
      this.isShow = true;
      // tools.sendEvent('openMarker');
    },
    cancel () {
      this.isShow = false;
      // tools.sendEvent('closeMarker');
      this.$refs.picker.setSlotValue(0, this.oldSelected);
    },
    confirm () {
      this.isShow = false;
      this.oldSelected = this.selected;
      this.$emit('confirm', this.selected);
    }
  },
  mounted () {

  }
};
</script>
<style lang="less" scoped>
.myPopup {
  width: 100%;
}
.cancel,
.ok {
  font-size: 18px;
  width: 50%;
  float: left;
  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
  color: #26a2ff;
  &:active {
    background-color: #eee;
  }
}
.ok{
  border-left: 1px #eee solid;
}
.myPopupTopBar {
  font-size: 0;
  overflow: hidden;
  border-bottom: 1px #eee solid;
}
</style>
