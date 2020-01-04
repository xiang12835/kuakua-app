<template>
	<view class="page">
		<swiper indicator-dots="true" :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(img, key) in imgUrls" :key="key"><image :src="img.image" @tap="toItemDetail(img)"/></swiper-item>
		</swiper>
		
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2" @tap='toPromote(item)'>
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		
		
		
		
		<view class="uni-padding-wrap uni-common-mt">
			<!-- 
			<view class="card" v-for="item in newsListHot" :key="item.promo_id">
				<view class="text" @tap="toAmountAdd" :data-promo_id="item.promo_id">{{item.promo_name}}</view>
			</view> 
			-->
			<!-- <uni-section title="精选文案" type="line"></uni-section> -->
			
			<view class="card-title">
			    <view>精选文案</view>
			    <view @tap="toDocList">更多 ></view>
			</view>
				
			<!-- <view class="card-item" v-for="newsitem in newsListHot" :key="newsitem.financial_news_id">
				<media-item :options="newsitem" @click="goDetail(newsitem)"></media-item>
			</view> -->
			
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="newsitem in hotDocList" :key="newsitem.financial_news_id" @click="goDetail(newsitem)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="newsitem.image_url"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ newsitem.title }}</view>
							<view class="uni-media-list-text-bottom">
								<text>{{ newsitem.source }}</text>
								<text>{{ newsitem.create_time }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
					
		
		<view style="height: 1000upx;"></view>
	</view>
</template>

<script>

	import uniSection from '@/components/uni-section/uni-section'
    import mediaItem from './news-item.vue';
	import apiUrl from '../../common/apiUrl.js';




	import {
	    mapState
	} from 'vuex'
	
	
	
export default {
	components: {
	    mediaItem,
		// uniSection
	},
	
	
	computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
	onLoad() {	

		uni.showLoading({
			title: "加载中..."
		});
		uni.request({
			url: apiUrl.productSwiperListApi,
			method: 'GET',
			data: {},
			success: res => {
				console.log(res.data);
				this.imgUrls = res.data.list;
				uni.hideLoading();
			},
			fail: () => {},
			complete: () => {}
		});
		
		uni.showLoading({
			title: "加载中..."
		});
		uni.request({

			url: apiUrl.docListHotApi + '?limit=5',
			method: 'GET',
			data: {},
			success: res => {
				console.log(res.data);
				this.hotDocList = res.data.news_list;
				uni.hideLoading();
			},
			fail: () => {},
			complete: () => {}
		});

		// if (!this.hasLogin) {}
		
	    if (!this.hasLogin) {
	        uni.showModal({
	            title: '未登录',
	            content: '您未登录，需要登录后才能继续',
				showCancel: false,
	            /**
	             * 如果需要强制登录，不显示取消按钮
	             */
	            // showCancel: !this.forcedLogin,
	            success: (res) => {
	                if (res.confirm) {
						/**
						 * 如果需要强制登录，使用reLaunch方式
						 */
	                    if (this.forcedLogin) {
	                        uni.reLaunch({
	                            url: '../login/login'
	                        });
	                    } else {
	                        // uni.navigateTo({
	                        //     url: '../login/login'
	                        // });
							uni.reLaunch({
							    url: '../login/login'
							});
	                    }
	                }
	            }
	        });
	    }



	},
	
	data() {
		return {
			hotDocList: [],
			showSwiper: false,
			imgUrls: [
				'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
				'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
				'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
			],
			
			cuIconList: [{
				id: 1,
				cuIcon: 'cardboardfill',
				color: 'red',
				badge: 0,
				name: '宣传品'
			}, {
				id: 2,
				cuIcon: 'recordfill',
				color: 'orange',
				badge: 0,
				name: '记录'
			}, {
				id: 3,
				cuIcon: 'clothesfill',
				color: 'blue',
				badge: 0,
				name: '活动'
			}, {
				id: 4,
				cuIcon: 'picfill',
				color: 'yellow',
				badge: 0,
				name: '产品'
			}, {
				id: 5,
				cuIcon: 'noticefill',
				color: 'olive',
				badge: 6,
				name: '通知'
			}, {
				id: 6,
				cuIcon: 'upstagefill',
				color: 'cyan',
				badge: 0,
				name: '排行榜'
			}, {
				id: 7,
				cuIcon: 'discoverfill',
				color: 'purple',
				badge: 0,
				name: '发现'
			}, {
				id: 8,
				cuIcon: 'questionfill',
				color: 'mauve',
				badge: 0,
				name: '帮助'
			}, {
				id: 9,
				cuIcon: 'commandfill',
				color: 'purple',
				badge: 0,
				name: '问答'
			}, {
				id: 10,
				cuIcon: 'brandfill',
				color: 'mauve',
				badge: 0,
				name: '版权'
			}],
			modalName: null,
			gridCol: 4,
			gridBorder: false,
			skin: false,
			listTouchStart: 0,
			listTouchDirection: null,
			
			
			
			
			
			
		};
	},
	/**
	 * 当 searchInput 配置 disabled 为 true 时触发
	 */
	onNavigationBarSearchInputClicked(e) {
		console.log('事件执行了')
		uni.navigateTo({
			url: '/pages/product/search/search'
		});
	},
	/**
	 *  点击导航栏 buttons 时触发
	 */
	onNavigationBarButtonTap() {
		uni.showModal({
			title: '提示',
			content: '用户点击了功能按钮，这里仅做展示。',
			success: res => {
				if (res.confirm) {
					console.log('用户点击了确定');
				}
			}
		});
	},
	
	methods: {
		
		toDocList(e) {
		    uni.navigateTo({
		        url: './docList'
		    });
		},
		
		goDetail(e) {
			
		    uni.navigateTo({
		        url: '../information/detail?news_id=' + e.financial_news_id
		    });
		    
		},


		toItemDetail(e) {
			uni.navigateTo({
				url: './swiper_detail?item_id=' + e.id,
			});
		},
		
		
		
		toPromote(e) {
			
			if (e.id === 1) {
				uni.navigateTo({
					url: '../promote/promote'
				});
			} else if (e.id === 2) {
				uni.navigateTo({
					url: '../record/record'
				});
			} else if (e.id === 3) {
				uni.navigateTo({
					url: '../activity/activity'
				});
			} else if (e.id === 4) {
				uni.navigateTo({
					url: '../product/search/result/result'
				});
			} else if (e.id === 5) {
				uni.showToast({
					title: '通知',
					icon: 'none'
				})
			} else if (e.id === 6) {
				uni.showToast({
					title: '排行榜',
					icon: 'none'
				})
			} else if (e.id === 7) {
				uni.showToast({
					title: '发现',
					icon: 'none'
				})
			} else if (e.id === 8) {
				uni.showToast({
					title: '帮助',
					icon: 'none'
				})
			} 
			
		},
		
		
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target
		},
		hideModal(e) {
			this.modalName = null
		},
		
		
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX
		},
		
		// ListTouch计算方向
		ListTouchMove(e) {
			this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
		},
		
		// ListTouch计算滚动
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.modalName = e.currentTarget.dataset.target
			} else {
				this.modalName = null
			}
			this.listTouchDirection = null
		}
	}
};
</script>

<style>
	image,
	swiper,
	.img-view {
		width: 750upx;
		height: 500upx;
	}
	.page-section-title {
		margin-top: 50upx;
	}

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}
	
	
	.page {
		height: 100Vh;
		width: 100vw;
	}
	
	.page.show {
		overflow: hidden;
	}
	
	.switch-sex::after {
		content: "\e716";
	}
	
	.switch-sex::before {
		content: "\e7a9";
	}
	
	.switch-music::after {
		content: "\e66a";
	}
	
	.switch-music::before {
		content: "\e6db";
	}
	
	
	
	
	
	.card-title {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    font-size: 32upx;
	    color: #464e52;
	    padding: 30upx 30upx 30upx 50upx;
	    margin-top: 20upx;
	    position: relative;
	    background-color: #fdfdfd;
	    /* border-bottom: 1px #f5f5f5 solid;
		border-radius: 8upx; */
	}
	
	.card-item {
	    flex: 1;
	    flex-direction: row;
		background-color: #fdfdfd;
		/* border-bottom: 1px #f5f5f5 solid */
		
	}
	
	.card-title__after {
	    position: relative;
	    color: #031e3c
	}
	
	.card-title:after {
	    content: '';
	    position: absolute;
	    left: 30upx;
	    margin: auto;
	    top: 0;
	    bottom: 0;
	    width: 6upx;
	    height: 32upx;
	    background-color: #ccc
	}
	
	.example .card-title {
	    margin: 40upx 0
	}
	
	.example-body {
	    padding: 30upx;
	    background: #fff
	}
	
	.card {
		margin: 16upx 0;
		width:100%;
		background-color: #fff;
		height: 120upx;
		line-height: 120upx; 
		text-align: center;
		color: #555;
		border-radius: 8upx;
	}
	
	.uni-media-list-logo {
		width: 180upx;
		height: 140upx;
	}
	
	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}
	
	.uni-media-list-text-top {
		height: 74upx;
		font-size: 28upx;
		overflow: hidden;
	}
	
	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	

	
</style>
