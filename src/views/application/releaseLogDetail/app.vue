<template>
  <div class="content">
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">实行单位</span>
        <span class="ucCellLabel">{{companyName}}</span>
      </div>
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">实习地点</span>
        <span class="ucCellLabel">{{internshipAddress}}</span>
      </div>
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">实习时间</span>
        <span class="ucCellLabel">{{head}}</span>
      </div>
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">实习部门</span>
        <span class="ucCellLabel">{{department}}</span>
      </div>
    </Cell>
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">实习岗位</span>
        <span class="ucCellLabel">{{group}}</span>
      </div>
    </Cell>

    <Panel title="本周工作内容">
      <div
        class="introduction"
        v-html="workContentText"
      />
    </Panel>
    <Panel title="本周收获">
      <div
        class="introduction"
        v-html="rewardText"
      />
    </Panel>
    <Panel title="图片">
       <div v-for="(file,index) in reslist">
              <div class="con" @click="imagesPopupOpen(reslist,index)" :style="{backgroundImage:'url('+file+')'}" />
            </div>

    </Panel>
    <ImagesPopup ref="imagesPopup" :urlList="urlList" :index="urlListIndex"></ImagesPopup>
  </div>
</template>

<script>
import { Cell } from 'mint-ui';
import Panel from 'components/Panel';
import ImagesPopup from 'components/ImagesPopup';
export default {
  data () {
    return {
      urlList: [],
      urlListIndex: 0,
      head: window.api ? window.api.pageParam.head : '',
      title: window.api ? window.api.pageParam.title : '',
      info: window.api ? window.api.pageParam.info : '',
      workContentText: window.api ? window.api.pageParam.workContentText : '',
      rewardText: window.api ? window.api.pageParam.rewardText : '',
      reslist:window.api ? window.api.pageParam.reslist : [],
      companyId: window.api ? window.api.pageParam.companyId : '',
      companyName: window.api ? window.api.pageParam.companyName : '',
      internshipAddress: window.api ? window.api.pageParam.internshipAddress : '',
      department: window.api ? window.api.pageParam.department : '',
      group: window.api ? window.api.pageParam.group : ''
    };
  },
  components: {
    Cell,
    Panel,
    ImagesPopup
  },
  method:{
    imagesPopupOpen (list, index) {
      this.urlList = list.map((r, i) => {
        return r.url;
      });
      this.urlListIndex = index;
      this.$refs.imagesPopup.open();
    }
  },
  mounted () {

  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.content {
  padding: 15px 0 0;
}
.ucCell {
  &.link {
    .isLink {
      display: block;
    }
    .ucCellCon:active {
      background-color: #eee;
    }
  }
  position: relative;
  .ucCellCon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    .ucCellTitle {
      line-height: 56px;
      color: #666;
      margin-left: 15px;
    }
    .ucCellLabel {
      float: right;
      line-height: 56px;
      color: #000;
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
.introduction {
  padding: 15px;
  line-height: 1.8;
  color: #666;
}
.content .moduleBodyer{
  border-radius: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  margin-bottom: 0 !important;
  border-left: 0 transparent none !important;
  border-right: 0 transparent none !important;
}
.moduleHeader .title{
  color: #666 !important;
}
</style>
