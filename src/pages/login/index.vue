<template>
  <div class="login">
    <div class="logo">
      <p>我的小店</p>
    </div>
    <button class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">微信登录</button>
  </div>
</template>

<script>
  import {
    post,
    host,
    getOpenid,
    getStorageOpenid
  } from "../../utils/index";
  var qcloud = require("wafer2-client-sdk/index.js");
  export default {
    created() {},
    mounted() {
      console.log(host);

      qcloud.setLoginUrl(host + "/login");
    },
    data() {
      return {};
    },
    components: {},
    methods: {
      doLogin(info) {
        const userInfo = info.target.userInfo;
        userInfo.openId = getStorageOpenid();
        wx.setStorageSync("userInfo", userInfo);
        // 保存登陆信息
        post('/index/login', {
            "name": userInfo.nickName,
            "openId": getStorageOpenid(),
            "avatar": userInfo.avatarUrl
        }).then(function(res) {
            if (res.state == 'ok') {
                wx.navigateBack({});
            } else {
                console.log(res.msg);
            }
        })
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
