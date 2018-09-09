<template>
  <Container ref="container" class="demo-loadmore-content">
    <LoadMore @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
      <List textline="two-line">
        <Form :model="{}">
          <div class='allPostion'>
            <template v-for='(index,list) in lists'>
              <ListItem avatar :ripple="false" button class='listItem' :key="index" >
                <ListAction>
                  <Checkbox v-model="checkboxModel" :value='list.id'  @change='check'></Checkbox>
                </ListAction>
                <ListItemContent @click="jobDetails">
                  <ListItemTitle>{{list.position}}
                    <span class='claim'>{{list.claim}}</span>
                  </ListItemTitle>
                  <ListItemSubTitle>
                    {{list.companyName}}
                  </ListItemSubTitle>
                </ListItemContent>
                <ListAction @click="jobDetails">
                  <ListItemAfterText class='salaryRange'>{{list.salaryRange}}</ListItemAfterText>
                  <ListItemAfterText>{{list.date}}</ListItemAfterText>
                </ListAction>
              </ListItem>
              <Divider :key="index"></Divider>
            </template>
          </div>
          <div class='p16 fixBox'>
            <Checkbox v-model='checked' v-on:change='checkedAll' label='全选'></Checkbox>
            <Button color="info" class='collection' @click="collectionBtn">收藏</Button>
            <Button color="primary" class='deliveryButton' @click="deliveryBtn">立即投递</Button>
          </div>
        </Form>
      </List>
    </LoadMore>
  </Container>
</template>

<script>
import { Checkbox, Divider, Form, Button, LoadMore } from 'muse-ui';
import { Container, Row, Col } from 'muse-ui/lib/Grid';
import {
  List,
  ListItem,
  ListAction,
  ListItemSubTitle,
  ListItemContent,
  ListItemTitle,
  ListItemAfterText
} from 'muse-ui/lib/List';
import tool from 'util/tools';
export default {
  data () {
    return {
      num: 10,
      refreshing: false,
      loading: false,
      lists: [
        {
          id: '1',
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        },
        {
          id: '2',
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        },
        {
          id: '3',
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        },
        {
          id: '4',
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        },
        {
          id: '5',
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        },
        {
          id: '6',
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        },
        {
          id: '7',
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
        },
        {
          id: '8',
          position: '产品经理',
          claim: '3年/大专/镇江',
          salaryRange: '6K-8K',
          companyName: '飞龙信息发展股份有限公司',
          date: '2018-08-06'
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
    Button,
    LoadMore
  },
  methods: {
    jobDetails () {
      tool.openWin({
        name: 'jobDetails',
        url: '../win.html',
        title: '职位详情',
        fname: 'jobDetails_f',
        furl: './hr/jobDetails.html',
        hasLeft: 1,
        hasRight: 1
      });
    },
    async addToCollection () {
      // 加入收藏夹
      if (this.jobIds.length !== 0) {
        const response = await service.addToCollection({ ids: this.jobIds });
        switch (response.code) {
          case 0:
            Toast({
              position: 'top',
              message: '收藏成功！'
            });
            break;
          default:
            Toast({
              position: 'top',
              message: '收藏失败，请稍后重试！！'
            });
            break;
        }
      } else {
        Toast({
          position: 'top',
          message: '请选择职位！'
        });
      }
    },
    async postJob () {
      if (this.jobIds.length !== 0) {
        const response = await service.postJob({ ids: this.jobIds });
        switch (response.code) {
          case 0:
            Toast({
              position: 'top',
              message: '投递成功！'
            });
            break;
          default:
            Toast({
              position: 'top',
              message: '投递失败，请稍后重试！！'
            });
            break;
        }
      } else {
        Toast({
          position: 'top',
          message: '请选择职位！'
        });
      }
    },
    check (value) {
      this.jobIds = value;
    },
    checkedAll: function () {
      if (!this.checked) {
        // 实现反选
        this.checkboxModel = [];
      } else {
        // 实现全选
        this.checkboxModel = [];
        this.lists.forEach(item => this.checkboxModel.push(item.id));
      }
    },
    jobDetail: function () {
      tool.openWin({
        name: 'zcgl',
        url: '../win.html',
        title: '职位详情',
        fname: 'jobDetails_f',
        furl: './hr/jobDetails.html',
        hasLeft: 1,
        hasRight: 1
      });
    },
    collectionBtn () {
      this.addToCollection();
    },
    deliveryBtn () {
      this.postJob();
    },
    refresh () {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.num = 10;
      }, 2000);
    },
    load () {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
      }, 2000);
    }
  },
  watch: {
    // 深度 watcher
    checkboxModel: {
      handler: function (val, oldVal) {
        if (this.checkboxModel.length === this.lists.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    }
  },
  mounted () {
    // this.getList();
  }
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.container{
  padding: 0px;
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
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

.allPostion {
  padding-bottom: 56px;
}

.fixBox {
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
}
</style>
