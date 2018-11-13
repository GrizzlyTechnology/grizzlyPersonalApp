<template>
  <div class="content">
    <Tabs :value="active" inverse indicator-color="#009688" color="#009688" text-color="rgba(0, 0, 0, .54)" full-width>
      <Tab v-for="(deliveryList,index) in deliveryLists" :key="index" @click="changeTab(index)">
        {{deliveryList.name}}
        <!-- <i class='delivery-tips'>{{deliveryList.list.length}}</i> -->
      </Tab>
    </Tabs>
    <TabContainer v-model="active" swipeable class="list-con">
      <TabContainerItem v-for="(deliveryList,index) in deliveryLists" :ref="'container' + index" :key="index" :id="index" class="delivery-list">
        <LoadMore @refresh="refresh(index)" @load="load(index)" :refreshing="deliveryList.refreshing" :loading="deliveryList.loading">
          <div class="delivery" v-for="delivery in deliveryList.list" :key="delivery.id" @click="detail(delivery)">
            <img :src="delivery.companyLogo" class="delivery-logo" />
            <div class="delivery-head">{{delivery.position}} <span class="delivery-date">2018年5月10日投递</span></div>
            <div class="delivery-salary-range">{{delivery.salaryRange}} <span class="delivery-job-area">{{delivery.jobarea}}</span></div>
            <div class="delivery-foot">{{delivery.companyName}}<span class="delivery-status">状态</span></div>
          </div>
        </LoadMore>
      </TabContainerItem>
    </TabContainer>
  </div>
</template>

<script>
import { Tabs, LoadMore } from 'muse-ui';
import { Tab } from 'muse-ui/lib/Tabs';
import { TabContainer, TabContainerItem } from 'mint-ui';
import tools from 'util/tools';

export default {
  data () {
    return {
      active: 0,
      deliveryLists: [
        {
          name: '全部',
          refreshing: false,
          loading: false,
          status: null,
          page: 1,
          list: [
            {
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              companyName: '0大灰熊科技',
              deliveryDate: 1537857030,
              id: 0,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            },
            {
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              companyName: '1大灰熊科技',
              deliveryDate: 1537857030,
              id: 1,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            }
          ]
        },
        {
          name: '待邀约',
          refreshing: false,
          loading: false,
          status: null,
          page: 1,
          list: [
            {
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              companyName: '0大灰熊科技',
              deliveryDate: 1537857030,
              id: 0,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            },
            {
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              companyName: '1大灰熊科技',
              deliveryDate: 1537857030,
              id: 1,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            }
          ]
        },
        {
          name: '待offer',
          refreshing: false,
          loading: false,
          status: null,
          page: 1,
          list: [
            {
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              companyName: '0大灰熊科技',
              deliveryDate: 1537857030,
              id: 0,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            },
            {
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              companyName: '1大灰熊科技',
              deliveryDate: 1537857030,
              id: 1,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            }
          ]
        }, {
          name: '待离校',
          refreshing: false,
          loading: false,
          status: null,
          page: 1,
          list: [
            {
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              companyName: '0大灰熊科技',
              deliveryDate: 1537857030,
              id: 0,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            },
            {
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              companyName: '1大灰熊科技',
              deliveryDate: 1537857030,
              id: 1,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            }
          ]
        },
        {
          name: '不合适',
          refreshing: false,
          loading: false,
          status: null,
          page: 1,
          list: [
            {
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              companyName: '0大灰熊科技',
              deliveryDate: 1537857030,
              id: 0,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            },
            {
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              companyName: '1大灰熊科技',
              deliveryDate: 1537857030,
              id: 1,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            }
          ]
        }
      ]
    };
  },
  components: {
    Tabs,
    Tab,
    LoadMore,
    TabContainer,
    TabContainerItem
  },
  computed: {
    isLoading () {
      return this.refreshing || this.loading;
    }
  },
  methods: {
    changeTab (index) {
      // if (!this.isLoading) {
      this.active = index;
      // }
    },
    refresh (active) {
      if (
        !this.deliveryLists[active].refreshing &&
        !this.deliveryLists[active].loading
      ) {
        this.deliveryLists[active].refreshing = true;
        this.$refs[`container${active}`].scrollTop = 0;
        setTimeout(() => {
          this.deliveryLists[active].list = [];
          this.deliveryLists[active].refreshing = false;
          for (let i = 0; i < 10; i++) {
            this.deliveryLists[active].list.push({
              id: this.deliveryLists[active].list.length,
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              companyName:
                this.deliveryLists[active].list.length + '大灰熊科技',
              deliveryDate: 1537857030,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            });
          }
        }, 1000);
      }
    },
    load (active) {
      if (
        !this.deliveryLists[active].refreshing &&
        !this.deliveryLists[active].loading
      ) {
        this.deliveryLists[active].loading = true;
        setTimeout(() => {
          this.deliveryLists[active].loading = false;
          for (let i = 0; i < 5; i++) {
            this.deliveryLists[active].list.push({
              id: this.deliveryLists[active].list.length,
              companyName:
                this.deliveryLists[active].list.length + '大灰熊科技',
              companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
              deliveryDate: 1537857030,
              jobarea: '江苏 | 镇江',
              education: '大专',
              jobexpyear: '1-3年',
              position: 'SEO/SEM',
              salaryRange: '8000-10000',
              status: ''
            });
          }
        }, 1000);
      }
    },
    detail (delivery) {
      tools.openWin({
        name: 'deliveryDetail',
        url: '../win.html',
        title: '投递详情',
        fname: 'deliveryDetail_f',
        furl: './userCenter/deliveryDetail.html',
        hasLeft: 1,
        data: {
          nameSpace: 'deliveryDetail',
          id: delivery.id
        }
      });
    }
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.mu-tab{
  min-width: 50px;
}
.mu-tab-wrapper{
  padding: 12px 0;
}
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.list-con {
  flex: 1;
  .mint-tab-container-wrap {
    height: 100%;
  }
  .delivery-list {
    padding: 15px 0 0;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.delivery {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  overflow: auto;
  &:active{
    background-color: #f0f0f0;
  }
  .delivery-logo {
    height: 65px;
    width: 65px;
    display: block;
    border: 1px solid #eee;
    padding: 5px;
    background-color: #fff;
    float: left;
    margin-right: 10px
  }
  .delivery-head {
    color: #000;
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 16px;
  }
  .delivery-date {
    font-size: 12px;
    color: #999;
    float: right;
  }
  .delivery-job-area{
    font-size: 12px;
    color: #666;
    float: right;
  }
  .delivery-salary-range {
    color: #009688;
    font-size: 14px;
    margin-bottom: 10px;
    line-height: 16px;
  }
  .delivery-foot {
    color: #999;
    font-size: 12px;
    line-height: 16px;
  }
  .delivery-status{
    font-size: 14px;
    color: #666;
    float: right;
  }
}

.mu-tab-wrapper {
  flex-direction: row;
}

.delivery-tips {
  border-radius: 14px;
  color: #fff;
  background: red;
  font-style: normal;
  transform: scale(0.6);
  margin-left: 5px;
  padding: 6px;
  font-size: 16px;
  min-width: 14px;
  text-align: center;
  line-height: 14px;
  display: inline-block;
  min-width: 26px;
}
</style>
