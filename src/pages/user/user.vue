<template>
    <view class="content">
		
		
		<view class="aboutme" v-if="hasLogin">
		<view class="uni-comment-list">
			<view class="uni-comment-face"><image :src="user_info.image_url" mode="widthFix"></image></view>
			<view class="uni-comment-body">
				<view class="uni-comment-top">
					<text>{{ user_info.nickname }}</text>					
				</view>			
				<view class="uni-comment-content" >{{ user_info.nickname }}</view>
			</view>
		</view>
		</view>
		
		<view class="section" v-if="hasLogin">
		<uni-list>
			<uni-list-item title="我的积分" thumb="/static/user-icon/memberCredit.png" @click='toUserPoint'/>
			
			
		</uni-list>
		</view>	
			
			
		<view class="section" v-if="hasLogin">
		<uni-list>
			<uni-list-item title="我的资讯" thumb="/static/user-icon/news.png" @tap='toUserInfo'/>
			<uni-list-item title="我的公告" thumb="/static/user-icon/announcement.png" @tap='toUserAnnouncement'/>
			<uni-list-item title="我的调研" thumb="/static/user-icon/survey.png" @tap='toUserSurvey'/>
			<uni-list-item title="我的社群" thumb="/static/user-icon/group.png" @tap='toUserForum'/>
			<!-- <uni-list-item title="我的课程" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" /> -->
			<!-- <uni-list-item title="资料收藏" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" /> -->
			
			
		</uni-list>
		</view>	
		
		<view class="section" v-if="hasLogin">
		<uni-list>
			<uni-list-item title="意见反馈" thumb="/static/user-icon/suggestion.png" @click='toUserFeedback'/>
			
		</uni-list>
		</view>	
		
        <view class="btn-row">
            <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
            <button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
        </view>
    </view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import apiUrl from '../../common/apiUrl.js';
	import service from '../../service.js';
		
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
		
		components: {
			uniList,
			uniListItem
		},
		
		computed: {
		    ...mapState(['hasLogin', 'forcedLogin'])
		},
		data(){
			return{
				user_info: {},
				user_id: '',
			}
		},
		onLoad: function (e) {
			uni.showLoading({
				title: "加载中..."
			})
			console.log(e);
			

			var userId = service.getUserId();
			console.log(userId);
			
			uni.request({

				url: apiUrl.userHomeInfoApi + '?user_id=' + userId,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.user_info = res.data.user_info;
					uni.hideLoading();
				},
				fail: () => {
				},
				complete: () => {
				}
			});
			
			
		},

		
        methods: {
            ...mapMutations(['logout']),
            bindLogin() {
                uni.navigateTo({
                    url: '../login/login',
                });
            },
            bindLogout() {
                this.logout();
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../login/login',
                    });
                }
            },
			
			
			
			toUserForum() {
				uni.navigateTo({
					url: './forum'
				});
			},
			toUserInfo() {
				uni.navigateTo({
					url: './info'
				});
			},
			toUserFeedback() {
				uni.navigateTo({
					url: './feedback'
				});
			},
			toUserAnnouncement() {
				uni.navigateTo({
					url: './announcement'
				});
			},
			toUserPoint() {
				uni.navigateTo({
					url: './point'
				});
			},
			toUserSurvey() {
				uni.navigateTo({
					url: './survey'
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
	.section {
		margin-top: 40upx;
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
	
	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}
	

</style>
