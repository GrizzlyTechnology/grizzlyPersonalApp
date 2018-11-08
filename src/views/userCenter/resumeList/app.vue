<template>
<<<<<<< HEAD
    <div class="content">
        <div class="bodyer">
            <div class="listCon">
                <CellSwipe v-for="row in list" :key="row.id" class="rowList" :right="[
=======
  <div class="content">
    <div class="bodyer">
      <div class="listCon">
      <CellSwipe
        class="rowList"
        v-for="row in list"
        :key="row.id"
        :right="[
>>>>>>> 3238df7bfd0b6e85f5a7ad416a4b063a4250716a
          {
            content: '删除',
            style: { background: '#e7585a', color: '#fff' },
            handler: () => {del(row)}
          }
<<<<<<< HEAD
        ]">
                    <div class="title" slot="title" @click="resumeDetail(row)">{{row.title}}</div>
                    <i class="mu-icon icon-right isLink" />
                </CellSwipe>
            </div>
        </div>
        <div class="footer">
            <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="create">创建简历</Button>
        </div>
    </div>
=======
        ]"
      >
        <div
          class="title"
          slot="title"
          @click="resumeDetail(row)"
        >
          {{row.title}}
        </div>
        <i class="mu-icon icon-right isLink" />
      </CellSwipe>
      </div>
    </div>
    <div class="footer" v-if="list.length===0">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="create">创建简历</Button>
    </div>
  </div>
>>>>>>> 3238df7bfd0b6e85f5a7ad416a4b063a4250716a
</template>

<script>
// import service from 'service';
import { CellSwipe } from "mint-ui";
import { Button } from "muse-ui";
import tools from "util/tools";
import service from "service";

// import AreaSelected from 'components/AreaSelected';
export default {
<<<<<<< HEAD
  name: "userClass",
  data() {
    return {
      userInfo: {},
      list: [
        { id: 1, name: "ok" },
        { id: 2, name: "ok" },
        { id: 3, name: "ok" },
        { id: 4, name: "ok" }
      ]
=======
  data () {
    return {
      userInfo: {},
      list: []
>>>>>>> 3238df7bfd0b6e85f5a7ad416a4b063a4250716a
    };
  },
  components: {
    Button,
    CellSwipe
  },
  methods: {
    async getList() {
      tools.showProgress();
      const response = await service.getUserBaseInfo();
      tools.hideProgress();
      // console.log(JSON.stringify(response));
      switch (response.code) {
        case 0:
          this.list = response.result.resumeInfo.length > 0 ? [response.result.resumeInfo[0]] : [];
          break;
        default:
          tools.toast({
            position: "top",
            message: "简历列表获取失败"
          });
          break;
      }
    },
<<<<<<< HEAD
    async create() {
=======

    async create () {
>>>>>>> 3238df7bfd0b6e85f5a7ad416a4b063a4250716a
      // 获取用户信息补充基本信息
      tools.showProgress();
      const response = await service.getUserInfo();
      tools.hideProgress();
      let baseInfo = {
        name: "",
        sex: "",
        phone: ""
      };
      switch (response.code) {
        case 0:
          baseInfo = {
            name: response.result.userInfo.name || "",
            sex: response.result.userInfo.sex,
            phone: response.result.userInfo.phone
          };
          break;
        default:
          break;
      }

      // 创建我的基本信息
      tools.openWin({
        name: "userBaseInfo",
        url: "../win.html",
        title: "基本信息",
        fname: "userBaseInfo_f",
        furl: "./userCenter/userBaseInfo.html",
        hasLeft: 1,
        data: {
          nameSpace: "userBaseInfo",
          type: "create",
          baseInfo: {
            name: "", // true string 真实姓名
            sex: 1, // true string 性别
            birthday: null, // true string生日
            houseHold: [], // true string 籍贯
            address: [],
            street: "",
            phone: "", // true string手机
            email: "", // true string 邮箱
            ...baseInfo
          },
          callback: (ret, err) => {
            this.getList();
            tools.openWin({
              name: 'resumeDetail',
              url: '../win.html',
              title: '我的简历',
              fname: 'resumeDetail_f',
              furl: './userCenter/resumeDetail.html',
              hasLeft: 1,
              data: {
                nameSpace: 'resumeDetail',
                from: 'userBaseInfo',
                id: ret.value,
                type: 'edit'
              }
            });
          }
        }
      });
    },
<<<<<<< HEAD
    del(data) {
      alert(data.id + data.name);
    },
    resumeDetail(data) {
=======

    resumeDetail (data) {
>>>>>>> 3238df7bfd0b6e85f5a7ad416a4b063a4250716a
      tools.openWin({
        name: "resumeDetail",
        url: "../win.html",
        title: data.title,
        fname: "resumeDetail_f",
        furl: "./userCenter/resumeDetail.html",
        hasLeft: 1,
        data: {
          nameSpace: "resumeDetail",
          from: "resumeList",
          type: "edit",
          id: data.id
        }
      });
    },
<<<<<<< HEAD
    openlist() {
      var UIListView = window.api.require("UIListView");
      UIListView.open(
        {
          rect: {
            x: 0,
            y: 0,
            w: window.api.winWidth,
            h: window.api.frameHeight
          },
          data: [
            {
              uid: "1001",
              imgPath: "widget://res/img/apicloud.png",
              title: "标题",
              subTitle: "子标题，说明文字",
              remark: "备注",
              icon: ""
            },
            {
              uid: "1001",
              imgPath: "widget://res/img/apicloud.png",
              title: "标题",
              subTitle: "子标题，说明文字",
              remark: "备注",
              icon: ""
            },
            {
              uid: "1001",
              imgPath: "widget://res/img/apicloud.png",
              title: "标题",
              subTitle: "子标题，说明文字",
              remark: "备注",
              icon: ""
            },
            {
              uid: "1001",
              imgPath: "widget://res/img/apicloud.png",
              title: "标题",
              subTitle: "子标题，说明文字",
              remark: "备注",
              icon: ""
            },
            {
              uid: "1001",
              imgPath: "widget://res/img/apicloud.png",
              title: "标题",
              subTitle: "子标题，说明文字",
              remark: "备注",
              icon: ""
            },
            {
              uid: "1001",
              imgPath: "widget://res/img/apicloud.png",
              title: "标题",
              subTitle: "子标题，说明文字",
              remark: "备注",
              icon: ""
            },
            {
              uid: "1001",
              imgPath: "widget://res/img/apicloud.png",
              title: "标题",
              subTitle: "子标题，说明文字",
              remark: "备注",
              icon: ""
            },
            {
              uid: "1001",
              imgPath: "widget://res/img/apicloud.png",
              title: "标题",
              subTitle: "子标题，说明文字",
              remark: "备注",
              icon: ""
            },
            {
              uid: "1001",
              imgPath: "widget://res/img/apicloud.png",
              title: "标题",
              subTitle: "子标题，说明文字",
              remark: "备注",
              icon: ""
            },
            {
              uid: "1001",
              imgPath: "widget://res/img/apicloud.png",
              title: "标题",
              subTitle: "子标题，说明文字",
              remark: "备注",
              icon: ""
            },
            {
              imgPath: "widget://res/img/apicloud.png",
              title: "标题",
              subTitle: "子标题，说明文字",
              remark: "备注",
              icon: ""
            }
          ],
          rightBtns: [
            {
              bgColor: "#388e8e",
              activeBgColor: "",
              width: 70,
              title: "按钮",
              titleSize: 12,
              titleColor: "#fff",
              icon: "",
              iconWidth: 20
            }
          ],
          styles: {
            borderColor: "#EEE",
            item: {
              bgColor: "#FFFFF",
              activeBgColor: "#F5F5F5",
              height: 55.0,
              imgWidth: 40,
              imgHeight: 40,
              imgCorner: 4,
              placeholderImg: "",
              titleSize: 14.0,
              titleColor: "#333333",
              subTitleSize: 12.0,
              subTitleColor: "#999999",
              remarkColor: "#666",
              remarkSize: 14,
              remarkIconWidth: 30
            }
          },
          fixedOn: window.api.frameName
        },
        function(ret, err) {
          if (ret) {
            alert(JSON.stringify(ret));
          } else {
            alert(JSON.stringify(err));
          }
        }
      );
    },
    refresh(){
        var UIListView = api.require('UIListView');
        UIListView.setRefreshHeader({
            loadingImg: 'widget://res/UIListView_arrow.png',
            bgColor: '#F5F5F5',
            textColor: '#8E8E8E',
            textDown: '下拉可以刷新...',
            textUp: '松开开始刷新...',
            showTime: true
        }, function(ret, err) {
            if (ret) {
                alert(JSON.stringify(ret));
            } else {
                alert(JSON.stringify(err));
            }
        });
    }
  },
  mounted() {
    this.openlist();
    this.refresh();
    tools.addEventListener(
      {
        name: "resumeListCallback"
      },
      (ret, err) => {
        this.getList();
      }
    );
=======

    del (data) {
      alert(data.id + data.name);
    }
  },
  mounted () {
>>>>>>> 3238df7bfd0b6e85f5a7ad416a4b063a4250716a
    this.getList();
  }
};
</script>
<style lang="less">
<<<<<<< HEAD
.rowList {
=======
.rowList{
>>>>>>> 3238df7bfd0b6e85f5a7ad416a4b063a4250716a
  .mint-cell-wrapper {
    background-image: none;
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
  top: 18px;
  right: 15px;
  font-size: 16px;
}
.rowList {
  font-size: 16px;
  background-color: #fff;
  height: 56px;
  &:active {
    background-color: #eee;
  }
  .title {
    .ell();
    padding: 0 15px;
    line-height: 56px;
  }
}
.footer {
  height: 44px;
}
</style>
