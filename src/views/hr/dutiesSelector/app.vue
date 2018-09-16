<template>
  <div class="content">
    <div class="bodyer">
      <div v-for='idustrySort in idustrySorts' :key='idustrySort.id' class='mb25'>
        <h2 class='idustrySort'>{{idustrySort.value}}</h2>
        <ExpansionPanel :expand="panel === 'panel'+idustry.id" @change="toggle('panel'+idustry.id)" v-for='idustry in idustrySort.idustrys' :key='idustry.id'>
          <div slot="header">{{idustry.value}}</div>
          <Chip v-for='dutie in idustry.duties' :text-color="selectIndex.includes(dutie) ?'#fff':'#333' " :color="selectIndex.includes(dutie) ?'#009688':'#f5f5f5' " @click='toggleColor(dutie)' :key='dutie.id'>{{dutie.value}}</Chip>
        </ExpansionPanel>
      </div>
    </div>
    <div class='p16 fixBox'>
      <SubHeader>已选职位
        <span class='selectNum' v-text="selectIndex.length+'/5'"></span>
      </SubHeader>
      <Chip color='#009688' class="demo-chip selected" v-for="(chip, index) in selectIndex" :key="chip.id" @delete="remove(index)" delete>{{chip.value}}</Chip>
      <Button color="#009688" textColor="#ffffff" class='mt25' :full-width="true" :style="{boxShadow: '0 0 0'}" large @click='pushData'>确定</Button>
    </div>
  </div>
</template>
<script>
import tools from "util/tools";
import { ExpansionPanel, Chip, SubHeader, Button } from "muse-ui";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      selectColor: false,
      selectIndex: [],
      panel: "",
      idustrySorts: [
        {
          id: 1,
          value: "计算机/互联网/通信电子",
          idustrys: [
            {
              id: 1456456,
              value: "计算机软件",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 2678678,
              value: "计算机硬件",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 33245345,
              value: "计算机",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 4567,
              value: "制药 / 医疗",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 5678,
              value: "广告 / 媒体",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          value: "会计/金融/银行/保险",
          idustrys: [
            {
              id: 11,
              value: "计算机软件1",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 22,
              value: "计算机硬件123",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 33,
              value: "计算机123",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 44,
              value: "制药 / 医疗123",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 55,
              value: "广告 / 媒体123",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            }
          ]
        },
        {
          id: 3,
          value: "贸易/消费/制造/营运",
          idustrys: [
            {
              id: 1222,
              value: "计算机软件134345",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 2333,
              value: "gg",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 34444,
              value: "456546",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 45555,
              value: "dfgdfg",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 5666,
              value: "gfdfg",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            }
          ]
        },
        {
          id: 4,
          value: "制药/医疗",
          idustrys: [
            {
              id: 134534,
              value: "计算机软件134345",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 234534,
              value: "gg",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 3567,
              value: "456546",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 4567,
              value: "dfgdfg",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 5567,
              value: "gfdfg",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            }
          ]
        },
        {
          id: 5,
          value: "广告/媒体",
          idustrys: [
            {
              id: 12345345,
              value: "计算机软件134345",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 25678568,
              value: "gg",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 3345345,
              value: "456546",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 46465464,
              value: "dfgdfg",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            },
            {
              id: 5456456,
              value: "gfdfg",
              duties: [
                {
                  id: 456456,
                  value: "计算机硬件"
                },
                 {
                  id: 675675,
                  value: "计算机硬件1111"
                },
                {
                  id: 567567567,
                  value: "ertertert"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {
    ExpansionPanel,
    Chip,
    SubHeader,
    Button
  },
  methods: {
    toggle(panel) {
      this.panel = panel === this.panel ? "" : panel;
    },
    remove(index) {
      this.selectIndex.splice(index, 1);
    },
    toggleColor(index) {
      if (this.selectIndex.length >= 5 && !this.selectIndex.includes(index)) {
        Toast({ message: "最多选择5个行业" });
        return;
      }
      if (this.selectIndex.includes(index)) {
        var thisIndex = this.selectIndex.indexOf(index);
        this.selectIndex.splice(thisIndex, 1);
      } else {
        this.selectIndex.push(index);
      }
    },
    pushData() {
      if (this.selectIndex.length <= 0) {
        Toast({ message: "请选择职位" });
        return;
      } else {
        tools.closeWin(this.selectIndex);
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.content{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.idustrySort{
  padding: 0 14px;
  font-size: 14px;
}
body .mu-chip {
  color: #333;
  margin-left: 10px;
  margin-bottom: 10px;
}

.fixBox {
  width: 100%;
  padding: 10px;
  border-top: 1px solid #eee;
  background: #fff;
}

.mu-chip.selected {
  color: #fff;
}

.selectNum {
  font-size: 12px;
  margin-left: 10px;
}

.mt25 {
  margin-top: 25px;
}

.mb25{
  margin-bottom: 25px;
}

.bodyer{
  flex: 1;
  overflow: auto;
  height: 100%;
}
</style>
