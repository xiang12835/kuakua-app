<template>
    <view class="cnt">
        <view class="cnt">
           
			<!-- <uni-section title="宣传品发放记录" type="line"></uni-section> -->
			
			<uni-list>
				<view v-for="item in items" :key="item.record_id">
					<uni-list-item :show-arrow="true" :title="item.promo_name" :note="item.update_time" @tap="toDetail(item)" />
				</view>
				<!-- 
				<uni-list-item :show-arrow="false" title="列表文字" />
				<uni-list-item :show-arrow="false" title="列表文字" note="列表描述信息" />
				<uni-list-item :disabled="true" :show-arrow="false" title="列表禁用状态" />
				-->
			</uni-list>
			
			
        </view>
    </view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section'
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';

	import apiUrl from '../../common/apiUrl.js';
	import service from '../../service.js';
	
    export default {
		components: {
			uniSection,
			uniList,
			uniListItem
		},
        data() {
            return {
				
				items: [],

            }
        },
        onLoad(e) {
			
			var userId = service.getUserId();
			var params = '?user_id=' + userId;
			

            uni.showLoading({
                title: "加载中..."
            })
            uni.request({
                url: apiUrl.promoteRecordListApi + params,
                method: 'GET',
                data: {},
                header: {},
                success: res => {
                    console.log(res);
                    this.items = res.data.promote_record_list;
                    uni.hideLoading();
                },
                fail: () => {},
                complete: () => {}
            });


        },
        methods: {
			
			toDetail(e) {
				
			    uni.navigateTo({
			        url: './detail?record_id=' + e.record_id,
			    });
			},
			

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
	
    
</style>
