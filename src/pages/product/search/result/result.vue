<template>
	<view>

		<scroll-view scroll-x class="bg-white nav" style="text-align: center">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(tab,index) in cateList" :key="tab.id" @tap="tabSelect" :data-id="index">
				{{tab.name}}
			</view>
		</scroll-view>

		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="item in productList" :key="item.product_id" @click="goDetail(item)">
				<view class="uni-media-list">
					<!-- <image class="uni-media-list-logo" :src="item.image_url"></image> -->
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ item.product_name }}</view>
						<view class="uni-media-list-text-bottom">
							<text>{{ item.product_start_time }}至{{ item.product_end_time }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>	
		
	</view>
</template>

<script>
	
	import apiUrl from '@/common/apiUrl.js';
	
	export default {
		components: {
		
		},		
		data() {
			return {
				cateList: [],
				TabCur: 0,
				productList: []
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.switchTab(this.TabCur);
			},
			switchTab(index) {
				this.getList(index);
			},
			getList(index) {
				var cate_id = this.cateList[index].id;
				
				uni.request({
				    url: apiUrl.productListByCateApi + '?cate=' + cate_id,
				    method: 'GET',
				    data: {},
				    header: {},
				    success: res => {
						this.productList = res.data.product_list;
				    },
				    fail: () => {},
				    complete: () => {}
				});			
			},
			
			goDetail(e) {			
			    uni.navigateTo({
                    url: './detail?product_id=' + e.product_id
			    });		    
			}
			
		},
		onLoad() {
			
			uni.showLoading({
				title: "加载中..."
			});
			uni.request({
			    url: apiUrl.productCateListApi,
			    method: 'GET',
			    data: {},
			    success: res => {
			        console.log(res);
					this.cateList = res.data.product_cate_list;
			        uni.hideLoading();				
					
					this.getList(0);
			    },
			    fail: () => {
			    },
			    complete: () => {
			    }
			});

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
