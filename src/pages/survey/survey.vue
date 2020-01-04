<template>
	<view class="page">
		<uni-collapse :accordion="true">
			<uni-collapse-item v-for="item in surveyList" :key="item.survey_id" :title="item.survey_title" :show-animation="item.animation">
				<view class="content" @tap="surveyDetail" :data-survey_id="item.survey_id">{{ item.survey_content }}</view>
			</uni-collapse-item>
		</uni-collapse>

	</view>
</template>

<script>
	
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import apiUrl from '../../common/apiUrl.js'; 
	
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
			
		},
		data() {
			return {

				surveyList: [],

			}
		},
		methods: {
			
			surveyDetail(e) {
				console.log(e);
				var survey_id = e.currentTarget.dataset.survey_id;
				console.log(survey_id);
				uni.navigateTo({
					url: './detail?survey_id=' + survey_id,
				});
			}
		},
		onLoad: function() {
			uni.showLoading({
				title: "加载中..."
			})
			uni.request({
				url: apiUrl.surveyListApi,
				method: 'GET',
				data: {},
				success: res => {
					this.surveyList = res.data.survey_list;
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

	
</style>
