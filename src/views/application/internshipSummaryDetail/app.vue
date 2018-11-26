<template>
  <div class="content">
    <div class="bodyer">
      <div class="ucCell jd">
        <div class="ucCellCon">
          <span class="ucCellTitle">实习总结：</span>
          <p class="ucCellLabel">{{internshipSummary}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from 'service';
import { Toast, Cell } from 'mint-ui';
import tool from 'util/tools';
export default {
  data () {
    return {
      companyId: window.api.pageParam.companyId,
      internshipSummary: ''
    };
  },
  components: {
    Cell
  },
  methods: {
    async internshipSummaryDetail () {
      tool.showProgress();
      const response = await service.getInternshipSummaryDetail({
        enterpriseid: this.companyId
      });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.internshipSummary = response.result.internshipSummary;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    }
  },
  mounted () {
    this.internshipReportDetail();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.content {
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bodyer {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

label,
.mu-form-item-label {
  color: #000;
}

body .mu-text-field-input {
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
}

.mbox {
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 10px;
}
</style>
