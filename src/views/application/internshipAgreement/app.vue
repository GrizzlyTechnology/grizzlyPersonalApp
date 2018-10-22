<template>
  <div class='content'>
    <List v-if="protocols.length > 0" class='bodyer'>
      <div v-for='protocol in protocols' :key="protocol.id">
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
        </ListItem>
        <Divider></Divider>
      </div>
    </List>
    <div v-else class='bodyer noList'>
        暂无记录
    </div>
     <div class='p16 fixBox'>
      <Button color="#009688" textColor="#ffffff" class='mt25' :full-width="true" :style="{boxShadow: '0 0 0'}" large @click='pushData'>上传协议</Button>
    </div>
  </div>
</template>

<script>
import { List, ListItem, ListAction, ListItemTitle } from "muse-ui/lib/List";
import { Divider ,Button} from "muse-ui";
// import tool from 'util/tools';
export default {
  data() {
    return {
      protocols: [
        {
          id: 1,
          companyName: "江苏大灰熊科技有限公司",
          department: "技术部",
          group: "前端组"
        },
         {
          id: 2,
          companyName: "江苏大灰熊科技有限公司",
          department: "技术部",
          group: "前端组"
        },
          {
          id: 3,
          companyName: "江苏大灰熊科技有限公司",
          department: "技术部",
          group: "前端组"
        }
      ]
    };
  },
  components: {
    List,
    ListItem,
    ListAction,
    ListItemTitle,
    Divider,
    Button
  },
  methods: {},
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
.mu-item-title {
  width: 80%;
}

.mu-item-action {
  margin-left: 3%;
}

.mu-list li {
  background: #fff;
  padding: 15px 0;
}

.fixBox {
  width: 100%;
  padding: 10px;
  border-top: 1px solid #eee;
  background: #fff;
}

.bodyer{
  flex: 1;
  overflow: auto;
  height: 100%;
}
</style>
