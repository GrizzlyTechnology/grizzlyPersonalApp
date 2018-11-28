<template>
  <div class="content">
    <div class="bodyer">
      <div class="ucCell jd">
        <div class="ucCellCon">
          <span class="ucCellTitle">实习总结：</span>
          <span class="ucCellLabel" v-html="internshipSummary"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from 'service';
import { Toast } from 'mint-ui';
import tool from 'util/tools';
export default {
  data () {
    return {
      companyId: window.api.pageParam.companyId,
      internshipSummary: ''
    };
  },
  components: {},
  methods: {
    async internshipSummaryDetail () {
      tool.showProgress();
      const response = await service.getInternshipSummaryDetail({
        enterpriseid: this.companyId
      });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.internshipSummary = response.result.internshipSummary.replace(/\n|\r\n/g, '<br/>');
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
    this.internshipSummaryDetail();
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

.ucCell {
  position: relative;
  font-size: 16px;
  .ucCellCon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: auto;
    .ucCellTitle {
      line-height: 56px;
      color: #000;
      margin-left: 15px;
    }
    .ucCellLabel {
      float: right;
      line-height: 56px;
      color: #666;
      margin-right: 15px;
    }
  }
  .mu-icon {
    z-index: 1;
    position: relative;
  }
  .mint-cell-wrapper {
    background-image: none;
    border-bottom: 1px solid #eee;
    height: 56px;
  }
}

.jd.ucCell {
  .ucCellCon {
    position: relative;
  }
  .ucCellLabel {
    line-height: 28px;
    padding-left: 15px;
    margin-bottom: 30px;
    float: none;
    display: block;
  }
}
</style>
