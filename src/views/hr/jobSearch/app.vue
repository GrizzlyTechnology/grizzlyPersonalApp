<template>
<Search v-model="value" cancel-text="取消"  placeholder="搜索"></Search>
</template>

<script>
import { Search } from 'mint-ui';
// import { Container, Row, Col } from "muse-ui/lib/Grid";
// import { CardTitle, CardText } from "muse-ui/lib/Card";
// import { Card } from "muse-ui";
export default {
  data() {
    return{
      value:''

    }
  },
  components: {
   Search
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.p16 {
  padding: 0 16px;
}

.txc .mu-card-title,.grid-cell{
  text-align: center;
}

.grid-cell {
  color: #999;
}
</style>
