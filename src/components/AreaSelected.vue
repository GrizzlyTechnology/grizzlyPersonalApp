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
        <i class="mu-icon icon-left" v-if="area.children&&area.children.length>0 && levelNow!==level"></i>
      </div>
    </div>
  </div>

</template>

<script>
import { Toast } from 'mint-ui';
import { Icon } from 'muse-ui';

import service from 'service';

export default {
  data () {
    return {
      isEnd: false,
      allArea: [],
      selectedAreaList: [],
      selected: [],
      levelNow: 1
    };
  },
  computed: {
    selectedText () {
      return this.selected.map(row => row.label).join(' / ');
    }
  },
  props: {
    value: {
      type: Array,
      default: function () {
        return [];
      }
    },
    level: {
      type: Number,
      default: 9999
    }
    // toEnd: {
    //   type: Boolean,
    //   default: true
    // }
  },
  components: {
    Icon
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
    cleanSelected () {
      this.selected = [];
      this.isEnd = false;
      this.selectedAreaList = this.allArea;
      this.levelNow = 1;
      this.$refs.con.scrollTop = 0;
      this.$emit('change', { selected: [], isEnd: false });
    },
    selectedRow (row) {
      if (this.isEnd === false) {
        this.selected.push({ value: row.value, label: row.label, cityCode: row.citycode });
      } else if (row.value !== this.selected[this.selected.length - 1].value) {
        this.selected[this.selected.length - 1].value = row.value;
        this.selected[this.selected.length - 1].label = row.label;
        this.selected[this.selected.length - 1].cityCode = row.citycode;
        if (this.levelNow !== this.level || (row.children && row.children.length !== 0)) {
          this.isEnd = false;
          this.$emit('change', { selected: this.selected, isEnd: false });
        }
      }
      if (this.levelNow === this.level || !row.children || row.children.length === 0) {
        this.isEnd = true;
        this.$emit('change', { selected: this.selected, isEnd: this.isEnd });
      } else {
        this.levelNow = this.levelNow + 1;
        this.selectedAreaList = row.children;
        this.$refs.con.scrollTop = 0;
      }
    }
  },
  mounted () {
    this.selected = this.value;
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
  background-color: #fff;
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
.areaHead{
  padding: 15px;
  overflow: auto;
  & > .textCon {
    margin-left: 75px;
    margin-right: 20px;
  }
  & > .textLabel{
    float: left;
  }
}
.cleanBtn{
  position: absolute;
  top: 9px;
  right: 12px;
}
</style>
