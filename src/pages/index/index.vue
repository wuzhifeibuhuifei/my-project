<template>
	<div class="index">
		<div class="header"><div class="search" @click="toSearch('')">
			<div class="ser">
				<span class="icon"></span>
				<span>搜索,共239款好物</span>
			</div>
		</div>
		<div class="notice" @click="showKefu">
			<!--<span>客服</span>-->
			<img src="/static/images/robot.png"/>
		</div>
		<!-- 这里做一个tab页 -->
		<div class="channel">
			<ul>
				<li id="home" @click="qh($event)">
					<span :class="{active:isActive=='home'}">首页</span>
				</li>
				<li id="menu" @click="qh($event)" :class="active">
					<span :class="{active:isActive=='menu'}">分类</span>
				</li>
			</ul>
		</div>
		<div class="content-head"></div>
		</div>
		<keep-alive>
			<div v-show="isActive=='home'" class="container-content">
			<!-- 爆品热销 -->
			<div class="brand">
				<div class="head">爆品热销</div>
				<div class="content" v-if="brandList.length!=0">
				<!-- <div class="content" v-if="false">-->
					<div @click="goodsDetail(item.id)" v-for="(item, index) in brandList" :key="index">
						<!-- <div><p>{{item.floor_price}}元</p></div>-->
					<div class="cont-img">
						<img :src="item.list_pic_url" alt>

					</div>
					<p> {{item.name}} </p>
					<p>￥ {{item.retail_price}} </p>
					</div>
				</div>
				<!--<div class="content" v-else>
					<div class="content-top">
						<p>商品正在加载中……</p>
					</div>
				</div>-->
			</div>

			<!-- 店主推荐 -->
			<div class="newgoods">
				<div class="head">店主推荐</div>
				<div class="list" v-if="newGoods.length!=0">

				<!-- <div class="list" v-if="false">-->
					<ul>
						<scroll-view class="scroll-view" :scroll-x="true">
							<li @click="goodsDetail(item.id)" v-for="(item, index) in newGoods" :key="index">
								<img :src="item.list_pic_url" alt><p> {{item.name}}</p>
								<p v-if="item.goods_brief">{{item.goods_brief}}</p>
								<p v-else><p>
								<p>￥ {{item.retail_price}}</p>
							</li></scroll-view>
					</ul>
				</div>
				<!--<div class="default-list" v-else>
					<div>
						<p>商品正在加载中……</p>
					</div>
				</div>-->
			</div>

			<!-- 好物精选 -->
			<div class="newcategory">
				<div class="list" v-for="(item, index) in newCategoryList" :key="index">
					<div class="head"> {{item.name}}精选</div>
					<div class="sublist">
						<div @click="goodsDetail(subitem.id)" v-for="(subitem, subindex) in item.goodsList" :key="subindex">
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
			</div>
			<div v-show="isActive=='menu'" class="container-content">
				<div class="category">
					<div class="content">
						<scroll-view class="left" scroll-y="true">
							<div class="iconText" @click="selectitem(item,index)" v-for="(item, index) in listData" :class="[index==nowIndex?'active':'']" :key="index"> {{item.name}}

							</div>
						</scroll-view>
						<scroll-view class="right" scroll-y="true">
							<div class="title">
								<span>—</span>
								<span> {{categoryTitle}}分类</span>
								<span>—</span>
							</div>
							<div class="bottom">
								<div @click="toSearch(item.geshow_id)" v-for="(item,index) in categoryTwoList" :key="index" class="item">
								<!-- <img :src="item.wap_banner_url" alt="">-->
									<span> {{item.name}}</span>
								</div>
							</div>
						</scroll-view>
					</div>
				</div>
			</div>
		</keep-alive>

		<!--弹窗-->
		<div class="modal-mask" @click="onConfirm()" catchtouchmove="preventTouchMove" v-if="kefuShow"></div>
		<div class="modal-dialog" v-if="kefuShow">

		<!-- <div class="modal-title">温馨提示</div>-->
		<div class="modal-content">
			<div class="modal-input">
				<span style="font-size:32rpx;font-weight:bold;height:77rpx;line-height:77rpx;">长按保存二维码后，微信识别</span>
				<div style="width:100%; text-align: center;margin: 10rpx 0 10rpx 10rpx;">
					<div style="width: 50%;float: left;">
						<img style="width: 200rpx;height: 200rpx;float: left;margin: 10rpx 0 10rpx 10rpx;" src="/static/images/kefu1.png" @longpress="clickLong1">
							<div style="float: left;text-align: center;">
								<p style="font-size:25rpx;color:#ba3537;">客服1号：ShirleyLJS</p>
								<p style="font-size:25rpx;color:#ba3537;">零售或一件代发</p>
							</div>
					</div>
					<div style="width: 50%;float: left;">
						<img style="width: 200rpx;height: 200rpx;float: right;margin: 10rpx 24rpx 10rpx 10rpx;" src="'baseUrl' + static/images/linfei_wechat(1).png" @longpress="clickLong2">
							<div style="float: left;text-align: center;">
								<p style="font-size:25rpx;color:#ba3537;">客服2号：Fairylin91</p>
								<p style="font-size:25rpx;color:#ba3537;">批发或代理</p>
							</div>
					</div>
				</div>
				<div style="clear: both;">

				</div>

				<!--<div style="height: 200rpx;"><p style="font-size: 30rpx; color: red;">欢迎加客服微信咨询或者购买</p><button class="save-btn" @click="saveImage()">保存图片</button></div>-->
			</div>
		</div>
		<div class="modal-footer">
			<!-- <view class="btn-cancel" bindtap="onCancel" data-status="cancel">取消</view>-->
			<div class="btn-confirm" @click="onConfirm()" data-status="confirm">确定</div>
		</div>
		</div>
	</div>
</template>
<script>
//import amapFile from "../../utils/amap-wx ";
import {get, baseUrl} from "../../utils";
import {mapState, mapMutations} from "vuex";
import {
    toLogin
  } from '../../utils';
export default {
	onShow() {
		// 获取首页数据
		this.getData();
		//获取菜单列表数据
		this.getListData();
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
		};
	},
	components: {},
	methods: {
		...mapMutations(["update"]),
		toMappage() {
			var _this = this;
			// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
			// wx.getSetting({
			//   success(res) {
			//     //如果没有同意授权,打开设置
			//     if (!res.authSetting["scope.userLocation"]) {
			//       wx.openSetting({
			//         success: res => {
			//           _this.getCityName();
			//         }
			//       });
			//     } else {
			//       wx.navigateTo({
			//         url: "/pages/mappage/main"
			//       });
			//     }
			//   }
			// });
		},
		getCityName() {
			var _this = this;
			// var myAmapFun = new amapFile.AMapWX({
			//   key: "e545e7f79a643f23aef187add14e4548"
			// });
			// myAmapFun.getRegeo({
			//   success: function (data) {
			//     //成功回调
			//     console.log(data);
			//     // data[0].regeocodeData.formatted_address
			//     // _this.cityName = data[0].regeocodeData.formatted_address;
			//     _this.update({ cityName: data[0].regeocodeData.formatted_address });
			//   },
			//   fail: function (info) {
			//     //失败回调
			//     console.log(info);
			//     //如果用户拒绝授权
			//     // 默认为北京
			//     _this.cityName = "北京市";
			//     _this.update({ cityName: "北京市" });
			//   }
			// });
			_this.cityName = "北京市";
		},
		toSearch(categoryId) {
			console.log(categoryId);
			wx.navigateTo({
				url: "/pages/search/main?categoryId=" + categoryId
			});
		},
		async getData() {
			const data = await get("/index/main");
			this.banner = data.banner;
			this.channel = data.channel;
			// 爆品
			this.brandList = data.brandList;
			// 店主推荐
			this.newGoods = data.newGoods;
			this.hotGoods = data.hotGoods;
			this.topicList = data.topicList;
			// 好物精选
			this.newCategoryList = data.newCategoryList;
			console.log(this.newCategoryList);
		},
		goodsDetail(id) {
			wx.navigateTo({
				url: "/pages/goods/main?id=" + id
			});
		},
		categoryList(id) {
			wx.navigateTo({
				url: "/pages/categorylist/main?id=" + id
			});
		},
		goodsList(info) {
			if(info == "hot") {
				wx.navigateTo({
					url: "/pages/newgoods/main?isHot=" + 1
				});
			} else {
				wx.navigateTo({
					url: "/pages/newgoods/main?isNew=" + 1
				});
			}
		},
		topicdetail(id) {
			wx.navigateTo({
				url: "/pages/topicdetail/main?id=" + id
			});
		},
		totopic() {
			wx.navigateTo({
				url: "/pages/topic/main"
			});
		},
		tobrandList() {
			wx.navigateTo({
				url: "/pages/brandlist/main"
			});
		},
		branddetail(id) {
			wx.navigateTo({
				url: "/pages/branddetail/main?id=" + id
			});
		},
		qh(e) {
			var _this = this;
			_this.isActive = e.currentTarget.id;
		},
		async selectitem(item, index) {
			var _this = this;
			_this.nowIndex = index;
			_this.categoryTwoList = item.categoryList;
			_this.categoryTitle = item.name;
			// this.$forceUpdate();
			// this.nowIndex = index;
			// const data = await get("/goods/goodsList", {
			//    categoryId: id
			// });
			// this.detailData = data;
		},
		async getListData() {
			var _this = this;
			const data = await get("/category/indexaction");
			// 给默认值
			if(data != null && data.length > 0) {
				_this.categoryTwoList = data[0].categoryList;
				_this.categoryTitle = data[0].name;
				_this.listData = data;
			}
		},
		showKefu() {
			this.kefuShow = true;
		},
		onConfirm() {
			this.kefuShow = false;
		},
		clickLong1() {
			var imgSrc = "/static/images/kefu1.png";
			if (toLogin()) {
				wx.saveImageToPhotosAlbum({
					filePath: imgSrc,
					success: function(data) {
						console.log(data);
					},
					fail: function(err) {
						if(err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
							wx.getSetting({
								success(settingdata) {
									if(!settingdata.authSetting['scope.writePhotosAlbum']) {
										wx.showModal({
											title: '是否允许保存图片',
											content: '需要保存图片，请确认授权，否则图片将无法保存',
											success: function(tip) {
												if(tip.confirm) {
													wx.openSetting({
														success: function(data) {
															if(data.authSetting["scope.writePhotosAlbum"]) {
																wx.showToast({
																	title: '授权成功',
																	icon: 'success',
																	duration: 1000
																}) //授权成功之后，再调用chooseLocation选择地方
																wx.saveImageToPhotosAlbum({
																	filePath: imgSrc,
																	success: function(data) {
																		console.log(data);
																	},
																	fail: function(err) {}
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
					success: function(data) {
						console.log(data);
					},
					fail: function(err) {
						if(err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
							wx.getSetting({
								success(settingdata) {
									if(!settingdata.authSetting['scope.writePhotosAlbum']) {
										wx.showModal({
											title: '是否允许保存图片',
											content: '需要保存图片，请确认授权，否则图片将无法保存',
											success: function(res) {
												if(res.confirm) {
													wx.openSetting({
														success: function(data) {
															if(data.authSetting["scope.writePhotosAlbum"]) {
																wx.showToast({
																	title: '授权成功',
																	icon: 'success',
																	duration: 1000
																}) //授权成功之后，再调用chooseLocation选择地方
																wx.saveImageToPhotosAlbum({
																	filePath: imgSrc,
																	success: function(data) {
																		console.log(data);
																	},
																	fail: function(err) {}
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
											fail: function(res) {
												console.log('fail');
											},
											complete: function(res) {
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
