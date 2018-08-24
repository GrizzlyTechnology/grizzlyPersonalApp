// 公共函数
export const fixIos7Bar = function (t) {
  var e = window.api.systemType;
  if (e === 'ios') {
    var a = window.api.systemVersion;
    var n = parseInt(a, 10);
    var i = window.api.fullScreen;
    var o = window.api.iOS7StatusBarAppearance;
    n >= 7 && !i && o && (t.style.paddingTop = '1rem', t.style.height = '3.2rem');
  }
};
export const dom = function(el, selector){
    if(arguments.length === 1 && typeof arguments[0] == 'string'){
        if(document.querySelector){
            return document.querySelector(arguments[0]);
        }
    }else if(arguments.length === 2){
        if(el.querySelector){
            return el.querySelector(selector);
        }
    }
};
export const fixStatusBar = function (t) {
  var e = window.api.systemType;
  if (e === 'ios') fixIos7Bar(t);
  else if (e === 'android') {
    var a = window.api.systemVersion;
    a = parseFloat(a), a >= 4.4 && (t.style.paddingTop = '1.36rem', t.style.height = '3.56rem', t.style.lineHeight = '2.2rem');
  }
};

export const fixContent = function (t) {
  var e = window.api.systemType;
  if (e === 'ios') t.style.top = '3.2rem';
  else if (e === 'android') {
    var a = window.api.systemVersion;
    a = parseFloat(a), a >= 4.4 && (t.style.top = '3.56rem');
  }
};

export const getHeight = function (id) {
  return document.getElementById(id).offsetHeight;
};

export const showLoading = function (state) {
  if (state === 'on') {
    window.api.showProgress({
      style: 'default',
      animationType: 'fade',
      title: '',
      text: '稍等一下哦…',
      modal: true
    });
  } else {
    window.api.hideProgress();
  }
};
