<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
			 @clickItem="onClickItem" />
			 
			 
			 
			 <view class="content">
			 	<view v-show="current === 0">
			 		<view class="uni-list">
			 			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in itemList0" :key="index" @tap="toItemDetail"
			 			 :data-item_id="item.activity_id">
			 				<view class="uni-media-list">
			 					<image class="uni-media-list-logo" :src="item.image"></image>
			 					<view class="uni-media-list-body">
			 						<view class="uni-media-list-text-top">{{item.title}}</view>
			 						<view class="uni-media-list-text-bottom uni-ellipsis">{{item.create_time}}</view>
			 					</view>
			 				</view>
			 			</view>
			 		</view>
			 	</view>
			 	<view v-show="current === 1">
					<view class="uni-list">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in itemList1" :key="index" @tap="toItemDetail"
						 :data-item_id="item.activity_id">
							<view class="uni-media-list">
								<image class="uni-media-list-logo" :src="item.image"></image>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top">{{item.title}}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">{{item.create_time}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			 </view>
			 
			 
		</view>
		
		
		
		


	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
	import apiUrl from '../../common/apiUrl.js'; 
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: ['进行中', '已结束'],
				styles: [{
						value: 'button',
						text: '按钮',
						checked: true
					},
					{
						value: 'text',
						text: '文字'
					}
				],
				colors: ['#007aff', '#4cd964', '#dd524d'],
				current: 0,
				colorIndex: 0,
				activeColor: '#0faeff',
				styleType: 'button',
				itemList0: [],
				itemList1: []
			}
		},
		methods: {
			onClickItem(index) {
				console.log(index);
				if (this.current !== index) {
					this.current = index
				}
			},
			toItemDetail(e) {
				console.log(e);
				var item_id = e.currentTarget.dataset.item_id;
				console.log(item_id);
				uni.navigateTo({
					url: './detail?activity_id=' + item_id,
				});
			}
		},
		onLoad: function() {
			uni.showLoading({
				title: "加载中..."
			});
			uni.request({
				url: apiUrl.activityListApi + '?status=0',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data);
					this.itemList0 = res.data.activity_list;
					uni.hideLoading();
				},
				fail: () => {},
				complete: () => {}
			});
			
			uni.request({
				url: apiUrl.activityListApi + '?status=1',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data);
					this.itemList1 = res.data.activity_list;
					uni.hideLoading();
				},
				fail: () => {},
				complete: () => {}
			});
		},
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
	
	.uni-padding-wrap{
		width:100%;
		padding:0 5upx;
	}
	
	.uni-common-mt {
		margin-top: 20upx;
		margin-bottom: 10upx;
	}

	.uni-media-list-body {
		height: auto;
	}

	.uni-media-list-text-top {
		line-height: 1.6em;
	}
</style>
