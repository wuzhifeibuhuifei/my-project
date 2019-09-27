<template>
  <div class="my">
    <div class="myinfo">
      <img @click="toLogin" :src="avator" alt="">
      <div @click="toLogin">
        <p>{{userInfo.nickName}}</p>
        <div v-if="userInfo.nickName == null">
          <p>未登录</p>
          <p>点击登陆账号</p>
        </div>
      </div>
    </div>
    <div class="iconlist">
      <div @click="goTo(item.url)" v-for="(item, index) in listData" :key="index">
        <span class="iconfont" :class="item.icon"></span>
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    toLogin,
    login
  } from "../../utils";
  export default {
    onShow() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      if (login()) {
        this.userInfo = login();
        this.avator = this.userInfo.avatarUrl;
      }
    },
    created() {},
    mounted() {},
    data() {
      return {
        avator: "/static/images/avator.png",
        allcheck: false,
        listData: [],
        Listids: [],
        userInfo: {},
        listData: [
//      	{
//          title: "我的订单",
//          icon: "icon-unie64a",
//          url: "/pages/orderManager/main"
//        },
          // {
          //   title: "优惠券",
          //   icon: "icon-youhuiquan",
          //   url: "/pages/coupon/main"
          // },
          {
            title: "我的足迹",
            icon: "icon-zuji",
            url: "/pages/foothistory/index"
          },
          {
            title: "我的收藏",
            icon: "icon-shoucang",
            url: "/pages/collectlist/index"
          },
//        {
//          title: "地址管理",
//          icon: "icon-dizhiguanli",
//          url: "/pages/address/main"
//        },
          // {
          //   title: "联系客服",
          //   icon: "icon-lianxikefu",
          //   url: ""
          // },
          // {
          //   title: "帮助中心",
          //   icon: "icon-bangzhuzhongxin",
          //   url: ""
          // },
          {
            title: "意见反馈",
            icon: "icon-yijianfankui",
            url: "/pages/feedback/index"
          },
//        {
//          title: "测试页面",
//          icon: "icon-yijianfankui",
//          url: "/pages/tabTest/main"
//        }
        ]
      };
    },
    components: {},
    methods: {
      goTo(url) {
        if (!this.userInfo.avatarUrl) {
          url = "/pages/login/index";
        }
        wx.navigateTo({
            url: url
        });
      },
      toLogin() {
        if (!this.userInfo.avatarUrl) {
          wx.navigateTo({
            url: "/pages/login/index"
          });
        }
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
