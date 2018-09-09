<template>
  <div class="content">
    <Search v-model="value" cancel-text="取消" placeholder="搜索">
      <Cell v-for="item in seachList" :key='item.id' :title="item.title" :value='item.value'>
      </Cell>
    </Search >
    <Form ref="form" :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="45">
      <FormItem label="地区" prop="area">
        <TextField v-model="form.area" readonly @click="areaHandle"></TextField>
      </FormItem>
      <FormItem label="行业" prop="industry">
        <TextField v-model="form.duties" readonly  @click="industryHandle"></TextField>
      </FormItem>
      <FormItem label="职能" prop="duties">
        <TextField v-model="form.duties" readonly @click="dutiesHandle"></TextField>
      </FormItem>
    </Form>
    <Button color="#009688" textColor="#ffffff" :full-width="true" :style="{boxShadow: '0 0 0'}" large>搜索</Button>
  </div>
</template>

<script>
import { Search, Cell } from 'mint-ui';
import { TextField, Button } from 'muse-ui';
import { Form, FormItem } from 'muse-ui/lib/Form';
import tools from 'util/tools';
export default {
  data () {
    return {
      value: '',
      form: {
        area: '北京市',
        industry: '',
        duties: ''
      },
      labelPosition: 'right',
      seachList: [
        {
          id: 1,
          title: '22222',
          value: '555'
        },
        {
          id: 2,
          title: '4444',
          value: '666'
        },
        {
          id: 3,
          title: '565656',
          value: '33333'
        }
      ]
    };
  },
  components: {
    Search,
    Form,
    FormItem,
    TextField,
    Button,
    Cell
  },
  methods: {
    areaHandle () {
      tools.openWin({
        name: 'areaSelector',
        url: '../win.html',
        title: '选择地区',
        fname: 'areaSelector_f',
        furl: './common/areaSelector.html',
        hasLeft: 1,
        data: {
          nameSpace: 'areaSelector',
          area: this.form.houseHold,
          level: 2,
          callback: 'houseHoldCallback'
        }
      });
    },
    industryHandle () {

    },
    dutiesHandle () {

    }

  },
  mounted () {
    if (window.api) {
      window.api.addEventListener(
        {
          name: 'houseHoldCallback'
        },
        (ret, err) => {
          this.form.houseHold = JSON.parse(ret.value);
        }
      );
    }
  }
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
