<template>
  <div class="content">
    <!-- <Cell class="ucCell">
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
    </Cell> -->
    <Cell class="ucCell">
      <div class="ucCellCon">
        <span class="ucCellTitle">实习时间</span>
        <span class="ucCellLabel">{{head}}</span>
      </div>
    </Cell>
    <!-- <Cell class="ucCell">
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
    </Cell> -->
    <Panel title="周志主题">
      <div
        class="introduction"
        v-html="rewardText"
      />
    </Panel>
    <Panel title="本周工作内容">
      <div
        class="introduction"
        v-html="workContentText"
      />
    </Panel>
    <Panel title="图片" v-if='reslist.length>0'>
      <div class="picList">
      <div class="picCon" v-for="(file,index) in reslist">
        <div class="con" @click="imagesPopupOpen(reslist,index,'')" :style="{backgroundImage:'url('+file.coverUrl+')'}" />
      </div>
    </div>
    </Panel>
    <ImagesPopup ref="imagesPopup" :urlList="urlList" :index="urlListIndex" :description="description"></ImagesPopup>
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
      description: {},
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
  methods:{
    coverUrl(){
      if(this.reslist.length>0){
        this.reslist = this.reslist.map(row => {
          const urlAry = row.url.split('/');
          urlAry[urlAry.length - 1] = '255_' + urlAry[urlAry.length - 1];
          return ({
            url: row.url,
            coverUrl: urlAry.join('/'),
            id: row.id
          });
        });
      }
    },
     imagesPopupOpen (list, index, description) {
      this.urlList = list.map((r, i) => {
        this.description[i] = description.replace(/\n|\r\n/g, '<br/>');
        return r.url;
      });
      this.urlListIndex = index;
      this.$refs.imagesPopup.open();
    }
  },
  mounted () {
    this.coverUrl();
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

.picList {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  font-size: 0;
  margin: -5px -5px 15px;
  padding: 15px 15px;
  .picCon {
    width: 50%;
    padding-top: 50%;
    display: inline-block;
    position: relative;
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      background-color: #fff;
      border-radius: 50%;
      border: 1px #fff solid;
    }
    .con {
      position: absolute;
      left: 5px;
      top: 5px;
      bottom: 5px;
      right: 5px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #eee;
    }
    .picTitle {
      position: absolute;
      z-index: 1;
      color: #fff;
      bottom: 5px;
      left: 5px;
      right: 5px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
      padding-left: 5px;
      line-height: 30px;
    }
  }
  .uploader {
    .el-upload--picture-card {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
    .el-icon-plus {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 36px;
      font-weight: bold;
      margin-top: -21px;
      margin-left: -18px;
    }
    .el-progress {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -63px;
      margin-left: -63px;
    }
  }
}
</style>
