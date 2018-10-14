<template>
  <Container>
    <subHeader>
      目前在职：
    </subHeader>
    <Card>
    <CardMedia title="Image Title" sub-title="Image Sub Title"></cardMedia>
    </Card>
  </Container>
</template>

<script>
import { Container } from 'muse-ui/lib/Grid';
import { Card, cardMedia } from 'muse-ui';
// import { Form, FormItem } from 'muse-ui/lib/Form';

export default {
  data () {
    return {};
  },
  components: {
    Container,
    Card,
    cardMedia
  },
  methods: {},
  mounted () {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
</style>
