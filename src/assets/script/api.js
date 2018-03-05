/**
 * Created by codoon on 16/11/30.
 */
import axios from 'axios';
import qs from 'qs';
import store from '../../store/index';

import { Indicator } from 'mint-ui';

axios.defaults.baseURL = 'http://www.codoon.com/activity/v1/yuanben_city';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;


axios.interceptors.request.use(function (config) {
    // 请求前 干一些事情
    var method = config.method.toUpperCase();
    var isIntercept = false;
    if(method === 'GET'){
        isIntercept = config.params && config.params.isIntercept;
        config.params && delete config.params.isIntercept;
    }else {
        isIntercept = config.data && qs.parse(config.data).isIntercept;
    }
    if(isIntercept){
        Indicator.open({
            spinnerType: 'fading-circle'
        });
    }
    return config;
}, function (error) {
    // 发送请求出错
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // 请求成功后  你要搞一些事情
    Indicator.close();
    return response;
}, function (error) {
    // 请求出现错误
    if(typeof error === 'object'){
        error = error.toString();
    }
    store.dispatch('globalToast', error);
    Indicator.close();
    return Promise.reject(error);
});


function checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
        return response = response.data;
    }
    return {
        data: {
            code: -400,
            message: response.statusText || '服务起发生错误~'
        }
    }
}

// 把默认的两种请求方式封装
const post = (url, data) =>{
    return axios({
        method: 'post',
        url: url,
        data: qs.stringify(data),
        timeout: 3000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(checkStatus)
};

const get = (url, params) => {
    return axios({
        method: 'get',
        url: url,
        params,
        timeout: 3000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(checkStatus)
};


// API
const getUserInfo = (params) =>{
    return get('/user/info', Object.assign({}, {isIntercept: false}, params));
};

const cityRankList = (data) => {
    return post('/user/cityRankList', Object.assign({}, {isIntercept: false}, data));
};

export default{
    post,
    get,
    getUserInfo
}



