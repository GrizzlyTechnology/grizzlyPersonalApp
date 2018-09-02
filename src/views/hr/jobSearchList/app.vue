<template>
  <List textline="two-line">
    <Form :model="{}">
      <template v-for='list in lists'>
        <ListItem avatar :ripple="false" button class='listItem'>
          <ListAction>
            <Checkbox v-model="checkboxModel" :value='list.id' @change='check'></Checkbox>
          </ListAction>
          <ListItemContent>
            <ListItemTitle>{{list.position}}
              <span class='claim'>{{list.claim}}</span>
            </ListItemTitle>
            <ListItemSubTitle>
              {{list.companyName}}
            </ListItemSubTitle>
          </ListItemContent>
          <ListAction>
            <ListItemAfterText class='salaryRange'>{{list.salaryRange}}</ListItemAfterText>
            <ListItemAfterText>{{list.date}}</ListItemAfterText>
          </ListAction>
        </ListItem>
        <Divider></Divider>
      </template>
      <div class='p16'>
        <Checkbox v-model='checked' v-on:change='checkedAll' label='全选'></Checkbox>
        <Button color="info" class='collection'>收藏</Button>
        <Button color="primary" class='deliveryButton'>立即投递</Button>
      </div>
    </Form>
  </List>
</template>

<script>
import { Checkbox, Divider, Form, Button } from "muse-ui";
import { Container, Row, Col } from "muse-ui/lib/Grid";
import {
  List,
  ListItem,
  ListAction,
  ListItemSubTitle,
  ListItemContent,
  ListItemTitle,
  ListItemAfterText
} from "muse-ui/lib/List";
export default {
  data() {
    return {
      lists: [
        {
          id: "1",
          position: "产品经理",
          claim: "3年/大专/镇江",
          salaryRange: "6K-8K",
          companyName: "飞龙信息发展股份有限公司",
          date: "2018-08-06"
        },
        {
          id: "2",
          position: "产品经理",
          claim: "3年/大专/镇江",
          salaryRange: "6K-8K",
          companyName: "飞龙信息发展股份有限公司",
          date: "2018-08-06"
        },
        {
          id: "3",
          position: "产品经理",
          claim: "3年/大专/镇江",
          salaryRange: "6K-8K",
          companyName: "飞龙信息发展股份有限公司",
          date: "2018-08-06"
        },
        {
          id: "4",
          position: "产品经理",
          claim: "3年/大专/镇江",
          salaryRange: "6K-8K",
          companyName: "飞龙信息发展股份有限公司",
          date: "2018-08-06"
        },
        {
          id: "5",
          position: "产品经理",
          claim: "3年/大专/镇江",
          salaryRange: "6K-8K",
          companyName: "飞龙信息发展股份有限公司",
          date: "2018-08-06"
        }
      ],
      checkboxModel: [],
      jobIds: [],
      checked: false
    };
  },
  components: {
    Container,
    List,
    ListItem,
    ListItemContent,
    ListItemTitle,
    ListItemSubTitle,
    ListAction,
    ListItemAfterText,
    Checkbox,
    Divider,
    Row,
    Col,
    Form,
    Button
  },
  methods: {
    async addToCollection() {
      // 加入收藏夹
      if (this.jobIds.length !== 0) {
        const response = await service.addToCollection({ ids: this.jobIds });
        switch (response.code) {
          case 0:
            Toast({
              position: "top",
              message: "收藏成功！"
            });
            break;
          default:
            Toast({
              position: "top",
              message: "收藏失败，请稍后重试！！"
            });
            break;
        }
      } else {
        Toast({
          position: "top",
          message: "请选择职位！"
        });
      }
    },
    async postJob() {
      if (this.jobIds.length !== 0) {
        const response = await service.postJob({ ids: this.jobIds });
        switch (response.code) {
          case 0:
            Toast({
              position: "top",
              message: "投递成功！"
            });
            break;
          default:
            Toast({
              position: "top",
              message: "投递失败，请稍后重试！！"
            });
            break;
        }
      } else {
        Toast({
          position: "top",
          message: "请选择职位！"
        });
      }
    },
    check(value) {
      this.jobIds = value;
    },
    checkedAll: function() {
      if (!this.checked) {
        //实现反选
        this.checkboxModel = [];
      } else {
        //实现全选
        this.checkboxModel = [];
        this.lists.forEach(item => this.checkboxModel.push(item.id));
      }
    },
    jobDetail: function() {
      tool.openWin({
        name: "zcgl",
        url: "../win.html",
        title: "职位详情",
        fname: "jobDetails_f",
        furl: "./hr/jobDetails.html",
        hasLeft: 1,
        hasRight: 1
      });
    }
  },
  watch: {
    //深度 watcher
    checkboxModel: {
      handler: function(val, oldVal) {
        if (this.checkboxModel.length === this.lists.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    }
  },
  mounted() {
    // this.getList();
  }
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.claim {
  color: #666;
  font-size: 12px;
  margin-left: 10px;
}

.salaryRange {
  color: #009688;
  font-size: 14px;
}

.p16 {
  padding: 16px;
  display: flex;
  background-color: #fff;
  align-items: center;
}

.mu-item-action {
  height: auto;
}

.listItem {
  background: #fff;
}

.collection {
  margin: 0 10px;
}
</style>
