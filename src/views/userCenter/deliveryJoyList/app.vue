<template>
  <div class="content">
    <Tabs :value="active" inverse indicator-color="#009688" color="#009688" text-color="rgba(0, 0, 0, .54)" full-width>
      <Tab v-for="(deliveryList,index) in deliveryLists" :key="index" @click="active=index">
        {{deliveryList.name}}
        <!-- <i class='delivery-tips'>{{deliveryList.list.length}}</i> -->
      </Tab>
    </Tabs>
    <TabContainer v-model="active" swipeable class="list-con">
      <TabContainerItem v-for="(deliveryList,index) in deliveryLists" :ref="'container' + index" :key="index" :id="index" class="delivery-list">
        <LoadMore @refresh="refresh(index)" @load="load(index)" :refreshing="deliveryList.refreshing" :loading="deliveryList.loading">
          <div class="delivery" v-for="delivery in deliveryList.list" :key="delivery.id" @click="detail(delivery)">
            <img :src="delivery.companyLogo" class="delivery-logo" />
            <div class="delivery-head">
              <div class="delivery-title">{{delivery.position}}</div> <span class="delivery-date">{{delivery.deliveryDateText}}投递</span>
            </div>
            <div class="delivery-salary-range">{{delivery.salaryRange}} <span class="delivery-job-area">{{delivery.jobarea}}</span></div>
            <div class="delivery-foot">{{delivery.companyName}}<span class="delivery-status" :style="deliveryStatusColor(delivery.status)">{{delivery.statusText}}</span></div>
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
import dict from 'util/dictMap';
import service from 'service';
import adapter from 'util/adapter';

export default {
  data () {
    return {
      active: 0,
      deliveryLists: [
        {
          name: '全部',
          refreshing: false,
          loading: false,
          status: '',
          page: 1,
          list: []
        }
      ].concat(
        Object.keys(dict.deliveryTab).map(key => {
          return {
            name: dict.deliveryTab[key],
            refreshing: false,
            loading: false,
            status: Array.isArray(key) ? key.join(',') : key,
            page: 1,
            list: []
          };
        })
      )
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
  watch: {
    active (newValue, oldValue) {
      this.changeTab(newValue);
    }
  },
  methods: {
    async getList (active) {
      const response = await service.getDeliveryList({
        page: this.deliveryLists[active].page,
        status: this.deliveryLists[active].status
      });
      // console.log(JSON.stringify(response));
      if (this.deliveryLists[active].page === 1) {
        this.deliveryLists[active].refreshing = false;
      }
      if (this.deliveryLists[active].page > 1) {
        this.deliveryLists[active].loading = false;
      }
      switch (response.code) {
        case 0:
          if (this.deliveryLists[active].page === 1) {
            this.deliveryLists[active].list = response.result.list.map(
              delivery => adapter.deliveryAdapter(delivery)
            );
          }
          if (this.deliveryLists[active].page > 1) {
            response.result.list.forEach(delivery => {
              this.deliveryLists[active].list.push(
                adapter.deliveryAdapter(delivery)
              );
            });
          }
          break;
        default:
          tools.toast({
            position: 'top',
            message: '列表加载失败，请稍后重试！！'
          });
          break;
      }
    },
    deliveryStatusColor (status) {
      return `color: ${adapter.deliveryStatusColor(status)}`;
    },
    changeTab (active) {
      this.active = active;
      if (
        this.deliveryLists[this.active].list.length === 0 &&
        !this.deliveryLists[this.active].refreshing &&
        !this.deliveryLists[this.active].loading
      ) {
        this.refresh(this.active);
      }
    },
    refresh (active) {
      if (
        !this.deliveryLists[active].refreshing &&
        !this.deliveryLists[active].loading
      ) {
        this.deliveryLists[active].page = 1;
        this.deliveryLists[active].refreshing = true;
        this.$refs[`container${active}`].scrollTop = 0;
        this.getList(active);
      }
    },
    load (active) {
      if (
        !this.deliveryLists[active].refreshing &&
        !this.deliveryLists[active].loading
      ) {
        this.deliveryLists[active].page = this.deliveryLists[active].page + 1;
        this.deliveryLists[active].loading = true;
        this.getList(active);
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
          id: delivery.id,
          delivery
        }
      });
    }
  },
  mounted () {
    this.refresh(this.active);
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.mu-tab {
  min-width: 50px;
}
.mu-tab-wrapper {
  padding: 12px 0;
}
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.list-con {
  flex: 1;
  .mu-load-more {
    min-height: 200px;
  }
  .mint-tab-container-wrap {
    height: 100%;
  }
  .delivery-list {
    min-height: 200px;
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
  -webkit-overflow-scrolling: touch;
  &:active {
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
    margin-right: 10px;
  }
  .delivery-head {
    margin-bottom: 10px;
    position: relative;
    text-align: right;
    .delivery-title {
      .ell();
      position: absolute;
      left: 75px;
      right: 120px;
      top: 0;
      color: #000;
      font-size: 16px;
      line-height: 16px;
      text-align: left;
    }
    .delivery-date {
      font-size: 12px;
      color: #999;
    }
  }
  .delivery-job-area {
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
  .delivery-status {
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
