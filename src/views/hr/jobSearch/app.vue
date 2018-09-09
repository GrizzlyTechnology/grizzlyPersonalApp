<template>
  <div class="content">
    <Search v-model="value" cancel-text="取消" placeholder="搜索"></Search>
    <Form ref="form" :model="form">
      <FormItem label="地区" prop="name" :rules="nameRules">
        <TextField v-model="form.name"></TextField>
      </FormItem>
      <FormItem label="行业" prop="name" :rules="nameRules">
        <TextField v-model="form.name"></TextField>
        <Select label="Selection Scoped Slot" multiple chips v-model="custom.value2" full-width>
          <template slot="selection" slot-scope="scope">
            <Chip :selected="scope.selected" color="teal">
              {{scope.label}}
            </Chip>
          </template>
          <Option v-for="language,index in languages" :key="language" :label="language" :value="language"></Option>
        </Select>
      </FormItem>
      <FormItem label="职能" prop="name" :rules="nameRules">
        <TextField v-model="form.name"></TextField>
      </FormItem>
    </Form>
    <Button color="#009688" textColor="#ffffff" :full-width="true" :style="{boxShadow: '0 0 0'}" large>搜索</Button>
  </div>
</template>

<script>
import { Search } from "mint-ui";
import { TextField, Button, Select , Chip, Option} from "muse-ui";
import { Form, FormItem } from "muse-ui/lib/Form";
// import { Option } from "muse-ui/lib/Form";
// import { Container, Row, Col } from "muse-ui/lib/Grid";
// import { CardTitle, CardText } from "muse-ui/lib/Card";
// import { Card } from "muse-ui";
export default {
  data() {
    return {
      value: "",
      form: {
        name: "",
        sex: 0,
        personId: "",
        startDateTime: new Date().valueOf()
      },
       languages: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ],
      custom: {
        value1: '',
        value2: []
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
  background: #fff;
}

.mint-search {
  height: 100px;
}
</style>
