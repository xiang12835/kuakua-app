<template>

    <!--

    <view>
        <ol>
            <li v-for="item in noticeList">
                {{ item.announcement_id }}
            </li>
        </ol>
    </view>

    -->

    <view class="content">
        <view class="uni-list">
            <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item1,index1) in unReadList" :key="index1" @tap="toAnnouncementDetail"
                  :data-announcement_id="item1.announcement_id">
                <view class="uni-media-list">
                    <!-- <image class="uni-media-list-logo" :src="item.author_avatar"></image> -->
                    <view class="uni-media-list-body">
                        <view class="uni-media-list-text-top cuIcon-title text-blue">{{item1.announcement_name}}</view>
                        <view class="uni-media-list-text-bottom uni-ellipsis">{{item1.create_time}}</view>
						<!-- <view class='cu-tag badge'>!</view> -->
                    </view>
                </view>
            </view>
			
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item2,index2) in hasReadList" :key="index2" @tap="toAnnouncementDetail"
			      :data-announcement_id="item2.announcement_id">
			    <view class="uni-media-list">
			        <!-- <image class="uni-media-list-logo" :src="item.author_avatar"></image> -->
			        <view class="uni-media-list-body">
			            <view class="uni-media-list-text-top">{{item2.announcement_name}}</view>
			            <view class="uni-media-list-text-bottom uni-ellipsis">{{item2.create_time}}</view>
						<!-- <view class='cu-tag badge'>!</view> -->
			        </view>
			    </view>
			</view>
        </view>
    </view>


</template>

<script>

    import apiUrl from '../../common/apiUrl.js';
	import service from '../../service.js';
	


    export default {
        components: {

        },
        data() {
            return {
                // announcementList: [],
				type:'',
				unReadList: [],
				hasReadList: [],
				userId: '',
				loadMoreText: "加载中...",
				hasMordData: true
            }
        },
		
		onPullDownRefresh() {
		    // this.pageNum = 1;
		    this.hasMordData = true;
		    this.loadMoreText = '加载中...';
			this.unReadList = [];
			this.hasReadList = [];
			
			this.getAnnouncementList();
			
			uni.stopPullDownRefresh();
			
			
		},
		
        methods: {
			
			getAnnouncementList(){
				uni.showLoading({
				    title: "加载中..."
				})
				uni.request({
				    url: apiUrl.announcementListApi+'?type='+this.type + '&user_id=' +service.getUserId(),
				    method: 'GET',
				    data: {},
				    header: {},
				    success: res => {
				        console.log(res);
				        console.log(res.data.announcement_list);
						console.log(res.data.unread_list);
						console.log(res.data.hasread_list);
				        // this.announcementList = res.data.announcement_list;
						this.unReadList = res.data.unread_list;
						this.hasReadList = res.data.hasread_list;
				        uni.hideLoading();
				    },
				    fail: () => {},
				    complete: () => {}
				});
			},
			
			
			
			toAnnouncementRecord(user_id, a_id){
				
				uni.showLoading({
				    title: "加载中..."
				})
				uni.request({
				    url: apiUrl.announcementRecordApi + '?user_id=' + user_id + '&a_id=' + a_id,
				    method: 'GET',
				    data: {},
				    success: res => {
				        console.log(res);
				        uni.hideLoading();
				    },
				    fail: () => {
				    },
				    complete: () => {
				    }
				});
				
			},

            toAnnouncementDetail(e) {
                console.log(e.currentTarget.dataset.announcement_id);

                var announcement_id = e.currentTarget.dataset.announcement_id;
				
				
				
				var userId = service.getUserId();
				console.log(userId);
				
				console.log(e.currentTarget.dataset.announcement_id);
				var announcement_id = e.currentTarget.dataset.announcement_id;
				
				this.toAnnouncementRecord(userId, announcement_id);
				

                uni.navigateTo({
                    url: './detail?a_id=' + announcement_id,
                });
            }
        },
        onLoad: function(e) {
			this.type = e.type;
			this.getAnnouncementList();   
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

    .uni-common-mt {
        margin-top: 20upx;
        margin-bottom: 20upx;
    }

    .uni-media-list-body {
        height: auto;
    }

    .uni-media-list-text-top {
        line-height: 1.6em;
    }
    
</style>
