<template>
  <div class="moduleCon">
    <div class="moduleHeader">
      {{title}}
      <span class="label">{{label}}</span>
      <Icon v-if="isLink" @click="handleClick" class="more" value=":icon-left" />
    </div>
    <div class="moduleBodyer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Icon } from 'muse-ui';

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Icon
  },
  computed: {
    hasHeader () {
      return !!this.$slots.header;
    },
    hasFooter () {
      return !!this.$slots.footer;
    },
    hasModalCon () {
      return !!this.$slots.modalCon;
    }
  },
  methods: {
    handleClick () {
      this.$emit('click');
    }
  },
  mounted () {}
};
</script>
<style lang="less" scoped>
.moduleHeader {
  font-size: 16px;
  padding: 15px;
  .label {
    font-size: 12px;
    color: #999;
    margin-left: 5px;
  }
  .more {
    float: right;
    font-size: 16px;
    transform: rotate(180deg);
  }
}
.moduleBodyer {
  border-radius: 5px;
  border: 1px #ddd solid;
  overflow: hidden;
  margin: 0 15px 15px;
  background-color: #FFF;
}
</style>
