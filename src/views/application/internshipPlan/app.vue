<template>
  <div>
    <ExpansionPanel :expand="panel === 'panel1'" @change="toggle('panel1')">
      <div slot="header">前期计划</div>
      <div class='planDetail'>
        <p> <span>计划周期：</span> {{earlyPlan.cycle}}</p>
      </div>
      <!-- <div class='planDetail'>
        <p><span>指导师傅：</span> {{earlyPlan.master}}</p>
      </div> -->
      <div class='planDetail'>
        <p><span>实习岗位：</span> {{earlyPlan.post}}</p>
      </div>
      <div class='planDetail'>
        <p><span>实习内容：</span></p>
        <p>{{earlyPlan.content}}</p>
      </div>
      <div class='planDetail'>
        <p><span>实习目标：</span></p>
        <p>{{earlyPlan.aims}}</p>
      </div>
    </ExpansionPanel>
    <ExpansionPanel :expand="panel === 'panel2'" @change="toggle('panel2')">
      <div slot="header">中期计划</div>
      <div class='planDetail'>
        <p> <span>计划周期：</span> {{intermediatePlan.cycle}}</p>
      </div>
      <!-- <div class='planDetail'>
        <p><span>指导师傅：</span> {{intermediatePlan.master}}</p>
      </div> -->
      <div class='planDetail'>
        <p><span>实习岗位：</span> {{intermediatePlan.post}}</p>
      </div>
      <div class='planDetail'>
        <p><span>实习内容：</span></p>
        <p>{{intermediatePlan.content}}</p>
      </div>
      <div class='planDetail'>
        <p><span>实习目标：</span></p>
        <p>{{intermediatePlan.aims}}</p>
      </div>
    </ExpansionPanel>
    <ExpansionPanel :expand="panel === 'panel3'" @change="toggle('panel3')">
      <div slot="header">后期计划</div>
      <div class='planDetail'>
        <p> <span>计划周期：</span> {{latePlan.cycle}}</p>
      </div>
      <!-- <div class='planDetail'>
        <p><span>指导师傅：</span> {{latePlan.master}}</p>
      </div> -->
      <div class='planDetail'>
        <p><span>实习岗位：</span> {{latePlan.post}}</p>
      </div>
      <div class='planDetail'>
        <p><span>实习内容：</span></p>
        <p>{{latePlan.content}}</p>
      </div>
      <div class='planDetail'>
        <p><span>实习目标：</span></p>
        <p>{{latePlan.aims}}</p>
      </div>
    </ExpansionPanel>
  </div>

</template>
<script>
import { ExpansionPanel } from 'muse-ui';
// import { Container } from "muse-ui/lib/Grid";
import { Toast } from 'mint-ui';
import service from 'service';
export default {
  data () {
    return {
      panel: '',
      companyId: window.api.pageParam.companyId,
      earlyPlan: [
        // cycle: ' 2018年6月10日——2018年7月10日',
        // // master: '葛明敏',
        // post: '技术部-研发组',
        // content: '跟随指导师傅熟悉业务',
        // aims: '能够独立完成一个留言板'
      ],
      intermediatePlan: [],
      latePlan: []
    };
  },
  components: {
    ExpansionPanel
  },
  methods: {
    toggle (panel) {
      this.panel = panel === this.panel ? '' : panel;
    },
    async planDataList () {
      const response = await service.planData({
        enterpriseid: this.companyId
      });
      switch (response.code) {
        case 0:
          this.earlyPlan = response.result.earlyPlan;
          this.intermediatePlan = response.result.intermediatePlan;
          this.latePlan = response.result.latePlan;
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
    this.planDataList();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.planDetail p span {
  font-weight: bold;
  margin-right: 5px;
}
</style>
