<template>
  <div class="content">
    <div class="bodyer">
      <div class="listCon">
        <CellSwipe class="rowList" v-for="(row,index) in list" value="oko" :key="row.id" :right="[
          {
            content: '编辑',
            style: { background: '#07A9EA', color: '#fff' },
            handler: () => {edit(row)}
          },{
            content: '删除',
            style: { background: '#e7585a', color: '#fff' },
            handler: () => {del(row,index)}
          }
        ]">
          <SkillLine class="skill" :title="row.label" :value="row.value" />
        </CellSwipe>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="create">添加技能评价</Button>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash';
import { CellSwipe } from 'mint-ui';
import { Button } from 'muse-ui';
import tools from 'util/tools';
import service from 'service';
import SkillLine from 'components/SkillLine';
// import adapter from 'util/adapter';

// import AreaSelected from 'components/AreaSelected';
export default {
  data () {
    return {
      id: window.api ? window.api.pageParam.id : null,
      // list: window.api ? window.api.pageParam.skills : []
      list: [{
        label: 'js',
        value: 21
      },
      {
        label: 'php',
        value: 35
      },
      {
        label: 'java',
        value: 78
      },
      {
        label: 'node',
        value: 99
      }]
    };
  },
  components: {
    Button,
    CellSwipe,
    SkillLine
  },
  methods: {
    async unLink (skills) {
      tools.showProgress();
      const response = await service.updateUserBaesInfo({
        skills,
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.list = JSON.parse(skills);
          break;
        default:
          tools.toast({
            position: 'top',
            message: '技能评价删除失败'
          });
          break;
      }
    },
    del (data, index) {
      tools.confirm({
        title: '警告',
        content: `确定要删除 ${data.label}？`,
        callback: () => {
          this.unLink(
            JSON.stringify(
              this.list.filter(r => {
                if (r.label !== data.label) {
                  return r;
                }
              })
            )
          );
        }
      });
    },
    edit (data, index) {},
    create () {}
  },
  mounted () {}
};
</script>
<style lang="less">
.rowList {
  .mint-cell {
    min-height: 54px;
  }
  .mint-cell-wrapper {
    background-image: none;
  }
  .mint-cell-title {
    display: none;
  }
  .mint-cell-value {
    display: block;
    width: 100%;
  }
  .mint-cell-swipe-button{
    line-height: 56px;
  }
}
</style>

<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.content {
  // padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.bodyer {
  flex: 1;
  overflow: auto;
}
.isLink {
  position: absolute;
  top: 16px;
  right: 15px;
  font-size: 16px;
}
.rowList {
  border-bottom: 1px @grayLine solid;
  font-size: 16px;
  background-color: #fff;
  &:active {
    background-color: #eee;
  }
  .skill {
    color: #333;
  }
}
.footer {
  height: 44px;
}
</style>
