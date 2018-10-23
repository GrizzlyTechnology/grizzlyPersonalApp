<template>
  <div>
    <ExpansionPanel>
      <div slot="header">前期计划</div>
      <div class='planDetail'>
        <p> <span>计划周期：</span> 2018年6月10日——2018年7月10日</p>
      </div>
      <div class='planDetail'>
        <p><span>指导师傅：</span> 葛明敏</p>
      </div>
      <div class='planDetail'>
        <p><span>实习岗位：</span> 技术部-研发组</p>
      </div>
      <div class='planDetail'>
        <p><span>实实习内容：</span></p>
        <p>跟随指导师傅熟悉业务</p>
      </div>
      <div class='planDetail'>
        <p><span>实实习内容：</span></p>
        <p>能够独立完成一个留言板</p>
      </div>
    </ExpansionPanel>
    <ExpansionPanel>
      <div slot="header">中期计划</div>
      <div class='planDetail'>
        <p> <span>计划周期：</span> 2018年6月10日——2018年7月10日</p>
      </div>
      <div class='planDetail'>
        <p><span>指导师傅：</span> 葛明敏</p>
      </div>
      <div class='planDetail'>
        <p><span>实习岗位：</span> 技术部-研发组</p>
      </div>
      <div class='planDetail'>
        <p><span>实实习内容：</span></p>
        <p>跟随指导师傅熟悉业务</p>
      </div>
      <div class='planDetail'>
        <p><span>实实习内容：</span></p>
        <p>能够独立完成一个留言板</p>
      </div>
    </ExpansionPanel>
    <ExpansionPanel>
      <div slot="header">后期计划</div>
      <div class='planDetail'>
        <p> <span>计划周期：</span> 2018年6月10日——2018年7月10日</p>
      </div>
      <div class='planDetail'>
        <p><span>指导师傅：</span> 葛明敏</p>
      </div>
      <div class='planDetail'>
        <p><span>实习岗位：</span> 技术部-研发组</p>
      </div>
      <div class='planDetail'>
        <p><span>实实习内容：</span></p>
        <p>跟随指导师傅熟悉业务</p>
      </div>
      <div class='planDetail'>
        <p><span>实实习内容：</span></p>
        <p>能够独立完成一个留言板</p>
      </div>
    </ExpansionPanel>
  </div>

</template>
<script>
import { ExpansionPanel } from "muse-ui";
// import { Container } from "muse-ui/lib/Grid";
import tool from "util/tools";
export default {
  data() {
    return {};
  },
  components: {
    ExpansionPanel
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.planDetail p span {
  font-weight: bold;
  margin-right: 5px;
}
</style>
