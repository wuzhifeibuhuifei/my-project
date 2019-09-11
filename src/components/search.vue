<template>
    <view class="cu-bar search bg-white">
        <view class="search-form round">
            <text class="cuIcon-search"><span></span></text>
            <view class="search-header">
                <view v-show="isSearch">搜索产品名称</view>
                <form action="">
                    <input v-model="message" maxlength="140" step="" @focus="clearText" @blur="outText" autocomplete="off" type="search">
                </form>
            </view>
        </view>
        <view class="action">
            <button class="cu-btn bg-green shadow-blur round">搜索</button>
        </view>
    </view>
</template>

<script>
    export default {
        name: "search",
        data() {
            return {
                "isSearch": true,
                "message": ""
            }
        },
        methods: {
            clearText() {
                if (!this.message) {
                    this.isSearch = false
                }
            },
            outText() {
                if (!this.message) {
                    this.isSearch = true
                }
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

</style>