import isJson from 'is-json';
import moment from 'moment';

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
    starTime: data.startime * 1000,
    endTime: data.endtime * 1000,
    companyName: data.companyname,
    jobContent: data.jobcontent,
    head: moment(data.startime * 1000).format('YYYY年MM月') + ' - ' + moment(data.endtime * 1000).format('YYYY年MM月'),
    title: data.companyname + ' / ' + data.post,
    info: data.jobcontent.replace(/\n|\r\n/g, '<br/>')
  };
};
export default adapter;
