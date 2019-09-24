<template>
    <div class="search">
        <div class="head">
            <div>
                <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png"
                     alt="">
                <input type="text" confirm-type="search" v-model="words" @confirm="searchWords" placeholder="商品搜索">
                <!-- <input name="input" class="keywrod" focus="true" value="{{keyword}}" confirm-type="search" bindinput="inputChange" bindfocus="inputFocus" bindconfirm="onKeywordConfirm" confirm-type="search" placeholder="{{defaultKeyword.keyword}}" /> -->
                <img @click="clearInput" class="del"
                     src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png"
                     alt="">
            </div>
            <div @click="cancel">取消</div>
        </div>
        <!-- <div class="searchtips" v-if="words">
          <div @click="searchWords" v-if="tipsData.length!=0" :data-value="item.name" v-for="(item,index) in tipsData" :key="index">
            {{ item.name }}
          </div>
          <div v-if="tipsData.length==0" class="nogoods">
            数据库暂无此类商品...
          </div>
        </div> -->
        <!-- <div class="history" v-if="historyData.length!=0">
          <div class="t">
            <div>历史记录</div>
            <div @click="clearHistory">

            </div>
          </div>
          <div class="cont">
            <div @click="searchWords" :data-value="item.keyword" v-for="(item,index) in historyData" :key="index">
              {{item.keyword}}
            </div>
          </div>
        </div> -->
        <!-- <div class="history hotsearch">
          <div class="t">
            <div>热门搜索</div>
          </div>
          <div class="cont">
            <div @click="searchWords" v-for="(item,index) in hotData" :data-value="item.keyword" :class="{active:0==index}" :key="index">
              {{item.keyword}}
            </div>
          </div>
        </div> -->
        <!--商品列表  -->
        <div class="goodsList">
            <div class="sortnav">
                <!-- <div>
                  <select name="category" v-for="(item, index) in categoryData" :key="index" class="active">
                    <option value="item.id">{{item.name}}</option>
                  </select>
                  <picker v-for="(item, index) in categoryData" :key="index" @change="bindDateChange">
                      <view class="active" value="111">{{item.name}}</view>
                  </picker>
                </div> -->
                <div @click="changeTab(0)" :class="[0==nowIndex ?'active':'']">{{categoryTitle}}</div>
                <div @click="changeTab(1)" class="price"
                     :class="[1==nowIndex ?'active':'', order =='desc'? 'desc':'asc']">销量
                </div>
                <div @click="changeTab(2)" class="price"
                     :class="[2==nowIndex ?'active':'', order =='desc'? 'desc':'asc']">价格
                </div>
            </div>
            <div style="height: 100%;">
                <scroll-view style="height: 100%;" class="sortlist" scroll-y="true" @scrolltolower="lower1"
                             scroll-with-animation>
                    <view>
                        <view @click="goodsDetail(item.id)" v-for="(item, index) in listData" :key="index"
                              :class="[(listData.length)%2==0?'active':'none']" class="item">
                            <img :src="item.list_pic_url" alt="">
                            <p class="name">{{item.name}}</p>
                            <p class="price">￥{{item.retail_price}}</p>
                        </view>
                    </view>
                    <view style="width: 100%;height: 100rpx;opacity: 0;display: inline-block;">底部占位盒子</view>
                </scroll-view>
            </div>
        </div>
    </div>
</template>

<script>
    const util = require('../../utils/util.js');
    import {post, get} from "../../utils";


    export default {
        onLoad: function (option) {
            let id = option.id;
            this.categoryId = id;
            this.getlistData(id, this.page);
            this.getCategoryData();
        },
        data() {
            return {
                nowIndex: 0,
                words: "",
                categoryData: [],
                listData: [],
                openid: "",
                saleOrder: '',
                page: 1,
                rows: 10,
                order: '',
                categoryId: '',
                categoryTitle: '综合'
            };
        },
        components: {},
        methods: {
            goodsDetail(id) {
                wx.navigateTo({
                    url: "/pages/goods/index?id=" + id
                });
            },
            cancel() {
                wx.navigateBack({
                    delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
                });
            },
            clearInput() {
                this.words = "";
            },
            getlistData(id, page) {
                //获取商品列表
                const data = get("/index/search", {
                    keyword: this.words,
                    saleOrder: this.saleOrder,
                    order: this.order,
                    sort: this.nowIndex,
                    page: page,
                    rows: this.rows,
                    categoryId: id
                }).then((res) => {
                    if (res.state == 'ok') {
                        this.listData = res.data.list;
                        if (res.categoryName != null) {
                            this.categoryTitle = res.categoryName;
                        }
                    }
                })
            },
            async getCategoryData() {
                const data = await get('/category/indexaction', {})
                this.categoryData = data;
            },
            changeTab(index) {
                this.nowIndex = index;
                if (index == 2 || index == 1) {
                    this.saleOrder = this.saleOrder == "asc" ? "desc" : "asc";
                    this.order = this.order == "asc" ? "desc" : "asc";
                } else {
                    this.order = "";
                }
                this.getlistData(this.categoryId, this.page);
            },
            async searchWords(e) {
                this.saleOrder = '';
                this.order = '';
                this.sort = 0;
                this.categoryId = "";
                this.categoryTitle = '综合';
                this.changeTab(0);
                this.getlistData(this.categoryId, this.page);
            },
            lower1: util.throttle(function (e) {
                this.page = this.page + 1;
                get("/index/search", {
                    keyword: this.words,
                    saleOrder: this.saleOrder,
                    order: this.order,
                    sort: this.nowIndex,
                    page: this.page,
                    rows: this.rows,
                    categoryId: this.categoryId
                }).then((res) => {
                    let tempList = this.listData;
                    tempList = tempList.concat(res.data.list);
                    this.listData = tempList;
                    console.log(this.listData);
                    this.$forceUpdate();
                })
            }, 300)
        }
    };
</script>
<style lang='scss' scoped>
    @import "./style";
</style>
