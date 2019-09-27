<template>
  <div class="collection">
    <div class="title">
      <span>我的足迹</span>
      <img @click="clearFoot()" :src="'../../static/images/delete.png'">
    </div>
    <div class="time" v-for="(item, index) in collectlist" :key="index">
      <p>{{item.time}}</p>
      <div class="sublist">
        <div
          @click="goodsDetail(subitem.goodsId)"
          v-for="(subitem, subindex) in item.data"
          :key="subindex"
        >
          <img :src="subitem.listImgUrl" alt>
          <p>{{subitem.name}}</p>
          <p>￥{{subitem.price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, toLogin, getStorageOpenid, baseUrl } from "../../utils";
export default {
  onShow() {
    toLogin();
    this.openId = getStorageOpenid();
  },
  created() {},
  mounted() {
    this.getlist();
  },
  data() {
    return {
      openId: "",
      collectlist: []
    };
  },
  components: {},
  methods: {
    async clearFoot() {
      var _this = this;
      if (toLogin()) {
        wx.showModal({
          title: "",
          content: "是否要删除所有足迹",
          success: function(res) {
            if (res.confirm) {
              console.log("111" + res);
              get("/business/clearFoot", {
                openId: getStorageOpenid()
              }).then(function(res) {
                console.log(res);
                if (res.state == "ok") {
                  wx.showToast({
                    title: "清除足迹成功", //提示的内容,
                    duration: 1500, //延迟时间,
                    icon: "success",
                    mask: true, //显示透明蒙层，防止触摸穿透,
                    success: function() {
                      _this.getlist();
                    }
                  });
                } else {
                  wx.showToast({
                    title: res.msg, //提示的内容,
                    duration: 1500, //延迟时间,
                    icon: "none",
                    mask: true //显示透明蒙层，防止触摸穿透,
                  });
                }
              });
            } else if (res.cancel) {
            }
          }
        });
      }
    },
    async getlist() {
      if (toLogin()) {
        const data = await get("/business/footList", {
          openId: this.openId
        });
        if (data.state == "ok") {
          this.collectlist = data.data;
        } else {
          wx.showToast({
            title: data.msg, //提示的内容,
            duration: 2000, //延迟时间,
            icon: "none",
            mask: true //显示透明蒙层，防止触摸穿透
          });
        }
      }
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/index?id=" + id
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
