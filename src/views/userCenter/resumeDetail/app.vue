<template>
  <div class="content">
    <Panel title="基本信息" label="必填" :isLink="true" @click="()=>{}">
      <Cell title="姓名" value="说明文字"></Cell>
      <Cell title="性别" value="说明文字"></Cell>
      <Cell title="出生年月" value="说明文字"></Cell>
      <Cell title="毕业时间" value="说明文字"></Cell>
      <Cell title="户籍" value="说明文字"></Cell>
      <Cell title="手机号码" value="说明文字"></Cell>
      <Cell title="电子邮箱" value="说明文字"></Cell>
    </Panel>
    <Panel title="教育经历" label="必填" :isLink="true">
      <StepVertical
        :data="education"
      />
    </Panel>
    <Panel title="实习经历" label="必填" :isLink="true">
      <Cell title="标题文字" value="说明文字"></Cell>
      <Cell title="标题文字" value="说明文字"></Cell>
      <Cell title="标题文字" value="说明文字"></Cell>
    </Panel>
  </div>
  </div>
</template>

<script>
// import service from 'service';
import { Button } from 'muse-ui';
import { Cell } from 'mint-ui';
// import tools from 'util/tools';
import Panel from 'components/Panel';
import StepVertical from 'components/StepVertical';
export default {
  name: 'userClass',
  data () {
    return {
      education: [
        {
          head: '2017.5-2020.2',
          title: '交通技师学院',
          info: '大专/信息系'
        }, {
          head: '2017.5-2020.2',
          title: 'sdfsdf',
          info: '大专/信息系'
        }, {
          head: '2017.5-2020.2',
          title: '交通技师学院',
          info: '大专/信息系'
        }, {
          head: '2017.5-2020.2',
          title: '交通技师学院',
          info: '大专/信息系'
        }
      ],
      list: [
        // {
        //   id: 0,
        //   title: '我的简历1'
        // },
        // {
        //   id: 1,
        //   title: '我的简历2'
        // }
      ]
    };
  },
  components: {
    Button,
    Cell,
    Panel,
    StepVertical
  },
  methods: {},
  mounted () {}
};
</script>
<style lang="less">
.moduleBodyer {
  .mint-cell {
    .mint-cell-wrapper {
      font-size: 14px;
    }
  }
}
</style>
