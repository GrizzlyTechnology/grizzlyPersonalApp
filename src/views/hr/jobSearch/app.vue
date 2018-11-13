<template>
  <div class="content">
    <div class='p15'>
      <div class='flexCon'>
      <!-- <span @click="areaHandle" class='araeBox'>
          <i class='iconfont icon-weizhi-blue'></i>{{areaText}}</span> -->
       <AutoComplete :data="filterResult" @select="submit" @keyup.enter='submit' @keyup="getAllSearchValue" label="" v-model="form.keyWord" placeholder="搜索公司/职位" class='searchBox' :solo='true'>
          <i class='iconfont icon-suosou' @click='submit'></i>
        </AutoComplete>
      </div>
    </div>
    <div class="p15 mt25 bgWhite" v-show="resumeList.length>=1&& count >=1 &&chips.length > 0" >
      <SubHeader>猜你要搜</SubHeader>
      <Chip color="#f5f5f5" v-for='chip in chips' :key='chip.index' @click="jobDetails(chip.id)">{{chip.position}}</Chip>
    </div>
  </div>
</template>

<script>
import service from 'service';
import { Toast } from 'mint-ui';
import { SubHeader, Chip, AutoComplete } from 'muse-ui';
import tool from 'util/tools';
export default {
  data () {
    return {
       form: {
        keyWord: ''
        // area: ''
      },
      area: [],
      defaultResult: [],
      labelPosition: 'right',
       count: 0,
       resumeList: [],
      chips: []
    };
  },
  components: {
    SubHeader,
    Chip,
    Toast,
    AutoComplete
  },
  computed: {
    // areaText () {
    //   return this.area.length > 0
    //     ? this.area[this.area.length - 1].label
    //     : '全国';
    // },
    filterResult () {
      return this.defaultResult.filter(value =>
        new RegExp(this.value, 'i').test(value)
      );
    }
  },
  methods: {
    // 点击选择地区
     // areaHandle () {
    //   tool.openWin({
    //     name: 'areaSelector',
    //     url: '../win.html',
    //     title: '选择地区',
    //     fname: 'areaSelector_f',
    //     furl: './common/areaSelector.html',
    //     hasLeft: 1,
    //     data: {
    //       nameSpace: 'areaSelector',
    //       area: this.area,
    //       level: 2,
    //       callback: (ret, err) => {
    //         this.area = ret.value;
    //       }
    //     }
    //   });
    // },
    // 点击搜索
    search () {
        // this.form.area =
      //   this.area.length > 0 ? this.area[this.area.length - 1].value : '';
      tool.openWin({
        name: 'jobSearchList',
        url: '../win.html',
        title: '所有职位',
        fname: 'jobSearchList_f',
        furl: './hr/jobSearchList.html',
        hasLeft: 1,
        data: {
          nameSpace: 'jobSearchList',
          // area: this.form.area,
          keyWord: this.form.keyWord
        }
      });
    },
    // 获取职位
    async getAllSearchValue () {
      tool.showProgress();
      const response = await service.getAllPosition(this.form.keyWord);
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.defaultResult = response.result.info;
          break;
        default:
          tool.toast({
            position: 'top',
            message: '搜索失败，请重试'
          });
          break;
      }
    },
     submit () {
      this.search();
    },
     async getResumeList () {
      tool.showProgress();
      const response = await service.getUserBaseInfo();
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.resumeList =
            response.result.resumeInfo.length > 0
              ? [response.result.resumeInfo[0]]
              : [];

          this.listsData();
          break;
        default:
          tool.toast({
            position: 'top',
            message: '简历列表获取失败'
          });
          break;
      }
    },
    // 适合你的职位列表数据
    async listsData () {
      tool.showProgress();
      const response = await service.searchBoxValue({
        keyWord: this.resumeList[0].desiredposition
      });
      tool.hideProgress();
      switch (response.code) {
        case 0:
          this.chips = response.result.list;
          this.count = response.result.count;
          break;
        default:
          Toast({
            position: 'top',
            message: '加载失败，请稍后重试！！'
          });
          break;
      }
    },
    // 职位详情
    jobDetails (id) {
      tool.openWin({
        name: 'jobDetails_' + id,
        url: '../win.html',
        title: '职位详情',
        fname: 'jobDetails_f_' + id,
        furl: './hr/jobDetails.html',
        hasLeft: 1,
        hasRight: 1,
        data: {
          id: id
        }
      });
    },
    chipHandle () {
      this.searchChipValue();
    }
  },
  mounted () {
     this.getResumeList();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");

.p15 {
  padding: 15px;
}

.bgWhite {
  background: #fff;
}

.flexCon {
  display: flex;
  align-items: center;
  border: 1px solid #009688;
  border-radius: 5px;
  padding-left: 5px;
  background: #fff;
}
.araeBox {
  width: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mu-input.searchBox {
  // width: 80%;
  width:98%;
  min-height: auto;
  padding-top: 0px;
  padding-bottom: 0px;
}

body .mu-secondary-text-color {
  color: #009688;
}

.flexCon .iconfont {
  font-size: 20px;
  color: #009688;
  margin-right: 15px;
}

.flexCon .iconfont.icon-weizhi-blue {
  margin-right: 0;
}

.searchBox input {
  width: 100%;
  height: 40px;
  padding-left: 1rem;
}

.mu-sub-header {
  padding-left: 0;
}

body .mu-chip {
  color: #333;
  margin-left: 10px;
  margin-bottom: 10px;
}

.mt25 {
  margin-top: 25px;
}
</style>
