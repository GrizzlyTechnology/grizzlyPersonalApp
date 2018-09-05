<template>
  <div class="moduleCon">
    <div class="moduleHeader">
      <div class="title">
        {{title}}
        <span class="label">{{label}}</span>
      </div>
      <slot name="end"/>
    </div>
    <div class="moduleBodyer">
      <slot/>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
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
  padding-left: 15px;
  overflow: auto;
  height: 48px;
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
  .title{
    float: left;
    padding-top: 12px;
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
