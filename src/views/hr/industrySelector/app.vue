<template>
<div class="content">
  <div class="bodyer">
 <ExpansionPanel :expand="panel === 'panel'+idustrySort.id" @change="toggle('panel'+idustrySort.id)" v-for='idustrySort in idustrySorts' :key='idustrySort.id'>
    <div slot="header">{{idustrySort.value}}</div>
    <Chip v-for='idustry in idustrySort.idustrys' color='#f5f5f5' :key='idustry.id'>{{idustry.value}}</Chip>
  </ExpansionPanel>
  </div>
  <div class='p16 fixBox'>
  <SubHeader>已选行业<span class='selectNum'>0/5</span></SubHeader>
    <Chip color='#009688'class="demo-chip selected" v-for="(chip, index) in chips" :key="chip"  @delete="remove(index)" delete>{{chip}}</Chip>
  </div>
</div>
</template>
<script>
import { ExpansionPanel, Chip, SubHeader } from 'muse-ui';
// import { List, ListItem, ListAction, ListItemContent, ListItemTitle, ListItemSubTitle } from 'muse-ui/lib/List';
// import { Container } from 'muse-ui/lib/Grid';
export default {
  data () {
    return {
      panel: '',
      idustrySorts: [
        { id: 1,
          value: '计算机/互联网/通信电子',
          idustrys: [
            {
              id: 1,
              value: '计算机软件'
            },
            {
              id: 2,
              value: '计算机硬件'
            },
            {
              id: 3,
              value: '计算机'
            },
            {
              id: 4,
              value: '制药 / 医疗'
            },
            {
              id: 5,
              value: '广告 / 媒体'
            }
          ]
        },
        {
          id: 2,
          value: '会计/金融/银行/保险',
          idustrys: [
            {
              id: 1,
              value: '计算机软件1'
            },
            {
              id: 2,
              value: '计算机硬件123'
            },
            {
              id: 3,
              value: '计算机123'
            },
            {
              id: 4,
              value: '制药 / 医疗123'
            },
            {
              id: 5,
              value: '广告 / 媒体123'
            }
          ]
        },
        {
          id: 3,
          value: '贸易/消费/制造/营运',
          idustrys: [
            {
              id: 1,
              value: '计算机软件134345'
            },
            {
              id: 2,
              value: 'gg'
            },
            {
              id: 3,
              value: '456546'
            },
            {
              id: 4,
              value: 'dfgdfg'
            },
            {
              id: 5,
              value: 'gfdfg'
            }
          ]
        },
        {
          id: 4,
          value: '制药/医疗',
          idustrys: [
            {
              id: 1,
              value: '计算机软件134345'
            },
            {
              id: 2,
              value: 'gg'
            },
            {
              id: 3,
              value: '456546'
            },
            {
              id: 4,
              value: 'dfgdfg'
            },
            {
              id: 5,
              value: 'gfdfg'
            }
          ]
        },
        {
          id: 5,
          value: '广告/媒体',
          idustrys: [
            {
              id: 1,
              value: '计算机软件134345'
            },
            {
              id: 2,
              value: 'gg'
            },
            {
              id: 3,
              value: '456546'
            },
            {
              id: 4,
              value: 'dfgdfg'
            },
            {
              id: 5,
              value: 'gfdfg'
            }
          ]
        }
      ],
      chips: [
        'primary',
        'secondary',
        'secondary',
        'secondary'

      ]
    };
  },
  components: {
    ExpansionPanel,
    Chip,
    SubHeader
  },
  methods: {
    toggle (panel) {
      this.panel = panel === this.panel ? '' : panel;
    },
    remove (index) {
      this.chips.splice(index, 1);
    }
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
@import url('../../../assets/css/base.less');
body .mu-chip{
  color: #333;
  margin-left: 10px;
  margin-bottom: 10px;
}

.fixBox {
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #eee;
  background: #fff;
}

.mu-chip.selected{
  color: #fff;
}

.selectNum{
  font-size: 12px;
  margin-left: 10px;
}
</style>
