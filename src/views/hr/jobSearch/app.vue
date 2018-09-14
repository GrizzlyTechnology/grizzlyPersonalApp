<template>
  <div class="content">
    <div class='p15'>
      <Search v-model="value" class='searchBox' cancel-text="取消" placeholder="搜索公司/职位" :result="filterResult">
      </Search>
      <Form ref="form" :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="45">
        <FormItem label="地区" prop="areaText">
          <TextField v-model="form.area" readonly @click="areaHandle"></TextField>
        </FormItem>
        <FormItem label="行业" prop="industryText">
          <TextField v-model="form.industry" readonly @click="industryHandle"></TextField>
        </FormItem>
        <FormItem label="职能" prop="dutiesText">
          <TextField v-model="form.duties" readonly @click="dutiesHandle"></TextField>
        </FormItem>
      </Form>
      <Button color="#009688"  textColor="#ffffff" :full-width="true" :style="{boxShadow: '0 0 0'}" large @click="searchPush">搜索</Button>
    </div>
    <div class="p15 mt25">
      <SubHeader>猜你要搜</SubHeader>
      <Chip color="#f5f5f5" v-for='chip in chips' :key='chip.id' @click="chipHandle">{{chip.value}}</Chip>
    </div>
  </div>
</template>

<script>
import { Search, Cell, Toast } from "mint-ui";
import { TextField, Button, SubHeader, Chip } from "muse-ui";
import { Form, FormItem } from "muse-ui/lib/Form";
import tools from "util/tools";
export default {
  data() {
    return {
      value: "",
       defaultResult: [
        'Apple',
        'Banana',
        'Orange',
        'Durian',
        'Lemon',
        'Peach',
        'Cherry',
        'Berry',
        'Core',
        'Fig',
        'Haw',
        'Melon',
        'Plum',
        'Pear',
        'Peanut',
        'Other'
      ],
      form: {
        area: "北京市",
        industry: "",
        duties: ""
      },
      labelPosition: "right",
      chips: [
        { id: 1, value: "产品经理" },
        { id: 2, value: "网络科技" },
        { id: 3, value: "信息科技" },
        { id: 4, value: "前端工程师" },
        { id: 5, value: "生物科技" },
        { id: 6, value: "医药科技" }
      ]
    };
  },
  components: {
    Search,
    Form,
    FormItem,
    TextField,
    Button,
    Cell,
    SubHeader,
    Chip,
    Toast
  },
  computed: {
    areaText() {
      return this.form.area.map(row => row.label).join(" / ");
    },
     filterResult() {
      return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
    }
  },
  methods: {
    areaHandle() {
      tools.openWin({
        name: "areaSelector",
        url: "../win.html",
        title: "选择地区",
        fname: "areaSelector_f",
        furl: "./common/areaSelector.html",
        hasLeft: 1,
        data: {
          nameSpace: "areaSelector",
          area: this.form.houseHold,
          level: 2,
          callback: "houseHoldCallback"
        }
      });
    },
    industryHandle() {
      tools.openWin({
        name: "industrySelector",
        url: "../win.html",
        title: "选择行业",
        fname: "industrySelector_f",
        furl: "industrySelector.html",
        hasLeft: 1
        // data: {
        //   nameSpace: "industrySelector",
        //   area: this.form.houseHold,
        //   level: 2,
        //   callback: "houseHoldCallback"
        // }
      });
    },
    dutiesHandle() {
       tools.openWin({
        name: "dutiesSelector",
        url: "../win.html",
        title: "选择职能",
        fname: "dutiesSelector_f",
        furl: "dutiesSelector.html",
        hasLeft: 1
        // data: {
        //   nameSpace: "industrySelector",
        //   area: this.form.houseHold,
        //   level: 2,
        //   callback: "houseHoldCallback"
        // }
      });
    },
    searchPush() {
      tools.openWin({
        name: "jobSearchList",
        url: "../win.html",
        title: "职位详情",
        fname: "jobSearchList_f",
        furl: "./hr/jobSearchList.html",
        hasLeft: 1,
        hasRight: 1
        // data: {
        //   nameSpace: 'areaSelector',
        //   area: this.form.houseHold,
        //   level: 2,
        //   callback: 'houseHoldCallback'
        // }
      });
    },
    chipHandle() {
      tools.openWin({
        name: "jobSearchList",
        url: "../win.html",
        title: "职位详情",
        fname: "jobSearchList_f",
        furl: "./hr/jobSearchList.html",
        hasLeft: 1,
        hasRight: 1
        // data: {
        //   nameSpace: 'areaSelector',
        //   area: this.form.houseHold,
        //   level: 2,
        //   callback: 'houseHoldCallback'
        // }
      });
    }
  },
  mounted() {
    tools.addEventListener(
      {
        name: "houseHoldCallback"
      },
      (ret, err) => {
        this.form.houseHold = ret.value;
      }
    );
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");

.p15 {
  background: #fff;
  padding: 15px;
}

.mint-search {
  height: auto;
  margin-bottom: 25px;
}

.searchBox .mint-search-list {
  padding-top: 65px;
  z-index: 999;
}

.mint-searchbar {
  background: none;
  border: 1px solid #009688;
  border-radius: 2px;
   z-index: 99999;
}

.mint-searchbar-cancel,
.mint-searchbar-inner .mintui-search {
  color: #009688;
}

.searchBox .mint-search-list-warp {
  background-color: #fff;
}

.mu-sub-header {
  padding-left: 0;
}

body .mu-chip {
  color: #333;
  margin-left: 10px;
  margin-bottom: 10px;
}

.mt25 {
  margin-top: 25px;
}
</style>
