<template>
  <Container>
    <div class="border">
      <div v-if='companys.length>0'>
        <div v-for='company in companys'>
          <Card @click='Internship(company.id,company.companyName,company.department,company.group)'>
            <Avatar>
              <img :src="company.logo">
            </Avatar>
            <CardHeader
              :title="company.companyName"
              :sub-title="company.group + '  ' +company.practiceTime"
            >

              <div>
                <span class='status'>{{company.practicesStatus}}</span>
                <Icon
                  class='iconfont icon-jinru'
                  right
                  size="12"
                  value=":mudocs-icon-communication-voicemail"
                ></Icon>
              </div>

            </CardHeader>

          </Card>
          <!-- <Card>
          <Avatar
            :slot="avatar"
            :style="{width:'70px',height:'60px'}"
          >
            <img :src="company.logo">
          </Avatar>
          <CardHeader
            :title="company.companyName"
            :sub-title="company.department + '  ' +company.group"
          >

          </CardHeader>
          <p>{{company.practiceTime}}</p>
        </Card> -->
          <!-- <span class='status'>{{company.practicesStatus}}</span>
        <Icon
          class='iconfont icon-jinru'
          right
          size="12"
          value=":mudocs-icon-communication-voicemail"
        ></Icon> -->
        </div>
      </div>
      <div
        v-else
        class='notJoined'
      >你还未加入企业实习，立即去 <Button
          color="#009688"
          @click="hotJobListAll"
        >投递职位</Button>
        <br>
        <br>
        <div
          @click="refresh"
          class='refreshBtn'
        >
          点击刷新
        </div>
      </div>

    </div>

    <!-- <Stepper
      :active-step="0"
      orientation="vertical"
      :linear="false"
      v-if='companys.length>0'
    >
      <template v-for='company in companys'>
        <Step
          :key='company.id'
          @click='Internship(company.id,company.companyName,company.department,company.group)'
        >
          <StepLabel class='comStepper'>

            <Card>
              <Avatar
                :slot="avatar"
                :style="{width:'70px',height:'60px'}"
              >
                <img :src="company.logo">
              </Avatar>
              <CardHeader
                :title="company.companyName"
                :sub-title="company.department + '  ' +company.group"
              >

              </CardHeader>
              <p>{{company.practiceTime}}</p>
            </Card>
            <span class='status'>{{company.practicesStatus}}</span>
            <Icon
              class='iconfont icon-jinru'
              right
              size="12"
              value=":mudocs-icon-communication-voicemail"
            ></Icon>
          </StepLabel>
        </Step>
      </template>
    </Stepper> -->

  </Container>
</template>
<script>
import { Card, Icon, Button, Avatar } from "muse-ui";
import { CardHeader } from "muse-ui/lib/Card";
import { Stepper, Step, StepLabel } from "muse-ui/lib/Stepper";
import { Container } from "muse-ui/lib/Grid";
import tool from "util/tools";
import service from "service";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      companys: [
        // {
        //   id: 3,
        //   practiceTime: "2019.02—至今",
        //   companyName: "百度",
        //   logo:
        //     "http://www.mangotmall.com/uploads/enterpriselogo/20181221/3bb2b6bac50e9a263e049ac42a0b5d5f.jpg",
        //   department: "实习部门",
        //   group: "实习店长",
        //   practicesStatus: "实习中"
        // }
      ]
    };
  },
  components: {
    Container,
    Card,
    CardHeader,
    Stepper,
    Step,
    StepLabel,
    Icon,
    Button,
    Avatar
  },
  methods: {
    // 列表数据
    async listsData() {
      const response = await service.internshipCompany({});
      switch (response.code) {
        case 0:
          this.companys = response.result.lists;
          console.log(JSON.stringify(this.companys));
          break;
        default:
          Toast({
            position: "top",
            message: "加载失败，请稍后重试！！"
          });
          break;
      }
    },
    Internship(id, companyName, department, group) {
      tool.openWin({
        name: "Internship_" + id,
        url: "../win.html",
        title: "校外实习",
        fname: "Internship_f_" + id,
        furl: "./application/Internship.html",
        hasLeft: 1,
        data: {
          companyId: id,
          companyName: companyName,
          department: department,
          group: group
        }
      });
    },
    hotJobListAll() {
      tool.openWin({
        name: "jobSearchList",
        url: "../win.html",
        title: "热门职位",
        fname: "jobSearchList_f",
        furl: "./hr/jobSearchList.html",
        hasLeft: 1,
        hasRight: 0,
        data: {
          istj: 1 // 1是推荐 0是不推荐
        }
      });
    },
    refresh() {
      this.listsData();
    }
  },
  mounted() {
    this.listsData();
  }
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.mu-card {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.mu-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}

.mu-card-header-title {
  padding-right: 5px;
}

.mu-avatar {
  margin: 0 0 0 15px;
}

.mu-avatar img {
  border-radius: 8px;
  border: 1px solid #efefef;
}

.notJoined {
  padding: 50px 20px 30px;
}

.status,
.refreshBtn {
  color: #009688;
}
</style>
