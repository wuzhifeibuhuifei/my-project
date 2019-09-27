function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}

//-------------------------------- 提示框
function toastFail(msg) {
    wx.showToast({
        title: msg, //提示的内容,
        icon: "none", //图标,
        duration: 1500, //延迟时间,
        mask: true //显示透明蒙层，防止触摸穿透,
    });
}

function toastOk(msg) {
    wx.showToast({
        title: msg, //提示的内容,
        icon: "success", //图标,
        duration: 1500, //延迟时间,
        mask: true //显示透明蒙层，防止触摸穿透,
    });
}

const host = 'https://www.bipin.store';
// const host = 'http://127.0.0.1:8080';

//请求封装
function request(url, method, data, header = {}) {
    wx.showLoading({
        title: '加载中' //数据请求前loading
    })
    return new Promise((resolve, reject) => {
        wx.request({
            url: host + url, //仅为示例，并非真实的接口地址
            method: method,
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
                wx.hideLoading();
                resolve(res.data);
            },
            fail: function (error) {
                wx.hideLoading();
                reject(false)
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    })
}

function requestNoLoading(url, method, data, header = {}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: host + url, //仅为示例，并非真实的接口地址
            method: method,
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
                resolve(res.data);
            },
            fail: function (error) {
                reject(false)
            },
            complete: function () {
            }
        })
    })
}

// get请求
function get(url, data) {
    return request(url, 'GET', data)
}

// get请求没有load遮罩层
function getNoLoading(url, data) {
    return requestNoLoading(url, 'GET', data)
}

// post请求
function post(url, data) {
    return request(url, 'POST', data)
}

// post请求没有load遮罩层
function postNoLoading(url, data) {
    return requestNoLoading(url, 'POST', data)
}

//-------------------------------------------------------------------------请求的封装


//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------

// 跳转到登录页面
function toLogin() {
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
        wx.navigateTo({
            url: "/pages/login/index"
        });
    } else {
        return true;
    }
}

// 登录
function login() {
    const openId = wx.getStorageSync("openid");
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo && openId) {
        return userInfo;
    }
}

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------

// 获取缓存中的OPENID
function getStorageOpenid() {
    const openId = wx.getStorageSync("openid");
    if (openId) {
        return openId;
    } else {
        getOpenid();
        return wx.getStorageSync("openid");
    }
}

// 获取OPENID
function getOpenid() {
    wx.login({
        success: res => {
            if (res.code) {
                //发起网络请求
                wx.request({
                    url: host + '/index/toLogin',
                    data: {
                        "code": res.code
                    },
                    success: function (data) {
                        if (data.data.state == 'ok') {
                            var result = data.data.result;
                            var openid = result.openid;
                            wx.setStorageSync("openid", openid);
                            if (wx.getStorageSync('userInfo')) {
                                const userInfo = wx.getStorageSync('userInfo');
                                userInfo.openId = wx.getStorageSync('openid');
                            }
                        }

                    }
                })
            } else {
                console.log('登录失败！' + res.errMsg)
            }

        },
        fail: () => {
        },
        complete: () => {
        }
    });
}

/**
 * 跳转到index页面，并保留之前的页面
 * @param index
 */
function toPage(index) {
    uni.navigateTo({
        url: index,
        animationType: 'pop-in',
        animationDuration: 200
    });
}

module.exports = {
    baseUrl: "../",
    formatNumber,
    formatTime,
    toastFail,
    toastOk,
    get,
    post,
    getNoLoading,
    toLogin,
    getStorageOpenid,
    getOpenid,
    toPage,
    login
}
