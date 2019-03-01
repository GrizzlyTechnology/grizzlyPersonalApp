const dict = {};

dict.female = 0;
dict.male = 1;
dict.sex = {
  [dict.male]: '男',
  [dict.female]: '女'
};

dict.deliveryInvitation = 0;// 待邀约
dict.deliveryInterview = 1;// 已邀约待面试
dict.refuseInterview = -1;// 拒绝面试
dict.agreeInterview = 2;// 同意面试待面试
dict.failInterview = -2;// 面试不通过
dict.interviewPass = 3;// 面试通过待离校
dict.personalRejection = -3;// 面试通过后个人拒绝
dict.deliveryLeaveSchool = 4;// 申请离校
dict.rejectionLeaveSchool = -4;// 学校拒绝离校
dict.deliveryEntry = 5;// 已离校待入职
dict.entry = 6;// 已入职
dict.resumeNotSuitable = -9; // 简历不符合要求

dict.deliveryNotSuitable = [dict.refuseInterview, dict.failInterview, dict.personalRejection, dict.rejectionLeaveSchool, dict.resumeNotSuitable]; // 不合适

// dict.deliveryNotSuitable = [dict.failInterview]; // 不合适

dict.deliveryStatus = {
  [dict.deliveryInvitation]: ['等待邀约', '待邀约'],
  [dict.deliveryInterview]: ['已邀约待面试', '待面试'],
  // [dict.refuseInterview]: ['拒绝面试', '拒绝面试'],
  // [dict.agreeInterview]: ['同意面试待面试', '同意面试'],
  [dict.failInterview]: ['面试不通过', '面试不通过'],
  [dict.interviewPass]: ['面试通过待入职', '面试通过'],
  // [dict.personalRejection]: ['面试通过后个人拒绝', '拒绝入职'],
  // [dict.deliveryLeaveSchool]: ['面试通过待离校', '申请离校'],
  // [dict.rejectionLeaveSchool]: ['学校拒绝离校', '拒绝离校'],
  // [dict.deliveryEntry]: ['已离校待入职', '待入职'],
  [dict.entry]: ['已入职', '已入职'],
  [dict.resumeNotSuitable]: ['简历不符合要求', '不符合']
};

dict.deliveryTab = {
  [dict.deliveryInvitation]: dict.deliveryStatus[dict.deliveryInvitation][1],
  // [dict.deliveryInterview]: dict.deliveryStatus[dict.deliveryInterview][1],
  // [dict.deliveryLeaveSchool]: dict.deliveryStatus[dict.deliveryLeaveSchool][1],
  [dict.deliveryNotSuitable]: '不合适',
  [dict.entry]: '已入职'
};

dict.skillLevel = ['了解', '熟悉', '掌握', '精通', '专家'];
dict.workType = ['全职', '兼职', '实习招聘(学生)', '实习招聘(社会)'];
dict.currentState = ['积极找工作', '随便看看', '暂不换工作'];
dict.timeToPost = ['随时', '一周内', '二月内', '三月内', '待定'];
dict.expectedSalary = ['0-2000元/月', '2000-5000元/月', '5000-10000元/月', '10000-15000元/月', '15000-20000元/月', '面议'];
dict.education = ['小学', '初中中专', '初中', '高中中专', '高中', '大专', '本科', '研究生', '博士生'];

export default dict;
