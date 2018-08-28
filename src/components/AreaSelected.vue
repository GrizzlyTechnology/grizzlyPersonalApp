<template>
  <div class="con" ref="con">
    <div class="areaRow" v-for="area in selectedAreaList" :key="area.value" @click="()=>{
        selectedRow(area);
      }">
      {{area.label}}
      <i class="mu-icon icon-left" v-if="area.children&&area.children.length>0"></i>
    </div>
  </div>
</template>

<script>
import areaData from 'util/areaData';

export default {
  data () {
    return {
      isEnd: false,
      allArea: areaData,
      selectedAreaList: areaData
    };
  },
  props: {
    selected: {
      type: Array,
      default: function () {
        return [];
      }
    },

    toEnd: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  computed: {},
  watch: {
    selected () {
      if (this.selected.length === 0) {
        this.selectedAreaList = this.allArea;
        this.isEnd = false;
        this.$refs.con.scrollTop = 0;
      }
    }
  },
  methods: {
    selectedRow (row) {
      if (row.children && row.children.length > 0) {
        this.selectedAreaList = row.children;
      }
      if (!(!row.children || row.children.length === 0)) {
        this.$refs.con.scrollTop = 0;
      }
      if (this.isEnd === false) {
        this.selected.push({ value: row.value, label: row.label });
        const isEnd = !row.children || row.children.length === 0;
        this.$emit('change', { selected: this.selected, isEnd });
        this.isEnd = isEnd;
      } else if (row.value !== this.selected[this.selected.length - 1].value) {
        this.selected[this.selected.length - 1].value = row.value;
        this.selected[this.selected.length - 1].label = row.label;
        this.$emit('change', { selected: this.selected, isEnd: true });
      }
    }
  },
  mounted () {
    // todo 获取地区信息
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/css/base.less");
.con {
  height: 100%;
  overflow: auto;
}
.areaRow {
  padding: 15px;
  border-bottom: 1px @grayLine solid;
  position: relative;
  & > i {
    position: absolute;
    top: 13px;
    right: 15px;
    font-size: 16px;
    transform: rotate(180deg);
  }
  &:active {
    background-color: #eee;
  }
}
</style>
