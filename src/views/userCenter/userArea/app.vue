<template>
  <div class="content">
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
    <div class="areaBody">
      <AreaSelected
        :selected="selected"
        @change="setSelected"
      />
    </div>
    <div class="areaFoot">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="submit">下一步</Button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import service from 'service';
import { Button, Icon } from 'muse-ui';
import AreaSelected from 'components/AreaSelected';
export default {
  data () {
    return {
      selected: []
    };
  },
  computed: {
    selectedText () {
      return this.selected.map(row => row.label).join(' / ');
    }
  },
  components: {
    Button,
    Icon,
    AreaSelected
  },
  methods: {
    cleanSelected () {
      this.selected = [];
    },
    setSelected (data) {
      this.selected = data.selected;
    },
    submit () {
    }
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
.content{
  // padding: 15px;
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
// .areaFoot{
//   padding-top: 15px;
// }
.areaBody{
  flex: 1;
  background-color: #fff;
  overflow: hidden;
}
.cleanBtn{
  position: absolute;
  top: 9px;
  right: 12px;
}
</style>
