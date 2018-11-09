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
        <i class="mu-icon icon-right" v-if="area.children&&area.children.length>0 && levelNow!==level"></i>
      </div>
    </div>
  </div>

</template>

<script>
import { Icon } from 'muse-ui';
import tools from 'util/tools';
import _ from 'lodash';

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
      tools.showProgress();
      const response = await service.getAreaByAreaId();
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.allArea = response.result.areaList;
          if (this.selected.length === 0) {
            this.selectedAreaList = response.result.areaList;
          } else {
            let temp = response.result.areaList;
            for (let i = 0; i < this.selected.length - 1; i++) {
              temp = temp[_.findIndex(temp, { value: this.selected[i].value })].children;
            }
            this.selectedAreaList = temp;
          }
          break;
        default:
          tools.toast({
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
        // console.log(0);
        this.selected.push({ value: row.value, label: row.label, cityCode: row.citycode });
      } else if (row.value !== this.selected[this.selected.length - 1].value) {
        // console.log(1);
        this.selected[this.selected.length - 1].value = row.value;
        this.selected[this.selected.length - 1].label = row.label;
        this.selected[this.selected.length - 1].cityCode = row.citycode;
        if (this.levelNow !== this.level || (row.children && row.children.length !== 0)) {
          // console.log(2);
          this.isEnd = false;
          this.$emit('change', { selected: this.selected, isEnd: false });
        }
      }
      if (this.levelNow === this.level || !row.children || row.children.length === 0) {
        // console.log(3);
        this.isEnd = true;
        this.$emit('change', { selected: this.selected, isEnd: this.isEnd });
      } else {
        // console.log(4);
        this.levelNow = this.levelNow + 1;
        this.selectedAreaList = row.children;
        this.$refs.con.scrollTop = 0;
      }
    }
  },
  mounted () {
    // todo 获取地区信息
    this.getAllArea();
    // this.$nextTick(function () {
    this.selected = this.value;
    this.levelNow = this.value.length;
    this.isEnd = this.value.length > 0;
    // });
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
