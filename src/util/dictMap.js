const dict = {};

dict.female = 0;
dict.male = 1;

dict.sex = {
  [dict.male]: '男',
  [dict.female]: '女'
};

dict.skillLevel = ['了解', '熟悉', '掌握', '精通', '专家', '专家'];
dict.workType = ['全职', '兼职', '实习招聘（学生', '实习招聘(社会)'];
dict.currentState = ['积极找工作', '随便看看', '暂不换工作'];
dict.timeToPost = ['随时', '一周内', '二月内', '三月内', '待定'];

export default dict;
