<template>
    <div class="goods">
        <div class="swiper">
            <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
                <block v-for="(item, index) in gallery " :key="index">
                    <swiper-item class="swiper-item">
                        <!--                        <image :src="item.picUrl2" class="slide-image"/>-->
                        <scroll-view :scroll-y="true" @scroll="scroll" id="scroll">
                            <view class='item'>
                                <v-lazyLoad :src="'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1563915113,300493152&fm=58'"
                                            mode="widthFix"></v-lazyLoad>
                            </view>
                        </scroll-view>
                    </swiper-item>
                </block>
            </swiper>
<!--            <scroll-view :scroll-y="true" @scroll="scroll" id="scroll">-->
<!--                <view class='item'>-->
<!--                    <v-lazyLoad :src="gallery[0].picUrl2"-->
<!--                                mode="widthFix"></v-lazyLoad>-->
<!--                </view>-->
<!--            </scroll-view>-->


            <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
        </div>
        <div class="goods-info">
            <div class="c">
                <p>{{info.name}}</p>
                <p v-if="info.goods_brief">{{info.goods_brief}}</p>
                <p v-else></p>
                <p>￥{{info.retail_price}}</p>
                <div v-if="brand.name" class="brand">
                    <p>{{brand.name}}</p>
                </div>
            </div>
        </div>
        <div @click="showType" class="section-nav">
            <div>请选择规格数量</div>
            <div></div>
        </div>
        <!-- <div @click="showType" class="section-nav">
          <div>用户评价</div>
          <div></div>
        </div> -->

        <div v-if="attribute.length!=0" class="attribute">
            <div class="head">
                商品参数
            </div>
            <div v-for="(item,index) in attribute" :key="index" class="item">
                <div>{{item.name}}</div>
                <div>{{item.value}}</div>
            </div>
        </div>
        <div v-if="goods_desc" class="detail">
            <rich-text class="parse-html" :nodes="goods_desc"></rich-text>
            <!--            <u-parse :content="detailData" :loading="loading" @preview="preview" @navigate="navigate" />-->
        </div>
        <!-- 常见问题 -->
        <!--        <div class="common-problem">-->
        <!--            <div class="h">-->
        <!--                <div class="line"></div>-->
        <!--                <text class="title">常见问题</text>-->
        <!--                <div class="line"></div>-->
        <!--            </div>-->
        <!--            <div class="b">-->
        <!--                <div class="item" v-for="(item, index) in issueList" :key="index">-->
        <!--                    <div class="question-box">-->
        <!--                        <text class="spot"></text>-->
        <!--                        <text class="question">{{item.question}}</text>-->
        <!--                    </div>-->
        <!--                    <div class="answer">-->
        <!--                        {{item.answer}}-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <!-- 常见问题 -->
        <!-- 大家都在看 -->

        <div class="common-problem">
            <div class="h">
                <div class="line"></div>
                <text class="title">大家都在看</text>
                <div class="line"></div>
            </div>
            <div class="sublist">
                <div @click="togoodsDetail(subitem.id)" v-for="(subitem, subindex) in productList" :key="subindex">
                    <img :src="subitem.list_pic_url" alt="">
                    <p>{{subitem.name}}</p>
                    <p>￥{{subitem.retail_price}}</p>
                </div>
            </div>
        </div>

        <!-- 大家都在看 -->
        <div class="bottom-fixed">
            <div @click="toHome" class="home_btn">
                <div>

                </div>
            </div>
            <div @click="collect">
                <div class="collect" :class="[collectFlag ? 'active' :'']">

                </div>

            </div>
        </div>

        <div v-show="showpop" @click="showType" class="pop">

        </div>
        <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
            <div class="top">
                <div class="left">
                    <img :src="info.list_pic_url" alt="">
                </div>
                <div class="right">
                    <div>
                        <p>价格￥{{info.retail_price}}</p>
                        <p>请选择数量</p>
                    </div>
                </div>
                <div @click="showType" class="close">
                    X
                </div>
            </div>
            <div class="b">
                <p>数量</p>
                <div class="count">
                    <div @click="reduce" class="cut">-</div>
                    <input class="number" disabled="" v-model="number"/>
                    <div @click="add" class="add">+</div>
                </div>
            </div>
        </div>

        <!-- 选择规格部分 -->
    </div>
</template>

<script>
    import {get, post, toLogin, login, getStorageOpenid, baseUrl} from "../../utils/index";
    import * as request from '../../api/config';
    import VLazyLoad from "../../components/lazyLoad/index.vue";
    import lazyLoadPlugin from '../../plugins/lazyLoad/js/lazyLoad.js'

    export default {
        onShow() {
            if (login()) {
                this.loginGoodsDetail(this.$root.$mp.query.id, getStorageOpenid());
            }
        },
        onLoad: function (option) {
            let id = option.id;
            this.goodsDetail(id);
            // 添加足迹
            this.addFootHistory(id);
        },
        created() {

        },
        //商品转发
        onShareAppMessage() {
            console.log(this.info.name);
            console.log(this.info.id);
            console.log(this.gallery[0].picUrl2);

            return {
                title: this.info.name,
                path: "/pages/goods/main?id=" + this.info.id,
                imageUrl: this.gallery[0].picUrl2 //拿第一张商品的图片
            };
        },
        data() {
            return {
                allnumber: 0,
                openId: "",
                collectFlag: false,
                number: 1,
                showpop: false,
                gallery: [],
                info: {},
                brand: {},
                attribute: [],
                issueList: [],
                productList: [],
                goods_desc: "",
                id: "",
                userInfo: "",
                goodsId: "",
                allPrise: "",
                loading: false,//开启loading不显示默认值
            };
        },
        components: {
            VLazyLoad,
        },
        methods: {
            preview(src, e) {
                // do something
            },
            navigate(href, e) {
                // do something
            },
            scroll() {
                // 监听scroll事件
                lazyLoadPlugin.scroll();
            },
            togoodsDetail(id) {
                wx.redirectTo({url: "/pages/goods/index?id=" + id});
            },
            add() {
                this.number = this.number + 1;
            },
            reduce() {
                if (this.number > 1) {
                    this.number = this.number - 1;
                } else {
                    return false;
                }
            },
            async bug() {
                if (toLogin()) {
                    if (this.showpop) {
                        if (this.number == 0) {
                            wx.showToast({
                                title: "请选择商品数量", //提示的内容,
                                duration: 2000, //延迟时间,
                                icon: "none",
                                mask: true, //显示透明蒙层，防止触摸穿透,
                                success: res => {
                                }
                            });
                            return false;
                        }
                        wx.setStorageSync("payGoodsDetail", this.info);
                        wx.setStorageSync("payGoodsAllPrice", this.number * this.allPrise);
                        wx.setStorageSync("payGoodsNum", this.number);
                        wx.navigateTo({
                            url: "/pages/order/main?goodsId=" + ''
                        });
                    } else {
                        this.showpop = true;
                    }
                }
            },
            async collect() {
                if (toLogin()) {
                    this.collectFlag = !this.collectFlag;
                    const data = await post("/business/addCollection", {
                        openId: getStorageOpenid(),
                        goodsId: this.goodsId
                    });
                }
            },
            async addFootHistory(id) {
                if (login()) {
                    const data = await post("/business/addFoot", {
                        openId: getStorageOpenid(),
                        goodsId: id
                    })
                }
            },
            async addCart() {
                var _this = this;
                if (toLogin()) {
                    if (this.showpop) {
                        if (this.number == 0) {
                            wx.showToast({
                                title: "请选择商品数量", //提示的内容,
                                duration: 2000, //延迟时间,
                                icon: "none",
                                mask: true, //显示透明蒙层，防止触摸穿透,
                                success: res => {
                                }
                            });
                            return false;
                        }
                        const data = await post("/business/addShopCar", {
                            openId: getStorageOpenid(),
                            goodsId: this.goodsId,
                            number: this.number
                        });
                        //添加成功后
                        if (data.state == 'ok') {
                            this.allnumber = this.allnumber + this.number;
                            wx.showToast({
                                title: "添加购物车成功",
                                icon: "success",
                                duration: 1500,
                                success: res => {
                                    _this.showpop = false
                                }
                            });
                        }
                    } else {
                        this.showpop = true;
                    }
                }
            },
            toCart() {
                wx.switchTab({
                    url: "/pages/cart/main"
                });
            },
            async loginGoodsDetail(id, openId) {
                const data = await get("/business/goodsDetail", {
                    id: id,
                    openId: openId
                });
                // 是否被收藏
                this.collectFlag = data.collected;
                // 我的购物车商品数量
                this.allnumber = data.allnumber;
            },
            async goodsDetail(id) {
                const data = await get(request.goodsDetailData, {
                    id: id,
                    openId: login() ? this.openId : ''
                });
                // banner列表图
                this.gallery = data.gallery;
                // 商品详情
                this.info = data.info;
                // 价格
                this.allPrise = data.info.retail_price;
                this.goodsId = data.info.id;
                // 商品参数
                this.attribute = data.attribute;
                // 商品描述
                this.goods_desc = data.info.goods_desc;
                // 商品常见问题
                this.issueList = data.issue;
                this.productList = data.productList;
            },
            showType() {
                this.showpop = !this.showpop;
            },
            toHome() {
                wx.switchTab(
                    {url: '../index/main'}
                )
            }
        }
    };
</script>
<style lang='scss' scoped>
    @import "./style.scss";
</style>
