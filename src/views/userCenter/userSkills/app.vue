<template>
  <div class="content">
    <div class="bodyer">
      <div class="listCon">
        <CellSwipe class="rowList" v-for="(row,index) in list" value="oko" :key="row.id" :right="[{
            content: '删除',
            style: { background: '#e7585a', color: '#fff' },
            handler: () => {del(row,index)}
          }
        ]">
        <div @click="edit(row)">
          <SkillLine class="skill" :title="row.label" :value="row.value"/>
          <i class="mu-icon icon-right isLink" />
        </div>
        </CellSwipe>
      </div>
    </div>
    <div class="footer">
      <Button color="#009688" textColor="#ffffff" :style="{boxShadow: '0 0 0'}" :full-width="true" large @click="create">添加技能评价</Button>
    </div>
    <!-- <Popup v-model="isShow" position="bottom" pop-transition="popup-fade" :closeOnClickModal="false" class="myPopup">
      <div class="myPopupTopBar">
        <span class="cancel" @click="cancel">取消</span>
        <span class="ok" @click="confirm">保存</span>
      </div>
      <Form ref="form" class="form" :model="form">
        <FormItem label="技能名称" prop="label" :rules="labelRules">
          <TextField :readonly="isEdit" v-model="form.label"></TextField>
        </FormItem>
        <FormItem label="能力值" prop="major">
          <span class="level">{{level}}</span>
          <Slider class="skillLevel" v-model="form.value" :min="1" :step="1" color="#009688" thumb-color="#009688" track-color="#ebebeb" />
        </FormItem>

      </Form>
    </Popup> -->
  </div>
</template>

<script>
// import _ from 'lodash';
import { CellSwipe } from 'mint-ui';
import { Button } from 'muse-ui';
// import { Form, FormItem } from 'muse-ui/lib/Form';

import tools from 'util/tools';
import dictMap from 'util/dictMap';
import service from 'service';
import SkillLine from 'components/SkillLine';
import adapter from 'util/adapter';

// import AreaSelected from 'components/AreaSelected';
// const defaultForm = {
//   label: '',
//   value: 1
// };
export default {
  data () {
    return {
      id: window.api ? window.api.pageParam.id : null,
      list: []
      // msg: '',
      // isShow: false,
      // isEdit: false,
      // form: { ...defaultForm },
      // labelRules: [
      //   { validate: val => !!val, message: '必须填写技能名称' },
      //   {
      //     validate: val => {
      //       let b = true;
      //       if (this.isEdit === false) {
      //         this.list.forEach(r => {
      //           if (r.label === val) {
      //             b = false;
      //           }
      //         });
      //       }
      //       return b;
      //     },
      //     message: '技能名称已存在'
      //   }
      // ],
      // list: [{
      //   id: 0,
      //   uid: 0,
      //   skillname: '技能名1',
      //   proficiency: 1
      // }, {
      //   id: 1,
      //   uid: 0,
      //   skillname: '技能名2',
      //   proficiency: 2
      // }, {
      //   id: 2,
      //   uid: 0,
      //   skillname: '技能名3',
      //   proficiency: 3
      // }, {
      //   id: 3,
      //   uid: 0,
      //   skillname: '技能名4',
      //   proficiency: 4
      // }, {
      //   id: 4,
      //   uid: 0,
      //   skillname: '技能名5',
      //   proficiency: 5
      // }].map(r => adapter.skillAdapter(r))
    };
  },
  components: {
    Button,
    CellSwipe,
    SkillLine
    // Popup,
    // Form,
    // FormItem,
    // TextField
    // Slider
  },
  computed: {
    level () {
      return dictMap.skillLevel[parseInt((this.form.value === 0 ? 1 : this.form.value) / 20)];
    }
  },
  methods: {
    async getList () {
      tools.showProgress();
      const response = await service.getUserSkill({
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.list = response.result.skillsInfo ? response.result.skillsInfo.map(row =>
            adapter.skillAdapter(row)
          ) : [];
          break;
        default:
          tools.toast({
            position: 'top',
            message: '技能获取失败'
          });
          break;
      }
    },
    async updateSkills (skills) {
      tools.showProgress();
      const response = await service.updateUserBaesInfo({
        skills,
        resumeId: this.id
      });
      tools.hideProgress();
      switch (response.code) {
        case 0:
          this.getList();
          break;
        default:
          tools.toast({
            position: 'top',
            message: '技能删除失败'
          });
          break;
      }
    },
    del (data, index) {
      // tools.confirm({
      //   title: '确认',
      //   content: `删除 ${data.label} 技能？`,
      //   callback: () => {
      this.updateSkills(
        JSON.stringify(
          this.list.filter(r => {
            if (r.label !== data.label) {
              return r;
            }
          }).map(r => r.id).join(',')
        )
      );
      //   }
      // });
    },
    edit (data) {
      tools.openWin({
        name: 'userSkillForm',
        url: '../win.html',
        title: '编辑技能评估',
        fname: 'userSkillForm_f',
        furl: './userCenter/userSkillForm.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userSkillForm',
          id: data.id,
          skill: data,
          callback: (ret, err) => {
            this.getList();
          }
        }
      });
    },
    create () {
      tools.openWin({
        name: 'userSkillForm',
        url: '../win.html',
        title: '创建技能评估',
        fname: 'userSkillForm_f',
        furl: './userCenter/userSkillForm.html',
        hasLeft: 1,
        data: {
          nameSpace: 'userSkillForm',
          resumeId: this.id,
          callback: (ret, err) => {
            this.getList();
          }
        }
      });
    }
    // cancel () {
    //   this.isShow = false;
    //   this.curRow = -1;
    //   this.$refs.form.clear();
    // },
    // confirm () {
    //   this.$refs.form.validate().then(result => {
    //     if (result === true) {
    //       const list = [...this.list];
    //       if (this.isEdit === true) {
    //         list[this.curRow] = this.form;
    //       } else {
    //         list.push(this.form);
    //       }
    //       this.updateSkills(JSON.stringify(list));
    //     }
    //   });
    // }
  },
  mounted () {
    this.getList();
  }
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
  .mint-cell-swipe-button {
    line-height: 56px;
  }
}
.skillLevel {
  .mu-slider-fill,
  .mu-slider-track {
    height: 5px;
  }
  .mu-slider-thumb {
    top: 13px;
    width: 15px;
    height: 15px;
  }
  .mu-slider-display-value {
    font-size: 14px;
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
  top: 19px;
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
    margin-right: 35px;
  }
}
.footer {
  height: 44px;
}

.myPopup {
  width: 100%;
}
.cancel,
.ok {
  font-size: 18px;
  width: 50%;
  float: left;
  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
  color: #26a2ff;
  &:active {
    background-color: #eee;
  }
}
.ok {
  border-left: 1px #eee solid;
}
.myPopupTopBar {
  font-size: 0;
  overflow: hidden;
  border-bottom: 1px #eee solid;
}
.form {
  padding: 15px 15px 0;
  .level {
    position: absolute;
    left: 55px;
    top: 2px;
    color: #333;
    font-size: 16px;
  }
}
</style>
