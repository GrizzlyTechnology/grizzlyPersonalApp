<template>
  <div class="content">
    <div class="delivery" @click="showPostion(id)">
      <img :src="delivery.companyLogo" class="delivery-logo" />
      <div class="delivery-head">
        <div class="delivery-title">{{delivery.position}}</div> <span class="delivery-date">{{delivery.deliveryDateText}}投递</span>
      </div>
      <div class="delivery-salary-range">{{delivery.salaryRange}} <span class="delivery-job-area">{{delivery.jobarea}}</span></div>
      <div class="delivery-foot">{{delivery.companyName}}<span class="delivery-link">查看职位</span></div>
    </div>
    <div class="delivery">
      当前状态：<span :style="deliveryStatusColor(delivery.status)">{{delivery.statusLongText}}</span>
    </div>
    <div class="history">
      <StepVertical :data="delivery.list" />
    </div>
    <div v-if="delivery.status===1" class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" large @click="doChoice(statusMap.agreeInterview)">同意面试</Button>
      <Button color="#f75c5d" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" large @click="doChoice(statusMap.refuseInterview)">拒绝面试</Button>
    </div>
    <div v-if="delivery.status===3" class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" large @click="doChoice(statusMap.deliveryLeaveSchool)">申请离校</Button>
      <Button color="#f75c5d" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" large @click="doChoice(statusMap.personalRejection)">拒绝入职</Button>
    </div>
  </div>
</template>

<script>
import StepVertical from 'components/StepVertical';
import { Button } from 'muse-ui';
import tools from 'util/tools';
import dicts from 'util/dictMap';
import adapter from 'util/adapter';
import service from 'service';

export default {
  data () {
    return {
      statusMap: dicts,
      id: window.api ? window.api.pageParam.id : null,
      delivery: {
        ...(window.api ? window.api.pageParam.delivery : {}),
        list: []
      }
    };
  },
  components: {
    Button,
    StepVertical
  },
  methods: {
    async doChoice (status) {
      tools.showProgress();
      const response = await service.getDeliveryChoice({
        delivertId: this.id,
        status
      });
      tools.hideProgress();
      // console.log(JSON.stringify(response));
      switch (response.code) {
        case 0:
          this.getDetail();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '操作失败，请稍后重试！！'
          });
          break;
      }
    },
    async getDetail () {
      tools.showProgress();
      const response = await service.getDeliveryDetail(this.id);
      tools.hideProgress();
      // console.log(JSON.stringify(response));
      switch (response.code) {
        case 0:
          this.delivery.status = response.result.status;
          this.delivery.list = response.result.list.map(row => adapter.deliveryAdapterListRow(row));
          this.delivery.list.push({
            head: dicts.deliveryStatus[dicts.deliveryInvitation][0],
            info: this.delivery.deliveryDateText
          });
          break;
        default:
          tools.toast({
            position: 'top',
            message: '投递详情获取失败，请稍后重试！！'
          });
          break;
      }
    },
    deliveryStatusColor (status) {
      return `color: ${adapter.deliveryStatusColor(status)}`;
    },
    showPostion (id) {
      tools.openWin({
        name: 'jobDetails_' + id,
        url: '../win.html',
        title: '职位详情',
        fname: 'jobDetails_f_' + id,
        furl: './hr/jobDetails.html',
        hasLeft: 1,
        LCB: () => {
          this.getDetail();
        },
        data: {
          id: id
        }
      });
    }
  },
  mounted () {
    this.getDetail();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  & > *:last-child {
    margin-bottom: 0;
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
  .delivery-link {
    float: right;
    color: @primary;
  }
}
.history {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 15px;
  .mu-stepper-vertical {
    background-color: #fff;
    padding-top: 5px;
  }
  .stepHeader {
    color: #333 !important;
    font-size: 14px !important;
  }
  .stepConInfo {
    font-size: 12px !important;
  }
  .mu-step:last-child {
    .mu-step-content {
      border-left-color: transparent;
    }
  }
}
.footer {
  font-size: 0;
  .mu-raised-button {
    border-radius: 0;
    width: 50%;
  }
}
</style>
