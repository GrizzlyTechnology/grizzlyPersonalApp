<template>
  <div class="content">
    <Search v-model="value" cancel-text="取消" placeholder="搜索"></Search>

    <Form ref="form" :model="form">
      <FormItem
        label="地区"
        prop="name"
        :rules="nameRules"
      >
        <TextField v-model="form.name"></TextField>
      </FormItem>
      <FormItem
        label="行业"
        prop="name"
        :rules="nameRules"
      >
        <TextField v-model="form.name"></TextField>
      </FormItem>
      <FormItem
        label="职能"
        prop="name"
        :rules="nameRules"
      >
        <TextField v-model="form.name"></TextField>
      </FormItem>
    </Form>
 <Button color="#009688" textColor="#ffffff" :full-width="true" :style="{boxShadow: '0 0 0'}" large >搜索</Button>
  </div>
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
