import pathToRegexp from 'path-to-regexp';
import mockjs from 'mockjs';
// import regexps from 'util/regexps';

const body = {
  code: 0, // 状态码
  message: '成功', // 消息 字符串 可以为空
  result: {// 返回结果 result 必须为对象
  }
};

export const hostList = {
  default: '',
  test: 'test.mangotmall.com'
};

// const serviceProvider = {
//   id: '@INTEGER()',
//   provinceId: '@INTEGER()',
//   customerServicePhone: regexps.phone,
//   status: '@PICK([0, 1])',
//   name: 'mock@CTITLE(10,16)',
//   province: '@province',
//   createTime: '@DATE("T")',
//   editTime: '@DATE("T")'
// };

const mockRouterMap = {
  [hostList.test]: [{
    // isMock: true, // 对应url的数据mock的开关
    method: 'POST',
    router: '/api/index/get_city',
    result (params) {
      return {
        ...body,
        result: {
          demo: params.demo
        }
      };
    }
  }]
};

export const isMock = ({ url, method, params = {}, host = '', version = '' }) => {
  let hasMock = {
    isMock: false
  };
  if (mockRouterMap[host] !== undefined) {
    mockRouterMap[host].forEach(routerObject => {
      if (routerObject.method.toUpperCase() === method.toUpperCase() && routerObject.isMock === true) {
        const path = version !== '' ? `/${version}url` : url;
        if (pathToRegexp(routerObject.router).exec(path) !== null) {
          hasMock = {...routerObject};
          hasMock.mock = mockjs.mock(routerObject.result(params));
        }
      }
    });
  }
  return hasMock;
};
