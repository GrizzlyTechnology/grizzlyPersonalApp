<template>
  <Flex align-items="center" justify-content="around" style="width: 400px;">
    <Icon size="36" value=":icon-weixin"></Icon>
    <Icon size="36" value=":icon-qq" color="red"></Icon>
  </Flex>
</template>

<script>
import Flex from "muse-ui/lib/Grid";
import Icon from "muse-ui/lib/Icon";
export default {
  props: {
  },
  components: {
    Flex,
    Icon
  },
  computed: {
    
  },
  methods: {},
  mounted () { }
};
</script>
<style lang="less" scoped>
</style>
