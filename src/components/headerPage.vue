<!--suppress ALL -->
<template>
    <div class="index" v-if="loading">
        <keep-alive>
            <!-- 爆品热销 -->
            <div class="brand">
                <div class="head">爆品热销</div>
                <div class="content" v-if="brandList.length!=0">
                    <div class="sub-list" @click="goodsDetail(item.id)" v-for="(item, index) in brandList" :key="index">
                        <div class="cont-img">
                            <img :src="item.list_pic_url">
                        </div>
                        <p> {{item.name}} </p>
                        <p>￥ {{item.retail_price}} </p>
                    </div>
                </div>
            </div>

            <!-- 店主推荐 -->
            <div class="newgoods">
                <div class="head">店主推荐</div>
                <div class="list" v-if="newGoods.length!=0">
                    <ul>
                        <scroll-view class="scroll-view" scroll-x="true" scroll-with-animation :scroll-into-view="toView">
                            <li @click="goodsDetail(item.id)" v-for="(item, index) in newGoods" :key="index">
                                <img :src="item.list_pic_url" alt>
                                <p> {{item.name}}</p>
                                <p v-if="item.goods_brief">{{item.goods_brief}}</p>
                                <p v-else>
                                <p>
                                <p>￥ {{item.retail_price}}</p>
                            </li>
                        </scroll-view>
                    </ul>
                </div>
            </div>

            <!-- 好物精选 -->
            <div class="newcategory">
                <div class="list" v-for="(item, index) in newCategoryList" :key="index">
                    <div class="head">{{item.name}}精选</div>
                    <div class="sublist">
                        <div @click="goodsDetail(subitem.id)" v-for="(subitem, subindex) in item.goodsList"
                             :key="subindex">
                            <img :src="subitem.list_pic_url" alt>
                            <p> {{subitem.name}}</p>
                            <p>￥ {{subitem.retail_price}}</p>
                        </div>
                        <div @click="toSearch(item.geshow_id)">
                            <div class="last"><p> {{item.name}}精选</p>
                                <span class="icon"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </keep-alive>
    </div>
    <div v-else>

    </div>
</template>

<script>
    import {get, getNoLoading, toPage} from "../utils/index";
    import * as request from "../api/config";

    export default {
        name: "headerPage",
        data() {
            return {
                banner: [],
                channel: [],
                brandList: [],
                newGoods: [],
                hotGoods: [],
                topicList: [],
                newCategoryList: [],
                loading: false
            }
        },
        created () {
            this.getIndexData().then(res =>{
                this.loading = true
            })
        },
        methods: {
            async getIndexData() {
                const result = await get(request.indexData);
                this.banner = result.banner;
                this.channel = result.channel;
                // 爆品
                this.brandList = result.brandList;
                // 店主推荐
                this.newGoods = result.newGoods;
                this.hotGoods = result.hotGoods;
                this.topicList = result.topicList;
                // 好物精选
                this.newCategoryList = result.newCategoryList;
            },
            async getIndexDataNoLoading() {
                const result = await getNoLoading(request.indexData);
                this.banner = result.banner;
                this.channel = result.channel;
                // 爆品
                this.brandList = result.brandList;
                // 店主推荐
                this.newGoods = result.newGoods;
                this.hotGoods = result.hotGoods;
                this.topicList = result.topicList;
                // 好物精选
                this.newCategoryList = result.newCategoryList;
            },
            goodsDetail(id) {
                toPage(request.goodsDetail(id));
            },
            toSearch(id) {
                this.$emit('queryKeyword', id)
            }
        }
    }
</script>

<style lang='scss'>
    .index {
        width: 100%;
        overflow: hidden;
        position: relative;

        .brand {
            width: 100%;
            background: #ffffff;

            .head {
                text-align: left;
                padding:10rpx 10rpx;
                background: #f4f4f4;
                font-size:30rpx;
                font-weight:600;
            }

            .content {
                // width: 730rpx;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                padding:0 10rpx 0rpx 10rpx;
                background: #f4f4f4;

                .content-top {
                    width:100% !important;
                    text-align:center;
                    margin-top:62rpx;
                    height:100% !important;
                    margin-top:62rpx;
                    p {
                        font-size: 46rpx;
                    }
                }

                .sub-list {
                    width: 360rpx;
                    /*height: 260rpx;*/
                    // margin-bottom: 98rpx;
                    position: relative;
                    padding-bottom: 20rpx;
                    background:#fff;
                    margin-top:10rpx;

                    .cont-img{
                        width: 210rpx !important;
                        height: 210rpx !important;
                        margin: 0 auto;
                        margin-top: 20rpx;

                        image {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    p {
                        width:94%;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow:ellipsis;
                        margin-top:4rpx;
                        text-indent:1em;
                    }

                    p:nth-child(2) {
                        font-size:28rpx;
                    }

                    p:nth-child(3) {
                        color:#9c3232;
                        font-size:28rpx;
                    }
                }
            }
        }

        .newgoods {

            .head {
                text-align: left;
                padding: 10rpx 10rpx;
                font-size: 30rpx;
                font-weight: 600;
                margin-bottom: 10rpx;
            }

            .newgoods-top {
                margin-top: 20rpx;
                height: 260rpx;
                width: 100%;
                background: url("../static/images/bgnew.png") no-repeat;
                background-size: 100% 100%;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;

                .top {
                    p {
                        color: #8c9bae;
                        font-size: 32rpx;
                    }

                    p:nth-child(2) {
                        width: 180rpx;
                        height: 50rpx;
                        line-height: 50rpx;
                        margin: 27rpx auto 0 auto;
                        font-size: 22rpx;
                        background: #d8e4f0;
                    }
                }
            }

            .list {
                padding-bottom: 10rpx;
                padding-left: 10rpx;
                background: #f4f4f4;


                ul {
                    background: #ffffff;

                    .scroll-view {
                        width: 100%; // height: 470rpx; // display: flex;
                        // flex-wrap: nowrap;
                        white-space: nowrap;
                        display: flex;

                        li {
                            width: 280rpx;
                            height: 416rpx;
                            margin: 5rpx 0 5rpx 25rpx;
                            display: inline-block;

                            img {
                                width: 280rpx;
                                height: 280rpx;
                            }

                            p:nth-child(2) {
                                font-size: 27rpx;
                                font-weight: bold;
                            }

                            p:nth-child(3) {
                                color: #8a8a8a;
                                font-size: 24rpx;
                            }

                            p:nth-child(4) {
                                color: #9c3232;
                                font-size: 24rpx;
                            }

                            p:nth-child(5) {
                                color: #9c3232;
                            }

                            p {
                                width: 94%;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                margin-top: 8rpx;
                                text-indent: 1em;
                            }
                        }

                        li:nth-child(n+2) {
                            border-left: 1rpx solid #f4f4f4;
                        }
                    }
                }
            }

            .default-list {
                width: 100%;
                text-align: center;
                height: 221rpx;
                background: #ffffff;

                p {
                    padding-top: 70rpx;
                    font-size: 46rpx;
                }
            }
        }


        .hotgoods {
            .newgoods-top {
                background: url("../static/images/bgtopic.png") no-repeat;
                background-size: 100% 100%;

                .top {
                    p {
                        color: #b1a279;
                        font-size: 32rpx;
                        vertical-align: middle;
                    }

                    p:nth-child(1) {
                        span {
                            width: 4rpx;
                            height: 4rpx;
                            font-size: 14rpx;
                            display: inline-block;
                            vertical-align: middle;
                            background: #b1a279;
                        }
                    }

                    p:nth-child(2) {
                        background: #f4e9cb;
                    }
                }
            }
        }


        .topicList {
            margin-top: 20rpx;
            background: #fff;

            .topicList-top {
                text-align: center;
                padding: 36rpx;
                vertical-align: middle;

                .icon {
                    display: inline-block;
                    width: 32rpx;
                    height: 32rpx;
                    margin-left: 5rpx;
                    background: url("../static/images/right.png") no-repeat;
                    background-size: 100% 100%;
                    vertical-align: middle;
                }
            }

            .list {
                .scroll-view {
                    white-space: nowrap;

                    li {
                        display: inline-block;
                        width: 575rpx;
                        margin-left: 25rpx;

                        img {
                            display: block;
                            width: 575rpx;
                            height: 325rpx;
                            border-radius: 10rpx;
                        }

                        .btom {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 42rpx;
                            width: 100%;

                            div:nth-child(1) {
                                width: 90%;

                                p {
                                    margin-top: 8rpx;
                                }

                                p:nth-child(1) {
                                    font-size: 30rpx;
                                    font-weight: bold;
                                }

                                p:nth-child(2) {
                                    width: 90%;
                                    color: #8a8a8a;
                                    font-size: 24rpx;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }

                            div:nth-child(2) {
                                margin-top: 8rpx;
                                color: #9c3232;
                                font-size: 24rpx;
                            }
                        }
                    }

                    li:last-child {
                        margin-right: 25rpx;
                    }
                }
            }
        }

        .newcategory {
            margin-top: 0rpx;
            padding: 0 10rpx 25rpx 10rpx;

            .head {
                padding: 10rpx 10rpx;
                text-align: left;
                font-size: 30rpx;
                font-weight: 600;
            }

            .sublist {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                width: 730rpx;
                margin: 0 auto;

                div {
                    width: 360rpx;
                    background: #fff;
                    margin-bottom: 10rpx;
                    padding-bottom: 10rpx;

                    img {
                        display: block;
                        width: 302rpx;
                        height: 302rpx;
                        margin: 0 auto;
                    }

                    p {
                        margin-bottom: 5rpx;
                        text-indent: 1em;
                    }

                    p:nth-child(2) {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 98%;
                    }

                    p:nth-child(3) {
                        color: #9c3232;
                    }
                }

                .last {
                    display: block;
                    width: 302rpx;
                    height: 302rpx;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;

                    p {
                        height: 33rpx;
                        width: 100%;
                        line-height: 33rpx;
                        color: #333;
                        font-size: 33rpx;
                        text-align: center;
                    }

                    .icon {
                        display: inline-block;
                        width: 70rpx;
                        height: 70rpx;
                        background: url("../static/images/rightbig.png") no-repeat;
                        background-size: 100% 100%;
                        margin-top: 60rpx;
                    }
                }

                div:nth-child(2n) {
                    margin-left: 10rpx;
                }
            }
        }
    }
</style>