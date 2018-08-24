<template>
  <AppBar
    :color="color"
    :textColor="textColor"
    :z-depth="zDepth"
    v-bind="$attrs"
    :style="{height}"
    :title="title">
    <slot name="left" slot="left"></slot>
    <div v-if="hasSlot">
      <slot></slot>
    </div>
    <slot name="right" slot="right"></slot>
  </AppBar>
</template>

<script>
import { AppBar } from 'muse-ui';
export default {
  props: {
    height: {
      type: String,
      default: '50px'
    },
    textColor: {
      type: String
    },
    color: {
      type: String
    },
    title: {
      type: String
    },
    zDepth: {
      type: Number
    }
  },
  components: {
    AppBar
  },
  computed: {
    hasSlot () {
      return !!this.$slots.default;
    }
  },
  methods: {},
  mounted () { }
};
</script>
<style lang="less" scoped>
</style>
