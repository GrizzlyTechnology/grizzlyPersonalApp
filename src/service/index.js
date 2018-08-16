import axios from 'axios';
import { isMock } from './mock';

const ENV = process.env;
let BASEURL = '';

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

function fetch ({host = '', version = '', url, params, method = 'get'}) {
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
        params = { ...params, '_': tk };
        data = { params: params };
      } else {
        url += '?_=' + tk;
      }

      axios[method](host === '' ? url : `//${host}${url}`, data).then(
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

export default {
  demo (params) {
    return fetch({
      host: 'test.mangotmall.com',
      url: '/api/index/get_city',
      params,
      method: 'post'
    });
  }
};
