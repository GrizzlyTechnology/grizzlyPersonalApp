<template>
  <div>
    <ExpansionPanel :expand='true'>
      <div slot="header">前期计划</div>
      <div class='planDetail'>
        <p> <span>计划周期：</span> {{earlyPlan.cycle}}</p>
      </div>
      <div class='planDetail'>
        <p><span>指导师傅：</span> {{earlyPlan.master}}</p>
      </div>
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
    <ExpansionPanel>
      <div slot="header">中期计划</div>
       <div class='planDetail'>
        <p> <span>计划周期：</span> {{intermediatePlan.cycle}}</p>
      </div>
      <div class='planDetail'>
        <p><span>指导师傅：</span> {{intermediatePlan.master}}</p>
      </div>
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
    <ExpansionPanel>
      <div slot="header">后期计划</div>
      <div class='planDetail'>
        <p> <span>计划周期：</span> {{latePlan.cycle}}</p>
      </div>
      <div class='planDetail'>
        <p><span>指导师傅：</span> {{latePlan.master}}</p>
      </div>
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
// import tool from 'util/tools';
export default {
  data () {
    return {
      earlyPlan: {
        cycle: ' 2018年6月10日——2018年7月10日',
        master: '葛明敏',
        post: '技术部-研发组',
        content: '跟随指导师傅熟悉业务',
        aims: '能够独立完成一个留言板'
      },
      intermediatePlan: {
        cycle: ' 2018年6月10日——2018年7月10日',
        master: '葛明敏',
        post: '技术部-研发组',
        content: '跟随指导师傅熟悉业务',
        aims: '能够独立完成一个留言板'
      },
      latePlan: {
        cycle: ' 2018年6月10日——2018年7月10日',
        master: '葛明敏',
        post: '技术部-研发组',
        content: '跟随指导师傅熟悉业务',
        aims: '能够独立完成一个留言板'
      }
    };
  },
  components: {
    ExpansionPanel
  },
  methods: {},
  mounted () {}
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.planDetail p span {
  font-weight: bold;
  margin-right: 5px;
}
</style>
