<template>
    <div class="index">
        <keep-alive>
            <div class="category">
                <div class="content">
                    <scroll-view class="left" scroll-y="true">
                        <div class="iconText" @click="selectitem(item,index)" v-for="(item, index) in listData"
                             :class="[index==nowIndex?'active':'']" :key="index"> {{item.name}}
                        </div>
                    </scroll-view>
                    <scroll-view class="right" scroll-y="true">
                        <div class="title">
                            <span>—</span>
                            <span> {{categoryTitle}}分类</span>
                            <span>—</span>
                        </div>
                        <div class="bottom">
                            <div @click="toSearch(item.geshow_id)" v-for="(item,index) in categoryTwoList"
                                 :key="index"
                                 class="item">
                                <span> {{item.name}}</span>
                            </div>
                        </div>
                    </scroll-view>
                </div>
            </div>
        </keep-alive>
    </div>
</template>

<script>
    import {baseUrl, get} from "../utils/index";
    import * as request from "../api/config";

    export default {
        name: "categoryPage",
        data() {
            return {
                nowIndex: 0,
                listData: [],
                categoryTitle: "",
                categoryTwoList: []
            }
        },
        created() {
            this.getListData();
        },
        methods: {
            async getListData() {
                let _this = this;
                const data = await get(request.categoryData);
                // 给默认值
                if (data != null && data.length > 0) {
                    _this.categoryTwoList = data[0].categoryList;
                    _this.categoryTitle = data[0].name;
                    _this.listData = data;
                }
            },
            async selectitem(item, index) {
                let _this = this;
                _this.nowIndex = index;
                _this.categoryTwoList = item.categoryList;
                _this.categoryTitle = item.name;
            },
        }
    }
</script>

<style lang='scss' scoped>
    .index {
        width: 100%;
        overflow: hidden;
        position: relative;

        .category {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;

            .search {
                height: 88rpx;
                // width: 100%;
                padding: 0 30rpx;
                background: #fff;
                display: flex;
                align-items: center;
                border-bottom: 1rpx solid #ededed;

                .ser {
                    width: 690rpx;
                    height: 56rpx;
                    background: #ededed;
                    border-radius: 8rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    span {
                        display: inline-block;
                    }

                    .icon {
                        background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png') center no-repeat;
                        background-size: 100%;
                        width: 28rpx;
                        height: 28rpx;
                        margin-right: 10rpx;
                    }
                }
            }

            .content {
                flex: 1;
                background: #fff;
                display: flex;

                .left {
                    width: 162rpx;
                    height: 100%;
                    text-align: center;

                    .iconText {
                        text-align: center;
                        line-height: 90rpx;
                        width: 162rpx;
                        height: 90rpx;
                        color: #333;
                        font-size: 28rpx;
                        border-left: 6rpx solid #fff;
                    }

                    .active {
                        color: #ab2b2b;
                        font-size: 36rpx;
                        border-left: 6rpx solid #ab2b2b;
                    }
                }

                .right {
                    flex: 1;
                    border-left: 1rpx solid #fafafa;
                    flex: 1;
                    height: 100%;
                    padding: 0 30rpx 0 30rpx;

                    .banner {
                        width: 100%;
                        height: 222rpx;
                        margin-top: 20rpx;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .title {
                        text-align: center;
                        padding: 50rpx 0;

                        span:nth-child(2) {
                            font-size: 24rpx;
                            color: #333;
                            padding: 0 10rpx;

                        }

                        span:nth-child(2n + 1) {
                            color: #999;
                        }
                    }

                    .bottom {
                        display: flex;
                        // justify-content: space-between;
                        flex-wrap: wrap;

                        .item {
                            width: 33.33%;
                            text-align: center;
                            margin-bottom: 20rpx;

                            img {
                                height: 144rpx;
                                width: 144rpx;
                                display: block;
                                margin: 0 auto;
                            }
                        }
                    }
                }
            }
        }
    }
</style>