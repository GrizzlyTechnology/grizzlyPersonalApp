<template>
  <div class="moduleCon">
    <div class="moduleHeader">
      <div class="title">
        {{title}}
        <span class="label" v-if="label.length>0">{{label}}</span>
      </div>
      <slot v-if="hasEnd" name="end" />
    </div>
    <div v-if="!noContent" class="moduleBodyer">
      <slot/>
    </div>
    <div v-if="noContent" class="infoNotice">
      <slot name="info" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noContent: {
      type: Boolean,
      default: false
    },
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
    hasEnd () {
      return !!this.$slots.end;
    },
    hasSlot () {
      return !!this.$slots.default;
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
  .title {
    float: left;
    padding-top: 12px;
  }
}
.moduleBodyer {
  border-radius: 5px;
  border: 1px #ddd solid;
  overflow: hidden;
  margin: 0 15px 15px;
  background-color: #fff;
}
.infoNotice {
  border-radius: 5px;
  border: 1px #a2d4f7 dashed;
  overflow: hidden;
  margin: 0 15px 15px;
  background-color: #e4f2fb;
  padding: 20px 15px;
  text-align: center;
  color: #a2d4f7;
}
</style>
