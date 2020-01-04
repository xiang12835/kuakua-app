<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(tab,index) in cateList" :key="tab.id" @tap="tabSelect" :data-id="index">
					{{tab.name}}
				</view>
			</view>
		</scroll-view>
		
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="item in docList" :key="item.financial_news_id" @click="goDetail(item)">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="item.image_url"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ item.title }}</view>
						<view class="uni-media-list-text-bottom">
							<text>{{ item.source }}</text>
							<text>{{ item.create_time }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		
	</view>
</template>

<script>
	
	import apiUrl from '../../common/apiUrl.js';
	
	export default {
		components: {
		
		},		
		data() {
			return {
				cateList: [],
				TabCur: 0,
				docList: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
				hasMordData: true,
				pageNum: 1,
				pageSize: 10
			}
		},
		
		onPullDownRefresh() {
		    this.pageNum = 1;
		    this.hasMordData = true;
		    this.loadMoreText = '加载中...';
			this.docList = [];
			this.getList(this.TabCur);
			uni.stopPullDownRefresh();
		},

		onReachBottom() {
			console.log("onReachBottom");
			if (!this.hasMordData) {
				return;
			}
			this.showLoadMore = true;
			this.setListData(this.TabCur);
			// setTimeout(() => {
			// 	this.setListData();
			// }, 300);
		},
		
		methods: {
			onLoad: function(e) {
			
				this.getCateList();
			// uni.startPullDownRefresh();
			
			},
			
			getCateList() {
			
				uni.showLoading({
				    title: "加载中..."
				})
				uni.request({
				    url: apiUrl.docCateListApi,
				    method: 'GET',
				    data: {},
				    header: {},
				    success: res => {
						console.log(res);
						this.cateList = res.data.doc_cate_list
						uni.hideLoading();				
						this.getList(0);
				    },
				    fail: () => {},
				    complete: () => {}
				});
			
			},
			
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.switchTab(this.TabCur);
			},
			switchTab(index) {
				this.pageNum = 1;
				this.hasMordData = true;
				this.docList = [];
				this.loadMoreText = '加载中...';
				this.getList(index);
			},
			setListData(index) {
				this.pageNum += 1;
				this.getList(index);	
			},
			getList(index) {
				var cate_id = this.cateList[index].id;
				var params = '?cate=' + cate_id + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
				
				uni.showLoading({
				    title: "加载中..."
				})
				uni.request({
				    url: apiUrl.docListByCateApi + params,
				    method: 'GET',
				    data: {},
				    header: {},
				    success: res => {
						console.log(res);
						var moreDataList = res.data.doc_list;	
						uni.hideLoading();
						this.docList = this.docList.concat(moreDataList);
						if (moreDataList.length < this.pageSize) {
						    this.hasMordData = false;
						    this.loadMoreText = "没有更多数据了!"
						}
						
						console.log("##########");
						console.log(this.docList);
				    },
				    fail: () => {},
				    complete: () => {}
				});			
			},
			
			goDetail(e) {			
			    uni.navigateTo({
			        url: '../information/detail?news_id=' + e.financial_news_id
			    });		    
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
