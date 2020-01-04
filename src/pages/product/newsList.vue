<template>
	
	<view class="uni-list">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="newsitem in newsListHot" :key="newsitem.financial_news_id" @click="goDetail(newsitem)">
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
	
</template>

<script>
	
	import apiUrl from '../../common/apiUrl.js';
	
	export default {
		components: {
		
		},		
		data() {
			return {
				newsListHot: []
			}
		},
		methods: {
			goDetail(e) {
				
			    uni.navigateTo({
			        url: '../information/detail?news_id=' + e.financial_news_id
			    });
			    
			}
			
		},
		onLoad() {
			
			uni.showLoading({
				title: "加载中..."
			});
			uni.request({
				url: apiUrl.docListHotApi + '?limit=20',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data);
					this.newsListHot = res.data.news_list;
					uni.hideLoading();
				},
				fail: () => {},
				complete: () => {}
			});
			
		}
		
	}
</script>

<style>
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
