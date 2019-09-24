<template>
    <div class="container999" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
        <!-- 刷新事件isRefresh需要异步操作返回resolve -->
        <refresh ref="refresh" @isRefresh='isRefresh'></refresh>

        <search ref="search" @changeTab='changeTab' @queryKeyword="toSearch" :tabTitle="tabTitle"></search>

        <!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
        <swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
            <!-- 首页列表 -->
            <swiper-item>
                <scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation
                             :scroll-into-view="toView">
                    <view class="content">
                        <headerPage ref="headerPage"></headerPage>
                    </view>
                </scroll-view>
            </swiper-item>

            <!-- 分类列表 -->
            <swiper-item>
                <scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation
                             :scroll-into-view="toView">
                    <view class="content">
                        <categoryPage ref="categoryPage"></categoryPage>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>

        <!--弹窗-->
        <!-- <div class="modal-mask" @click="onConfirm()" catchtouchmove="preventTouchMove" v-if="kefuShow"></div> -->
        <!--        <div class="modal-dialog" v-if="kefuShow"> -->
        <!--            &lt;!&ndash; <div class="modal-title">温馨提示</div>&ndash;&gt;-->
        <!--            <div class="modal-content">-->
        <!--                <div class="modal-input">-->
        <!--                    <span style="font-size:32rpx;font-weight:bold;height:77rpx;line-height:77rpx;">长按保存二维码后，微信识别</span>-->
        <!--                    <div style="width:100%; text-align: center;margin: 10rpx 0 10rpx 10rpx;">-->
        <!--                        <div style="width: 50%;float: left;">-->
        <!--                            <img style="width: 200rpx;height: 200rpx;float: left;margin: 10rpx 0 10rpx 10rpx;"-->
        <!--                                 src="/static/images/kefu1.png" @longpress="clickLong1">-->
        <!--                            <div style="float: left;text-align: center;">-->
        <!--                                <p style="font-size:25rpx;color:#ba3537;">客服1号：ShirleyLJS</p>-->
        <!--                                <p style="font-size:25rpx;color:#ba3537;">零售或一件代发</p>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                        <div style="width: 50%;float: left;">-->
        <!--                            <img style="width: 200rpx;height: 200rpx;float: right;margin: 10rpx 24rpx 10rpx 10rpx;"-->
        <!--                                 src="'baseUrl' + static/images/linfei_wechat(1).png" @longpress="clickLong2">-->
        <!--                            <div style="float: left;text-align: center;">-->
        <!--                                <p style="font-size:25rpx;color:#ba3537;">客服2号：Fairylin91</p>-->
        <!--                                <p style="font-size:25rpx;color:#ba3537;">批发或代理</p>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                    <div style="clear: both;">-->
        <!--                    </div>-->
        <!--                    &lt;!&ndash;<div style="height: 200rpx;"><p style="font-size: 30rpx; color: red;">欢迎加客服微信咨询或者购买</p><button class="save-btn" @click="saveImage()">保存图片</button></div>&ndash;&gt;-->
        <!--                </div>-->
        <!--            </div>-->
        <!--            <div class="modal-footer">-->
        <!--                &lt;!&ndash; <view class="btn-cancel" bindtap="onCancel" data-status="cancel">取消</view>&ndash;&gt;-->
        <!--                <div class="btn-confirm" @click="onConfirm()" data-status="confirm">确定</div>-->
        <!--            </div>-->
        <!--        </div>-->
    </div>
</template>
<script>
    const util = require('../../utils/util.js');
    import {toPage, toLogin} from "../../utils/index";
    import * as request from '../../api/config'
    import search from "../../components/search";
    import headerPage from "../../components/headerPage";
    import categoryPage from "../../components/categoryPage";
    import refresh from "../../components/refresh";


    export default {
        components: {
            search, headerPage, categoryPage, refresh
        },
        onShow() {
        },
        computed: {
            // ...mapState(["cityName"])
        },
        mounted() {

            //获取默认右侧数据
            // this.selectitem(this.id, this.nowIndex);
        },
        data() {
            return {
                banner: [],
                channel: [],
                brandList: [],
                newGoods: [],
                hotGoods: [],
                topicList: [],
                newCategoryList: [],
                isActive: "home",
                id: "1005000",
                nowIndex: 0,
                listData: [],
                detailData: {},
                detailData1: [],
                categoryTwoList: [],
                categoryTitle: "",
                kefuShow: false,
                tabTitle: ['首页', '分类'], //导航栏格式 --导航栏组件
                currentTab: 0, //sweiper所在页
                // pages:[1,1,1,1], //第几个swiper的第几页
                list: [[1, 2, 3, 4, 5, 6], ['a', 'b', 'c', 'd', 'e', 'f']] //数据格式
            };
        },
        methods: {
            changeTab(index) {
                this.currentTab = index
            },
            // swiper 滑动
            swiperTab: function (e) {
                var index = e.detail.current //获取索引
                if (this.tabTitle.length <= 5) {
                    this.$refs.search.navClick(index)
                } else {
                    this.$refs.search.longClick(index)
                }
            },
            // 加载更多 util.throttle为防抖函数
            lower1: util.throttle(function (e) {
                console.log(`加载${this.currentTab}`)//currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
                // uni.showLoading({
                //     title: '加载中',
                //     mask: true
                // })
                // this.isRequest().then((res) => {
                //     let tempList = this.list
                //     tempList[this.currentTab] = tempList[this.currentTab].concat(res)
                //     console.log(tempList)
                //     this.list = tempList
                //     this.$forceUpdate() //二维数组，开启强制渲染
                // })
            }, 300),
            toSearch(categoryId) {
                toPage(request.goodsCategoryList(categoryId))
            },
            goodsDetail(id) {
                wx.navigateTo({
                    url: "/pages/goods/index?id=" + id
                });
            },
            categoryList(id) {
                wx.navigateTo({
                    url: "/pages/categorylist/index?id=" + id
                });
            },
            goodsList(info) {
                if (info == "hot") {
                    wx.navigateTo({
                        url: "/pages/newgoods/index?isHot=" + 1
                    });
                } else {
                    wx.navigateTo({
                        url: "/pages/newgoods/index?isNew=" + 1
                    });
                }
            },
            topicdetail(id) {
                wx.navigateTo({
                    url: "/pages/topicdetail/index?id=" + id
                });
            },
            totopic() {
                wx.navigateTo({
                    url: "/pages/topic/index"
                });
            },
            tobrandList() {
                wx.navigateTo({
                    url: "/pages/brandlist/index"
                });
            },
            branddetail(id) {
                wx.navigateTo({
                    url: "/pages/branddetail/index?id=" + id
                });
            },
            qh(e) {
                var _this = this;
                _this.isActive = e.currentTarget.id;
            },
            showKefu() {
                this.kefuShow = true;
            },
            onConfirm() {
                this.kefuShow = false;
            },
            // 刷新touch监听
            refreshStart(e) {
                this.$refs.refresh.refreshStart(e);
            },
            refreshMove(e) {
                this.$refs.refresh.refreshMove(e);
            },
            refreshEnd(e) {
                this.$refs.refresh.refreshEnd(e);
            },
            isRefresh() {
                let currentTab = this.currentTab;
                if (currentTab == 0) {
                    this.$refs.headerPage.getIndexDataNoLoading().then((res) => {
                        this.$refs.refresh.endAfter();
                    })
                } else if (currentTab == 1) {
                    this.$refs.categoryPage.getListDataNoLoading().then((res) => {
                        this.$refs.refresh.endAfter();
                    })
                }
            },
            clickLong1() {
                var imgSrc = "/static/images/kefu1.png";
                if (toLogin()) {
                    wx.saveImageToPhotosAlbum({
                        filePath: imgSrc,
                        success: function (data) {
                            console.log(data);
                        },
                        fail: function (err) {
                            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                                wx.getSetting({
                                    success(settingdata) {
                                        if (!settingdata.authSetting['scope.writePhotosAlbum']) {
                                            wx.showModal({
                                                title: '是否允许保存图片',
                                                content: '需要保存图片，请确认授权，否则图片将无法保存',
                                                success: function (tip) {
                                                    if (tip.confirm) {
                                                        wx.openSetting({
                                                            success: function (data) {
                                                                if (data.authSetting["scope.writePhotosAlbum"]) {
                                                                    wx.showToast({
                                                                        title: '授权成功',
                                                                        icon: 'success',
                                                                        duration: 1000
                                                                    }) //授权成功之后，再调用chooseLocation选择地方
                                                                    wx.saveImageToPhotosAlbum({
                                                                        filePath: imgSrc,
                                                                        success: function (data) {
                                                                            console.log(data);
                                                                        },
                                                                        fail: function (err) {
                                                                        }
                                                                    })
                                                                } else {
                                                                    wx.showToast({
                                                                        title: '授权失败',
                                                                        icon: 'success',
                                                                        duration: 1000
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            },
            clickLong2() {
                var imgSrc = "/static/images/linfei_wechat(1).png";
                if (toLogin()) {
                    wx.saveImageToPhotosAlbum({
                        filePath: imgSrc,
                        success: function (data) {
                            console.log(data);
                        },
                        fail: function (err) {
                            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                                wx.getSetting({
                                    success(settingdata) {
                                        if (!settingdata.authSetting['scope.writePhotosAlbum']) {
                                            wx.showModal({
                                                title: '是否允许保存图片',
                                                content: '需要保存图片，请确认授权，否则图片将无法保存',
                                                success: function (res) {
                                                    if (res.confirm) {
                                                        wx.openSetting({
                                                            success: function (data) {
                                                                if (data.authSetting["scope.writePhotosAlbum"]) {
                                                                    wx.showToast({
                                                                        title: '授权成功',
                                                                        icon: 'success',
                                                                        duration: 1000
                                                                    }) //授权成功之后，再调用chooseLocation选择地方
                                                                    wx.saveImageToPhotosAlbum({
                                                                        filePath: imgSrc,
                                                                        success: function (data) {
                                                                            console.log(data);
                                                                        },
                                                                        fail: function (err) {
                                                                        }
                                                                    })
                                                                } else {
                                                                    wx.showToast({
                                                                        title: '授权失败',
                                                                        icon: 'success',
                                                                        duration: 1000
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    }
                                                },
                                                fail: function (res) {
                                                    console.log('fail');
                                                },
                                                complete: function (res) {
                                                    console.log('complete');
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
    };
</script>
<style lang='scss' scoped>
    @import "./style.scss";
</style>
