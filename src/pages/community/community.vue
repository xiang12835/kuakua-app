<template>
	<view class="warp">
		
		<view class="example-body">
			<uni-grid :column="3" :show-border="false" :square="false" @change="change">
				<uni-grid-item :hor="35" :ver="-45" marker="badge" type="error" text="">
					<image class="grid-image" src="../../static/notice.png" mode="aspectFill" />
					<text class="text">公告</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="grid-image" src="../../static/forum.png" mode="aspectFill" />
					<text class="text">论坛</text>
				</uni-grid-item>
				<uni-grid-item :hor="40" :ver="-55" :img-width="30" marker="image" src="">
					<image class="grid-image" src="../../static/survey.png" mode="aspectFill" />
					<text class="text">调研</text>
				</uni-grid-item>
				
			</uni-grid>
		</view>
		
		
			
		<view v-for="item in forum_list" :key="item.forum_id" class="example-box">
			<uni-card :title="item.user_info.nickname" :is-shadow="true" note="Tips" extra="热度 90" :thumbnail="item.user_info.image_url" @click="clickCard(item)">
			
				<view class="content-box">
					{{ item.forum_title }}
				</view>
				
				<view class="time-box">
					{{ item.create_time }}
				</view>
				
				<view class="cate-box">
					# {{ item.forum_topic_str }}
				</view>
				
				<template v-slot:footer>
					<view class="footer-box">
						<view class="footer-box__item" @click.stop="footerClick('喜欢')"><text> 喜欢 9</text></view>
						<view class="footer-box__item" @click.stop="footerClick('评论')"><text> 评论 4</text></view>
						<view class="footer-box__item" @click.stop="footerClick('收藏')"><text> 收藏</text></view>
					</view>
				</template>
			
			</uni-card>
			
			
			
		</view>
		
		
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		
		
		<!-- <view v-for="item in list" :key="item.id" class="example-box">
			<uni-card :is-shadow="true" :title="item.title" mode="title" :thumbnail="item.thumbnail" :extra="item.extra" note="true" @click="clickCard">
			
				<view class="content-box">
					{{ item.content }}
				</view>
				
				<view class="time-box">
					{{ item.createTime }}
				</view>
				
				<view class="cate-box">
					# {{ item.categoryStr }}
				</view>
				
				
				<template v-slot:footer>
					<view class="footer-box">
						<view class="footer-box__item" @click.stop="footerClick('喜欢')"><text> 喜欢 5</text></view>
						<view class="footer-box__item" @click.stop="footerClick('评论')"><text> 评论 9</text></view>
						<view class="footer-box__item" @click.stop="footerClick('收藏')"><text> 收藏</text></view>
					</view>
				</template>
			
			</uni-card>
			
		</view>	 -->
			
			
			
			
			
			
		
		
		
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	import apiUrl from '../../common/apiUrl.js';
	
	import {
	    mapState
	} from 'vuex'
	


	export default {
		components: {
			uniGrid,
			uniGridItem,
			uniCard
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		
		data() {
			return {
				forum_list: [],
				Tips: ['喜欢', '评论', '分享'],
				loadMoreText: "加载中...",
				showLoadMore: false,
				hasMordData: true,
				pageNum: 1,
				pageSize: 10
			}
		},

		onLoad: function (e) {
			
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
			};
			
			
			
			
			this.getForumList();
			// uni.startPullDownRefresh();
		},
		
		onPullDownRefresh() {
            this.pageNum = 1;
            this.hasMordData = true;
            this.loadMoreText = '加载中...';
			this.forum_list = [];
			this.getForumList();
			uni.stopPullDownRefresh();
		},
		
		onReachBottom() {
			console.log("onReachBottom");
			if (!this.hasMordData) {
				return;
			}
			this.showLoadMore = true;
			this.setListData();
			// setTimeout(() => {
			// 	this.setListData();
			// }, 300);
		},

		methods: {
			
			
			
			getForumList() {
				
				uni.showLoading({
					title: "加载中..."
				})

				var params = '?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
				console.log('===========');
				console.log(params);
				uni.request({
					url: apiUrl.forumListApi + params,
					method: 'GET',
					data: {},
					success: res => {
						console.log(res);
						// this.title = res.data.news_detail.financial_news_title;
						// this.create_time = res.data.news_detail.create_time;
						// this.strings = res.data.news_detail.financial_news_content;
						var moreDataList = res.data.forum_list;
				
						uni.hideLoading();

                        this.forum_list = this.forum_list.concat(moreDataList);

                        if (moreDataList.length < this.pageSize) {
                            this.hasMordData = false;
                            this.loadMoreText = "没有更多数据了!"
                        }

                        console.log("##########");
                        console.log(this.forum_list);



					},
					fail: () => {
					},
					complete: () => {
					}
				});
				
			},


			setListData() {
				
				this.pageNum += 1;
				this.getForumList();
				
			},
			
			
			
			
			toForumDetail(e) {
				console.log("====================");
				console.log(e);
				uni.navigateTo({
					url: '../forum/detail?forum_id=' + e.forum_id
				});
			},
			
			clickCard(e) {
				// uni.showToast({
				// 	title: '点击卡片',
				// 	icon: 'none'
				// })
				this.toForumDetail(e);
				
			},
			footerClick(types) {
				uni.showToast({
					title: types,
					icon: 'none'
				})
			},
			change(e) {
				console.log(e);
				
				let {
					index
				} = e.detail
				console.log(index);
				
				if (index == 0) {
					uni.navigateTo({
						url: '../announcement/announcement'
					});
				}

				if (index == 1) {
					uni.navigateTo({
						url: '../forum/forum'
					});
				}
				
				if (index == 2) {
					uni.navigateTo({
						url: '../survey/survey'
					});
				}
				

			}
		}
		
	}
</script>

<style>
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

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}


	.example-title:after {
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

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 30upx;
		background: #fff
	}
	
	.example-box {
		margin-bottom: 30upx;
	}
	
	.example-box:last-child {
		margin-bottom: 0;
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}
	
	.grid-image {
		width: 100upx;
		height: 100upx;
	}

	.text {
		font-size: 26upx;
		margin-top: 10upx;
	}
	
	/* card */
	.example-body {
		padding: 30upx;
		background: #fff
	}
	
	.content-box {
		padding-top: 20upx;
	}
	
	.footer-box {
		display: flex;
		justify-content: space-between;
		width: 100%;
	
	}
	
	.footer-box__item {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.footer-box__item:nth-child(2) {
		justify-content: center;
	}
	
	.footer-box__item:last-child {
		justify-content: flex-end;
	}
	
	
</style>