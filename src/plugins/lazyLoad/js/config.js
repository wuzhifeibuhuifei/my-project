import lazyLoad from './lazyLoad'

lazyLoad.setConfig({
    loading: {
        type: 'component',
        name: 'loading-1'
    },
    // loading: {
    //     type: 'img',
    //     path: '/static/loading.png'
    // },
    // error: {  // 加载错误的替代图片
    //     type: 'img',
    //     path: '/static/error_1.png'
    // },
    error: {
        type: 'component',
        name: 'error-1'
    },
    preLoadNum: 100, // 预加载图片,单位 px
    intervalTime: 200, // 图片加载间隔(停顿)时间，单位 ms
    minLoadAnimeTime: 300, // 最少过度动画时间，单位 ms
    throttleTime: 100 // 节流时间, 单位 ms
})