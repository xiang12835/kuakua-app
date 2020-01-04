<template>
    <view class="cnt">
		<view class="uni-padding-wrap uni-common-mt">
			<view class="card" v-for="item in items" :key="item.promo_id">
				<view class="text" @tap="toAmountAdd" :data-promo_id="item.promo_id">{{item.promo_name}}</view>
			</view>
			<!-- <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view> -->
		</view>
	</view>
</template>

<script>
	
	import apiUrl from '../../common/apiUrl.js';
	
	export default {
		data() {
			return {
				title: '下拉刷新 + 加载更多',
				items: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
				max: 0
			}
		},
		onLoad() {
			// this.initData();
			
			uni.showLoading({
			    title: "加载中..."
			})
			uni.request({
			    url: apiUrl.promoteListApi,
			    method: 'GET',
			    data: {},
			    header: {},
			    success: res => {
			        console.log(res);
			        this.items = res.data.promote_list;
			        uni.hideLoading();
			    },
			    fail: () => {},
			    complete: () => {}
			});
			
		},
		onUnload() {
			this.max = 0,
			this.data = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		onReachBottom() {
			console.log("onReachBottom");
			if (this.max > 40) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}
			this.showLoadMore = true;
			setTimeout(() => {
				this.setListData();
			}, 300);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.initData();
		},
		methods: {
			
			toAmountAdd(e) {			
			    uni.navigateTo({
			        url: './amount_add?promo_id=' + e.currentTarget.dataset.promo_id,
			    });
			},
			
			
			
			
			
			
			
			
			initData(){
				setTimeout(() => {
					this.max = 0;
					this.data = [];
					let data = [];
					this.max += 10;
					for (var i = this.max - 9; i < this.max + 1; i++) {
						data.push(i)
					}
					this.data = this.data.concat(data);
					uni.stopPullDownRefresh();
				}, 300);
			},
			setListData() {
				let data = [];
				this.max += 10;
				for (var i = this.max - 9; i < this.max + 1; i++) {
					data.push(i)
				}
				this.data = this.data.concat(data);
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
	
	.card {
		margin: 16upx 0;
		width:100%;
		background-color: #fff;
		height: 120upx;
		line-height: 120upx;
		/* text-align: center; */
		color: #555;
		border-radius: 8upx;
	}
	
	.text {
		margin-left: 16upx;
	}
	
    
</style>
