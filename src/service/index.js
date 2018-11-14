import axios from 'axios';
import { isMock, hostList } from './mock';
import tools from 'util/tools';

const ENV = process.env;
let BASEURL = '';

// const TOKEN = tools.getStorage('token');
switch (ENV) {
  case 'development':
    BASEURL = hostList.test;
    break;
  default:
    BASEURL = hostList.test;
    break;
}

axios.defaults.baseURL = BASEURL;
axios.defaults.timeout = 30000;
// axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  // Do something with request
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers['MG_code'] = '5uwPulFblsIANI7BIP#a%bBo582#wOud3v%f0c1JgJRskqUTN7y4&TPUTgjkmhOjZI#oVc4Ph4Ar^ApQFy$ZlGl3T9MaIskgGWTVjqHxsP^8S^%gY#nAj9X4DV9x&b7O';
  config.headers['MG_key'] = '5b10fed636fcf';
  config.headers['MG_token'] = ENV !== 'production' ? '6f8bade35ef87e5a6aa623519ef973582dc25205' : tools.getStorage('token') || '';
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Do something with response
  return response;
}, function (error) {
  tools.toast({
    position: 'top',
    message: '网络错误，请稍后重试！！'
  });
  tools.hideProgress();
  return Promise.reject(error);
});

function delEmptyAttr (arg) {
  let rObj = {};
  if (arg && typeof arg === 'object' && !Array.isArray(arg)) {
    const params = Object.assign({}, arg);
    Object.keys(arg).forEach((key) => {
      if (
        arg[key] === '' ||
              arg[key] === null ||
              arg[key] === undefined ||
              (Array.isArray(arg[key]) && arg[key].length === 0) ||
              (typeof arg[key] === 'object' && arg[key].length === undefined)
      ) {
        delete params[key];
      }
    });
    rObj = params;
  }

  return rObj;
}

function request ({ host = '', version = '', url, params, method = 'post' }) {
  const mock = isMock({ host, version, url, params, method });
  if (ENV !== 'production' && mock.isMock === true) {
    return new Promise((resolve) => {
      resolve(mock.mock);
    });
  } else {
    const tk = new Date().getTime();
    return new Promise((resolve, reject) => {
      let data = params;
      if (method === 'get') {
        data = { params: { ...delEmptyAttr(params), '_': tk } };
      } else {
        url += '?_=' + tk;
      }
      // console.log(url);
      axios[method](host === '' ? url : `http://${host}${url}`, data).then(
        response => {
          // TODO 这里做数据的验证
          resolve(response.data);
        }).catch(
        (error) => {
          return Promise.reject(error);
        });
    });
  }
}
export default {
  demo (params) {
    return request({
      host: BASEURL,
      url: '/api/index/ceshi',
      params,
      method: 'post'
    });
  },
  login (params) {
    return request({
      host: BASEURL,
      url: '/api/User/login',
      params
    });
  },
  otherlogin (params) {
    return request({
      host: BASEURL,
      url: '/api/User/otherLogin',
      params
    });
  },
  logout () {
    return request({
      host: BASEURL,
      url: '/api/User/logout'
    });
  },
  getUserInfo () {
    return request({
      host: BASEURL,
      url: '/api/User/getUserByToken',
      method: 'get'
    });
  },
  registered (params) {
    return request({
      host: BASEURL,
      url: '/api/User/create',
      params
    });
  },
  getVerificationCode (params) {
    return request({
      host: BASEURL,
      url: '/api/sms/send_code',
      params
    });
  },
  checkStudent (params) {
    return request({
      host: BASEURL,
      url: '/api/student',
      params,
      method: 'get'
    });
  },
  createStudent (params) {
    return request({
      host: BASEURL,
      url: '/api/Student/create',
      params
    });
  },
  getStudentInfo (params) {
    return request({
      host: BASEURL,
      url: '/api/Student/info',
      params,
      method: 'get'
    });
  },
  getAreaByAreaId (areaId = '') {
    return request({
      host: BASEURL,
      url: '/api/Area',
      params: {
        areaId
      },
      method: 'get'
    });
  },
  getSchoolList (params) {
    return request({
      host: BASEURL,
      url: '/api/School/getSchoolBy',
      params,
      method: 'get'
    });
  },
  getSessionList (params) {
    return request({
      host: BASEURL,
      url: '/api/School/getYear',
      params,
      method: 'get'
    });
  },
  getDepartmentList (params) {
    return request({
      host: BASEURL,
      url: '/api/College/collegeBySchoolAndYear',
      params,
      method: 'get'
    });
  },
  getDisciplineList (params) {
    return request({
      host: BASEURL,
      url: '/api/Major/majorBy',
      params,
      method: 'get'
    });
  },
  getClassListBy (params) {
    return request({
      host: BASEURL,
      url: '/api/Classes/classBy',
      params,
      method: 'get'
    });
  },
  addToCollection (params) {
    return request({
      host: BASEURL,
      url: '/api/Collection',
      params,
      method: 'get'
    });
  },
  postJob (params) {
    return request({
      host: BASEURL,
      url: '/api/postJob',
      params,
      method: 'get'
    });
  },
  createUserBaesInfo (params) {
    return request({
      host: BASEURL,
      url: '/api/Resume/create',
      params
    });
  },
  deleteUserBaesInfo (params) {
    return request({
      host: BASEURL,
      url: '/api/Resume/update',
      params
    });
  },
  updateUserBaesInfo (params) {
    return request({
      host: BASEURL,
      url: '/api/Resume/update',
      params
    });
  },
  getUserBaseInfo (params) {
    return request({
      host: BASEURL,
      url: '/api/Resume/resumeBy',
      params,
      method: 'get'
    });
  },
  // 职位搜索
  searchBoxValue (params) {
    return request({
      host: BASEURL,
      url: '/api/job/search',
      params,
      method: 'get'
    });
  },

  // 职位搜索页面--猜你要搜
  searchChipValue (params) {
    return request({
      host: BASEURL,
      url: '/api/Hr/searchChipValue',
      params,
      method: 'get'
    });
  },
  createUserEducation (params) {
    return request({
      host: BASEURL,
      url: '/api/Educationexp/create',
      params
    });
  },
  updateUserEducation (params) {
    return request({
      host: BASEURL,
      url: '/api/Educationexp/update',
      params
    });
  },
  getUserEducation (params) {
    return request({
      host: BASEURL,
      url: '/api/Educationexp/educationexpBy',
      params,
      method: 'get'
    });
  },
  createUserInternship (params) {
    return request({
      host: BASEURL,
      url: '/api/Internshipexp/create',
      params
    });
  },
  updateUserInternship (params) {
    return request({
      host: BASEURL,
      url: '/api/Internshipexp/update',
      params
    });
  },
  getUserInternship (params) {
    return request({
      host: BASEURL,
      url: '/api/Internshipexp/internshipexpBy',
      params,
      method: 'get'
    });
  },
  createUserProject (params) {
    return request({
      host: BASEURL,
      url: '/api/Projectexp/create',
      params
    });
  },
  updateUserProject (params) {
    return request({
      host: BASEURL,
      url: '/api/Projectexp/update',
      params
    });
  },
  getUserProject (params) {
    return request({
      host: BASEURL,
      url: '/api/Projectexp/projectexpBy',
      params,
      method: 'get'
    });
  },
  createUserJob (params) {
    return request({
      host: BASEURL,
      url: '/api/Jobexp/create',
      params
    });
  },
  updateUserJob (params) {
    return request({
      host: BASEURL,
      url: '/api/Jobexp/update',
      params
    });
  },
  getUserJob (params) {
    return request({
      host: BASEURL,
      url: '/api/Jobexp/jobexpBy',
      params,
      method: 'get'
    });
  },
  createUserSkill (params) {
    return request({
      host: BASEURL,
      url: '/api/Skills/create',
      params
    });
  },
  updateUserSkill (params) {
    return request({
      host: BASEURL,
      url: '/api/Skills/update',
      params
    });
  },
  getUserSkill (params) {
    return request({
      host: BASEURL,
      url: '/api/Skills/skillsBy',
      params,
      method: 'get'
    });
  },
  createUserOpus (params) {
    return request({
      host: BASEURL,
      url: '/api/Opus/create',
      params
    });
  },
  updateUserOpus (params) {
    return request({
      host: BASEURL,
      url: '/api/Opus/update',
      params
    });
  },
  getUserOpus (params) {
    return request({
      host: BASEURL,
      url: '/api/Opus/opusBy',
      params,
      method: 'get'
    });
  },

  createUserHonor (params) {
    return request({
      host: BASEURL,
      url: '/api/Honor/create',
      params
    });
  },

  updateUserHonor (params) {
    return request({
      host: BASEURL,
      url: '/api/Honor/update',
      params
    });
  },

  getUserHonor (params) {
    return request({
      host: BASEURL,
      url: '/api/Honor/honorBy',
      params,
      method: 'get'
    });
  },

  // 搜索职位或者公司
  getAllPosition (params) {
    return request({
      host: BASEURL,
      url: '/api/job/fuzzysearchtitle',
      params,
      method: 'get'
    });
  },
  // 职位详情
  getDetailsData (params) {
    return request({
      host: BASEURL,
      url: '/api/job/info',
      params,
      method: 'get'
    });
  },
  // 投递简历
  pushDelivery (params) {
    return request({
      host: BASEURL,
      url: '/api/Job/deliveryreresume',
      params
    });
  },
  // 获取公司信息
  getCompanyInfo (params) {
    return request({
      host: BASEURL,
      url: '/api/Enterprise/info',
      params,
      method: 'get'
    });
  },
  // 获取企业所有招聘
  getCompanyJob (params) {
    return request({
      host: BASEURL,
      url: '/api/Job/seljobsbyenterpriseid',
      params,
      method: 'get'
    });
  },
  // 获取职场攻略
  getrRaidersList (params) {
    return request({
      host: BASEURL,
      url: '/api/Content/lists',
      params,
      method: 'get'
    });
  },
  // 获取职场攻略内容
  getRaidersArticleData (params) {
    return request({
      host: BASEURL,
      url: '/api/Content/info',
      params,
      method: 'get'
    });
  },
  // 名企推荐列表
  companyRecommendList (params) {
    return request({
      host: BASEURL,
      url: '/api/Enterprise/searchenteprie',
      params,
      method: 'get'
    });
  },
  // 实习企业列表
  internshipCompany (params) {
    return request({
      host: BASEURL,
      url: '/api/Internship/interviewoks',
      params,
      method: 'get'
    });
  },
  // 首页滚动图
  carouselImgs (params) {
    return request({
      host: BASEURL,
      url: '/api/Content/slides',
      params,
      method: 'get'
    });
  },
  // 首页热门职位
  hotJobsData (params) {
    return request({
      host: BASEURL,
      url: '/api/Job/recommendjobs',
      params,
      method: 'get'
    });
  },
  // 首页获取适合你的职位
  suitablePosition (params) {
    return request({
      host: BASEURL,
      url: '/api/Resume/create',
      params,
      method: 'get'
    });
  },
  // 获取广告地址
  getAdv (params) {
    return request({
      host: BASEURL,
      url: '/api/Content/seladvs',
      params,
      method: 'get'
    });
  },
  userSetting (params) {
    console.log(JSON.stringify(params));
    return request({
      host: BASEURL,
      url: '/api/User/update',
      params
    });
  },
  getEmailVerificationCode (params) {
    return request({
      host: BASEURL,
      url: '/api/Email/send_code',
      params
    });
  },
  getMessageList (params) {
    return request({
      host: BASEURL,
      url: '/api/Message/lists',
      params: {
        pageSize: 10,
        page: 1,
        ...params
      },
      method: 'get'
    });
  },
  messageDoRead (id) {
    return request({
      host: BASEURL,
      url: '/api/message/orderBy',
      params: {
        id
      },
      method: 'get'
    });
  },
  getDeliveryList (params) {
    return request({
      host: BASEURL,
      url: '/api/Job/deliveredresume',
      params: {
        pageSize: 10,
        page: 1,
        ...params
      },
      method: 'get'
    });
  }

};
