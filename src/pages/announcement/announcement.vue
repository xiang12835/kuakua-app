<template>
    <view class="uni-padding-wrap">


		<view v-for="(announcement, index) in announcement_list" :key="index">

           <view class="example-title">
                <view>{{announcement.type_name}}（{{announcement.announcement_count}}）</view>
                <view @tap="toAnnouncementList" :data-type="announcement.type" >更多 ></view>
            </view>

            <view class="uni-swiper-msg" v-if="announcement.has_announcement">
                <view class="uni-swiper-msg-icon">
                    <image src="../../static/daily_announcement.png" mode="widthFix"></image>
                </view>
                <swiper vertical="true" autoplay="true" circular="true" interval="3000">
                    <swiper-item v-for="(item, index1) in announcement.titles" :key="index1" @tap="toAnnouncementDetail" :data-announcement_id = "item.announcement_id">
                        {{item.announcement_name}}
                    </swiper-item>
                </swiper>
            </view>

            <view class="example-body" v-else>
                <uni-notice-bar :single="true" more-text="查看更多" color="red" background-color="#eee" text="没有最新公告!!!" />
            </view>

        </view>

<!--       v2
        <view class="example-title">
            <view>行内培训公告（3）</view>
            <view>
                <navigator url="./list?type=1">更多 ></navigator>
            </view>
        </view>
        <view class="uni-swiper-msg">
            <view class="uni-swiper-msg-icon">
                <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
            </view>
            <swiper vertical="true" autoplay="true" circular="true" interval="3000">
                <swiper-item v-for="(item, index) in train_title_list" :key="index" @tap="noticeDetail"
                             :data-announcement_id = "item.announcement_id">
                    {{item.announcement_name}}
                </swiper-item>
            </swiper>
        </view>


        <view class="example-title">
            <view>产品到期提醒</view>
            <view>
                <navigator url="./list?type=2">更多 ></navigator>
            </view>
        </view>
        <view class="uni-swiper-msg">
            <view class="uni-swiper-msg-icon">
                <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
            </view>
            <swiper vertical="true" autoplay="true" circular="true" interval="3000">
                <swiper-item v-for="(item, index) in product_title_list" :key="index" @tap="noticeDetail"
                             :data-announcement_id = "item.announcement_id">
                    {{item.announcement_name}}
                </swiper-item>
            </swiper>
        </view>


        <view class="example-title">
            <view>产品分红提醒</view>
            <view>
                <navigator url="./list?type=3">更多 ></navigator>
            </view>
        </view>
        <view class="uni-swiper-msg">
            <view class="uni-swiper-msg-icon">
                <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
            </view>
            <swiper vertical="true" autoplay="true" circular="true" interval="3000" >
                <swiper-item v-for="(item, index) in bonus_title_list" :key="index" @tap="noticeDetail"
                             :data-announcement_id = "item.announcement_id">
                    {{item.announcement_name}}
                </swiper-item>
            </swiper>
        </view>


        <view class="example-title">
            <view>即将发售</view>
            <view>
                <navigator url="./list?type=4">更多 ></navigator>
            </view>
        </view>
        <view class="uni-swiper-msg">
            <view class="uni-swiper-msg-icon">
                <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
            </view>
            <swiper vertical="true" autoplay="true" circular="true" interval="3000">
                <swiper-item v-for="(item, index) in sell_title_list" :key="index" @tap="noticeDetail"
                             :data-announcement_id = "item.announcement_id">
                    {{item.announcement_name}}
                </swiper-item>
            </swiper>
        </view>


        <view class="example-title">
            <view>营销活动公告</view>
            <view>
                <navigator url="./list?type=5">更多 ></navigator>
            </view>
        </view>
        <view class="uni-swiper-msg">
            <view class="uni-swiper-msg-icon">
                <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
            </view>
            <swiper vertical="true" autoplay="true" circular="true" interval="3000">
                <swiper-item v-for="(item, index) in market_title_list" :key="index" @tap="noticeDetail"
                             :data-announcement_id = "item.announcement_id">
                    {{item.announcement_name}}
                </swiper-item>
            </swiper>
        </view> -->

       

        <!-- v1

        <view class="example-title">
            <view>培训公告（3）</view>
            <view><navigator url="./list">更多 ></navigator></view>
        </view>
        <view class="uni-swiper-msg">
            <view class="uni-swiper-msg-icon">
                <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
            </view>
            <swiper vertical="true" autoplay="true" circular="true" interval="3000">
                <swiper-item v-for="(item, index) in msg_title_list" :key="index">
                    <navigator url="./detail">{{item}}</navigator>

                </swiper-item>
            </swiper>
        </view>



        <view class="example-title">
            <view>营销活动（2）</view>
            <view><navigator url="./list">更多 ></navigator></view>
        </view>
        <view class="example-body">
            <uni-notice-bar :single="true" :show-icon="true" text="公告内容1, 适用于无需标题且文字数量不多的情况" />
            <uni-notice-bar :show-icon="true" text="公告内容2, 适用于无需标题且文字数量不多的情况" />
        </view>


        <view class="example-title">
            <view>产品到期提醒（0）</view>
            <view><navigator url="./list">更多 ></navigator></view>
        </view>
        <view class="example-body">
            <uni-notice-bar :single="true" more-text="查看更多" color="red" background-color="#eee" text="没有最新公告!!!" />

        </view>

        -->


    </view>
</template>
<script>
    import apiUrl from '../../common/apiUrl.js';
    import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	import service from '../../service.js';

    export default {
        components: {
            uniNoticeBar
        },
        data() {
            return {

                announcement_list: [],
				loadMoreText: "加载中...",
				hasMordData: true

                // train_title_list: [],
                // product_title_list: [],
                // bonus_title_list: [],
                // sell_title_list: [],
                // market_title_list: [],

            }
        },
        created() {
        },
		onPullDownRefresh() {
		    // this.pageNum = 1;
		    this.hasMordData = true;
		    this.loadMoreText = '加载中...';
			this.announcement_list = [];
			
			this.getAllAnnouncementList();
			
			uni.stopPullDownRefresh();
		},
        methods: {
			
			getAllAnnouncementList(){
				var userId = service.getUserId();
				console.log(userId);
				
				uni.showLoading({
				    title: "加载中..."
				})
				uni.request({
				    url: apiUrl.announcementTypeApi +'?user_id='+ userId,
				    method: 'GET',
				    data: {},
				    success: res => {
				        console.log(res.data);
				
				        this.announcement_list = res.data.announcement_type_list;
						
				        // this.announcement_count = res.data.announcement_count;
				        // this.train_title_list = res.data.announcement_type_list[0].titles;
				        // this.product_title_list = res.data.announcement_type_list[1].titles;
				        // this.bonus_title_list = res.data.announcement_type_list[2].titles;
				        // this.sell_title_list = res.data.announcement_type_list[3].titles;
				        // this.market_title_list = res.data.announcement_type_list[4].titles;
				
				        uni.hideLoading();
				    },
				    fail: () => {
				    },
				    complete: () => {
				    }
				});
			},
			
            toAnnouncementList(e) {
                console.log(e.currentTarget.dataset.type);

                uni.navigateTo({
                    url: './list?type=' + e.currentTarget.dataset.type,
                });
            },


            toAnnouncementDetail(e) {
				
				var userId = service.getUserId();
				console.log(userId);
				
                console.log(e.currentTarget.dataset.announcement_id);
                var announcement_id = e.currentTarget.dataset.announcement_id;
				
				this.toAnnouncementRecord(userId, announcement_id);
				
				uni.navigateTo({
				    url: './detail?a_id=' + announcement_id,
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
				
			}

        },
        onLoad: function () {
			this.getAllAnnouncementList();

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

    .example-title__after {
        position: relative;
        color: #031e3c
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


</style>
