<template>
  <div class="content">
    <div class="delivery" @click="showPostion(id)">
      <img :src="delivery.companyLogo" class="delivery-logo" />
      <div class="delivery-head">
        <div class="delivery-title">查看职位查看职位查看职位查看职位查看职位查看职位查看职位查看职位</div> <span class="delivery-date">8888年88月88日投递</span>
      </div>
      <div class="delivery-salary-range">{{delivery.salaryRange}} <span class="delivery-job-area">{{delivery.jobarea}}</span></div>
      <div class="delivery-foot">{{delivery.companyName}}<span class="delivery-link">查看职位</span></div>
    </div>
    <div class="delivery">
      当前状态：待邀约
    </div>
    <div class="history">
      <StepVertical :data="delivery.list" />
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" large>同 意</Button>
      <Button color="#f75c5d" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" large>拒 绝</Button>
    </div>
  </div>
</template>

<script>
import StepVertical from 'components/StepVertical';
import { Button } from 'muse-ui';
import tools from 'util/tools';

export default {
  data () {
    return {
      id: window.api ? window.api.pageParam.id : null,
      delivery: {
        companyLogo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
        companyName: '0大灰熊科技',
        deliveryDate: 1537857030,
        id: 0,
        jobarea: '江苏 | 镇江',
        education: '大专',
        jobexpyear: '1-3年',
        position: 'SEO/SEM',
        salaryRange: '8000-10000',
        status: '',
        list: [
          {
            head: '邀请您面试',
            info: '2014-5-6 11:12'
          },
          {
            head: '邀请您面试',
            info: '2014-5-6 11:12'
          },
          {
            head: '邀请您面试',
            info: '2014-5-6 11:12'
          },
          {
            head: '邀请您面试',
            info: '2014-5-6 11:12'
          },
          {
            head: '邀请您面试',
            info: '2014-5-6 11:12'
          },
          {
            head: '邀请您面试',
            info: '2014-5-6 11:12'
          },
          {
            head: '邀请您面试',
            info: '2014-5-6 11:12'
          },
          {
            head: '邀请您面试',
            info: '2014-5-6 11:12'
          },
          {
            head: '邀请您面试',
            info: '2014-5-6 11:12'
          },
          {
            head: '邀请您面试',
            info: '2014-5-6 11:12'
          }
        ]
      }
    };
  },
  components: {
    Button,
    StepVertical
  },
  methods: {
    async getDetail () {},
    showPostion (id) {
      tools.openWin({
        name: 'jobDetails_' + id,
        url: '../win.html',
        title: '职位详情',
        fname: 'jobDetails_f_' + id,
        furl: '../../hr/jobDetails.html',
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
}
.delivery {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  overflow: auto;
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
.history {
  flex: 1;
  overflow: auto;
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
