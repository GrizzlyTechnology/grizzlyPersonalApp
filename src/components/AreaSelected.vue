<template>
  <div class="areaCon">
    <div class="areaHead">
      <div  class="textLabel">当前定位：</div>
      <div class="textCon">{{selectedText}}</div>
      <Icon
        class="cleanBtn"
        v-if="selected.length>0"
        :size="24"
        @click="cleanSelected"
        value=":icon-qingchu"
        color="#ccc"
      />
    </div>
    <div class="con" ref="con">
      <div class="areaRow" v-for="area in selectedAreaList" :key="area.value" @click="()=>{
          selectedRow(area);
        }">
        {{area.label}}
        <i class="mu-icon icon-left" v-if="area.children&&area.children.length>0"></i>
      </div>
    </div>
  </div>

</template>

<script>
import { Toast } from 'mint-ui';
import service from 'service';

export default {
  data () {
    return {
      isEnd: false,
      allArea: [],
      selectedAreaList: []
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
    async getAllArea () {
      const response = await service.getAreaByAreaId();
      switch (response.code) {
        case 0:
          this.allArea = response.result.areaList;
          this.selectedAreaList = response.result.areaList;
          break;
        default:
          Toast({
            position: 'top',
            message: '地区信息创建失败'
          });
          break;
      }
    },
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
    this.getAllArea();
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
  padding: 14px 15px;
  font-size: 16px;
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
.areaCon{
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
