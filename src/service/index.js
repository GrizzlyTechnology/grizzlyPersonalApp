import axios from 'axios';
import { isMock } from './mock';
import tools from 'util/tools';

const ENV = process.env;
let BASEURL = '';

// const TOKEN = tools.getStorage('token');
switch (ENV) {
    case 'development':
        BASEURL = 'test.mangotmall.com';
        break;
    default:
        BASEURL = '';
        break;
}
axios.defaults.baseURL = BASEURL;
axios.defaults.timeout = 20000;
axios.interceptors.request.use((config) => {
  // Do something with request
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers['MG_code'] = '5uwPulFblsIANI7BIP#a%bBo582#wOud3v%f0c1JgJRskqUTN7y4&TPUTgjkmhOjZI#oVc4Ph4Ar^ApQFy$ZlGl3T9MaIskgGWTVjqHxsP^8S^%gY#nAj9X4DV9x&b7O';
  config.headers['MG_key'] = '5b10fed636fcf';
  // if (TOKEN) {
  config.headers['MG_token'] = tools.getStorage('token') || '';
  // }
  return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Do something with response
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

function delEmptyAttr (arg) {
  let rObj = {};
  if (Array.isArray(arg) && arg.length === 0) {
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

function request({ host = '', version = '', url, params, method = 'get' }) {
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

            axios[method](host === '' ? url : `http://${host}${url}`, data).then(
                response => {
                    // TODO 这里做数据的验证
                    resolve(response.data);
                }).catch(
                    (error) => {
                        reject(error);
                    });
        });
    }
}
const apihost = "test.mangotmall.com";
export default {
  demo (params) {
    return request({
      host: 'test.mangotmall.com',
      url: '/api/index/ceshi.html',
      params,
      method: 'post'
    });
  },
  login(params) {
    return request({
        host: apihost,
        url: '/api/Userinfo/login.html',
        params,
        method: 'post'
    });
},
  registered (params) {
    return request({
      host: 'test.mangotmall.com',
      url: '/api/index/ceshi.html',
      params,
      method: 'post'
    });
  },
  getVerificationCode () {
    return request({
      host: 'test.mangotmall.com',
      url: '/api/index/ceshi.html'
    });
  }
};
