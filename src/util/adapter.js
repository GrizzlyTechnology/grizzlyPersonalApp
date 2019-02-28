import isJson from 'is-json';
import moment from 'moment';
import dict from 'util/dictMap';

// import dictMap from 'util/dictMap';

const adapter = {};

// 基础信息的适配器
adapter.baseInfoAdapter = function (data) {
  // console.log(JSON.stringify(data));
  return {
    title: data.title, // 简历名称
    name: data.name, // true string 真实姓名
    sex: data.sex, // true string 性别
    birthday: data.birthday * 1000, // true string生日
    houseHold: isJson(data.household) ? JSON.parse(data.household) : [], // true string 籍贯
    address: isJson(data.address) ? JSON.parse(data.address) : [],
    street: data.street,
    phone: data.phone, // true string手机
    email: data.email // true string 邮箱
  };
};

// 期望工作适配器
adapter.expectedWorkAdapter = function (data) {
  // console.log(JSON.stringify(data));
  return {
    desiredPosition: data.desiredposition,
    expectedSalary: data.expectedsalary,
    expectedCity: data.expectedcity,
    workType: data.worktype,
    currentState: data.currentstate,
    timeToPost: data.timetopost
  };
};

adapter.educationAdapter = function (data) {
  // console.log(JSON.stringify(data));
  return {
    ...data,
    inSchoolTime: data.inschooltime * 1000,
    graduationTime: data.graduationtime * 1000,
    schoolName: data.schoolname,
    head: moment(data.inschooltime * 1000).format('YYYY年MM月') + ' - ' + moment(data.graduationtime * 1000).format('YYYY年MM月'),
    title: data.schoolname,
    info: data.education + ' / ' + data.major
  };
};

adapter.internshipAdapter = function (data) {
  return {
    ...data,
    startTime: data.starttime * 1000,
    endTime: data.endtime * 1000,
    companyName: data.companyname,
    jobContent: data.jobcontent,
    head: moment(data.starttime * 1000).format('YYYY年MM月') + ' - ' + moment(data.endtime * 1000).format('YYYY年MM月'),
    title: data.companyname + ' / ' + data.post,
    info: data.jobcontent ? data.jobcontent.replace(/\n|\r\n/g, '<br/>') : ''
  };
};

adapter.projectAdapter = function (data) {
  return {
    ...data,
    startTime: data.starttime * 1000,
    endTime: data.endtime * 1000,
    projectName: data.projectname,
    projectDesc: data.projectdesc,
    head: moment(data.starttime * 1000).format('YYYY年MM月') + ' - ' + moment(data.endtime * 1000).format('YYYY年MM月'),
    title: data.projectname + ' / ' + data.duty,
    info: data.projectdesc ? data.projectdesc.replace(/\n|\r\n/g, '<br/>') : ''
  };
};

adapter.jobAdapter = function (data) {
  return {
    ...data,
    startTime: data.starttime * 1000,
    endTime: data.endtime * 1000,
    companyName: data.companyname,
    jobContent: data.jobcontent,
    head: moment(data.starttime * 1000).format('YYYY年MM月') + ' - ' + moment(data.endtime * 1000).format('YYYY年MM月'),
    title: data.companyname + ' / ' + data.post,
    info: data.jobcontent ? data.jobcontent.replace(/\n|\r\n/g, '<br/>') : ''
  };
};

adapter.skillAdapter = function (data) {
  return {
    ...data,
    skillName: data.skillname,
    label: data.skillname,
    value: data.proficiency * 20
  };
};

adapter.honorAdapter = function (data) {
  data.reslist.forEach(r => {
    const urlAry = r.url.split('/');
    urlAry[urlAry.length - 1] = '450_' + urlAry[urlAry.length - 1];
    r.coverUrl = urlAry.join('/');
  });
  return {
    ...data,
    honorDate: data.honordate * 1000,
    honorDateText: moment(data.honordate * 1000).format('YYYY年MM月DD日')
    // desc: data.desc ? data.desc.replace(/\n|\r\n/g, '<br/>') : ''
  };
};

adapter.messageAdapter = function (data) {
  return {
    ...data,
    sendTimeText: moment(data.send_time * 1000).format(
      'YYYY年MM月DD日'
    )
  };
};

adapter.deliveryAdapter = function (data) {
  return {
    ...data,
    statusText: dict.deliveryStatus[data.status][1],
    statusLongText: dict.deliveryStatus[data.status][0],
    deliveryDateText: moment(data.deliveryDate * 1000).format(
      'YYYY年MM月DD日'
    )
  };
};
adapter.deliveryAdapterListRow = function (data) {
  return {
    ...data,
    statusLongText: dict.deliveryStatus[data.status][0],
    addtimeValue: data.addtime * 1000,
    info: moment(data.addtime * 1000).format(
      'YYYY年MM月DD日'
    )
  };
};

adapter.deliveryStatusColor = function (status) {
  let color;
  switch (status) {
    case 0:
      color = '#999';
      break;
    case 1:
      color = '#3db0eb';
      break;
    case 2:
      color = '#0D9CE6';
      break;
    case 3:
      color = '#f7ba2a';
      break;
    case 4:
      color = '#f7842a';
      break;
    case 5:
      color = '#27cd59';
      break;
    default:
      color = '#f75c5d';
  }
  return color;
};

adapter.releaseLogAdapter = function (data) {
  const content = data.reward.replace(/\n|\r\n/g, '');

  return {
    // head: moment(data.internshipStart).format('YYYY年MM月DD日') + ' 至 ' + moment(data.internshipEnd).format('YYYY年MM月DD日'),
    head: moment(data.internshipStart).format('YYYY年MM月DD日') + ' - ' + moment(data.internshipEnd).format('YYYY年MM月DD日') ,
    title: content.length > 50 ? content.substring(0, 47) + '...' : content,
    info: '实习日期：' + moment(data.selectTime * 1000).format('YYYY年MM月DD日'),
    workContentText: data.workContent.replace(/\n|\r\n/g, '<br/>'),
    rewardText: data.reward.replace(/\n|\r\n/g, '<br/>'),
    ...data
  };
};
// { "internshipStart": 1543190400000, "internshipEnd": 1543276800000, "workContent": "巴巴爸爸", "reward": "VB不不不", "createTime": 1543299620 }
export default adapter;
