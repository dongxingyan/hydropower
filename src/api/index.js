import axios from 'axios';
const apiHost =
    process.env.NODE_ENV === 'development'
        ? '/app'
        : location.protocol + '//baidu.com';

/**
 * api方法声明。
 * type：Get, Post
 * url: 请求的url
 */
const apiUrl = {
    isLogin: {
        // 判断是否登录
        type: 'post',
        url: apiHost + '/'
    }

};

let apis = {};
let CancelToken = axios.CancelToken;
apis.isCancel = axios.isCancel; // 判断是否是取消
Object.keys(apiUrl).forEach(item => {
    /**
     * 创建api请求function，返回promise对象
     */
    apis[item] = function apiFunc(data, url = '') {
        let obj = apiUrl[item];
        let promise;
        let dataTmp = data;
        if (url) {
            url = apiHost + url;
        }
        promise = axios({
            method: obj.type,
            url: url || obj.url,
            timeout: 20000,
            data: obj.type === 'get' ? {} : dataTmp,
            params: obj.type === 'get' ? dataTmp : {},
            withCredentials:
                process.env.NODE_ENV === 'development'
                    ? false
                    : process.env.test !== 'true',
            cancelToken: new CancelToken(function executor(c) {
                apis[item + 'Cancel'] = c;
            }),
            headers: !obj.isFy && {'x-version': VERSION} // 自定义请求头
        }).then(response => {
            let data = response.data;
            return data;
        });
        return promise;
    };
});

export default apis;
