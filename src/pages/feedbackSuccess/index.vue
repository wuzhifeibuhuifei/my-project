<template>
    <div class="container">
        <div class="content">
            <p class="header_content">感谢您对本店的关注与支持，我们会认真处理您的反馈，尽快修复和完善相关功能。</p>
            <button @click="close">关闭</button>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {

    },
    data() {
        return {

        }
    },
    methods: {
        close() {
            wx.switchTab(
	    		{url:'../my/index'}
	    	)
        }
    },
};
</script>
<style lang="scss" scoped>
    @import "./style";
</style>
