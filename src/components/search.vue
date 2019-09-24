<template>
    <view class='nav'>
        <!-- #ifdef H5 -->
        <view style="height: 44px;width: 100%;">边距盒子</view>
        <!-- #endif -->
        <!-- 搜索 -->
        <view class='searchInput999'>
            <view class='searchBox999'>
                <image src='/static/images/icon-search.png' class='search999'></image>
            </view>
            <input class='input999' placeholder="输入关键词" @click="toSearch('')"></input>
        </view>
        <!-- 导航栏 agents导航栏标题 -->
        <navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
    </view>
</template>

<script>
    import navTab from './navTab.vue'
    export default {
        components: {
            navTab
        },
        name: "search",
        data() {
            return {

            }
        },
        props: {
            tabTitle: {
                type: Array,
                default: []
            }
        },
        methods: {
            changeTab(index){
                this.$emit('changeTab', index)
            },
            navClick(index) {
                this.$refs.navTab.navClick(index)
            },
            longClick(index) {
                this.$refs.navTab.longClick(index)
            },
            toSearch(categoryId) {
                this.$emit('queryKeyword', categoryId)
            }
        }
    }
</script>

<style scoped>
    .search-header {
        height:80rpx;
        line-height:80rpx;
        position:relative;
        width:100%;
    }

    .search-header input {
        height: 80rpx;
        line-height:80rpx;
        position: absolute;
        top: 0;
        width:100%;
    }

    .nav {
        position: fixed;
        left: 0;
        top: 0;
        color: white;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        font-size: 24rpx;
        background-color: #50B7EA;
        z-index: 996;
    }

    .searchInput999 {
        width: 90%;
        margin: 0 auto;
        background: white;
        border-radius: 30rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 56rpx;
    }

    .search999 {
        width: 32rpx;
        height: 32rpx;
    }

    .searchBox999 {
        width: 56rpx;
        height: 56rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .input999 {
        color: #999;
        width: 80%;
    }
</style>