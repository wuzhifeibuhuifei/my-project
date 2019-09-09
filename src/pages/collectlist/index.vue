<template>
  <div class="collection">
    <div class="title">
      我的收藏
    </div>
    <div class="sublist">
      <div @click="goodsDetail(subitem.goodsId)" v-for="(subitem, subindex) in collectlist" :key="subindex">
        <img :src="subitem.listImgUrl" alt="">
        <p>{{subitem.name}}</p>
        <p>￥{{subitem.price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    toLogin,
    getStorageOpenid
  } from '../../utils';
  export default {
    onShow() {
      this.openId = getStorageOpenid();
      this.getlist();
    },
    created() {},
    mounted() {

    },
    data() {
      return {
        openId: "",
        collectlist: []
      };
    },
    components: {},
    methods: {
      async getlist() {
        if (toLogin()) {
          const data = await get('/business/collectionList', {
            openId: this.openId
          })
          if (data.state == 'ok') {
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
          url: "/pages/goods/main?id=" + id
        });
      },
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
