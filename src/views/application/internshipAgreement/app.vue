<template>
  <div>
    <List>
      <ListItem>
        <ListItemTitle>
          江苏大灰熊科技有限公司
        </ListItemTitle>
        <ListItemAction>
          程序组
        </ListItemAction>
        <ListItemAction>
          技术部
        </ListItemAction>
      </ListItem>
    </List>
  </div>
</template>

<script>
import {
  List,
  ListItem,
  ListItemAction,
  ListItemTitle
} from 'muse-ui/lib/List';
// import tool from 'util/tools';
export default {
  data () {
    return {};
  },
  components: {
    List,
    ListItem,
    ListItemAction,
    ListItemTitle
  },
  methods: {},
  mounted () {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
</style>
