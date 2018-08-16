<template>
  <div class="bodyer">
    <div v-if="hasHeader" class="header" :style="{height:headerHeight,lineHeight:headerHeight}">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div v-if="hasFooter" class="footer" :style="{height:footerHeight}">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerHeight: {
      type: String,
      default: '50px'
    },
    footerHeight: {
      type: String,
      default: '50px'
    }
  },
  computed: {
    hasHeader () {
      return !!this.$slots.header;
    },
    hasFooter () {
      return !!this.$slots.footer;
    }
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
  .header,.content,.footer{
    position: relative;
  }
  .header,.footer{
    z-index: 2;
  }
  .content{
    flex: 1;
    z-index: 1;
    overflow: auto;
  }
}
</style>
