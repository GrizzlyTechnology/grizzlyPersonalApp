<template>

</template>

<script>
import { Search } from "mint-ui";
import { TextField,Button } from 'muse-ui';
import { Form, FormItem } from "muse-ui/lib/Form";
// import { Container, Row, Col } from "muse-ui/lib/Grid";
// import { CardTitle, CardText } from "muse-ui/lib/Card";
// import { Card } from "muse-ui";
export default {
  data() {
    return {
      value: "",
       form: {
        name: '',
        sex: 0,
        personId: '',
        startDateTime: (new Date()).valueOf()
      }
    };
  },
  components: {
    Search,
    Form,
    FormItem,
    TextField,
    Button
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.content {
  padding: 15px;
}

.mint-search{
  height: 100px;
}
</style>
