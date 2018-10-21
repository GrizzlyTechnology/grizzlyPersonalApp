<template>
  <div>
    <List>
      <div v-for='protocol in protocols' :key="protocol.id" @click="agreementDetails">
        <ListItem>
          <ListItemTitle>
            {{protocol.companyName}}
          </ListItemTitle>
          <ListAction>
            {{protocol.department}}
          </ListAction>
          <ListAction>
           {{protocol.group}}
          </ListAction>
          <ListAction>
            已上传
          </ListAction>
        </ListItem>
        <Divider></Divider>
      </div>
    </List>
  </div>
</template>

<script>
import { Divider } from 'muse-ui';
import { List, ListItem, ListAction, ListItemTitle } from 'muse-ui/lib/List';
import tool from 'util/tools';
export default {
  data () {
    return {
      protocols: [
        {
          id: 1,
          companyName: '江苏大灰熊科技有限公司',
          department: '技术部',
          group: '前端组'
        },
        {
          id: 2,
          companyName: '江苏大灰熊科技有限公司1',
          department: '技术部',
          group: '前端组'
        },
        {
          id: 3,
          companyName: '江苏大灰熊科技有限公司2',
          department: '技术部',
          group: '前端组'
        }
      ]
    };
  },
  components: {
    List,
    ListItem,
    ListAction,
    ListItemTitle,
    Divider
  },
  methods: {
    agreementDetails () {
      tool.openWin({
        name: 'agreementDetails',
        url: '../win.html',
        title: '协议详情',
        fname: 'agreementDetails_f',
        furl: './application/agreementDetails.html',
        hasLeft: 1
      });
    }
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/base.less");
.mu-list li {
  background: #fff;
  padding: 10px 0;
}
.mu-item-action {
  margin-left: 10px;
}
</style>
