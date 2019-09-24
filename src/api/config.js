/**
 * 请求数据的url
 */
module.exports = {
    //首页数据
    indexData: '/index/main',
    // 分类列表数据
    categoryData: '/category/indexaction',
    // 商品详情页数据
    goodsDetailData: '/goods/goodsDetail',
    // 查询列表数据
    goodsCategoryData: '/index/search',
    // 跳转商品详情页
    goodsDetail: function (value) {
        return '/pages/goods/index?id=' + value
    },
    // 跳转到商品分类列表页
    goodsCategoryList: function (value) {
        return '/pages/search/index?id=' + value
    }
}
