<template>
    <view>
		
		<uni-card :title="user_info.nickname" mode="title" :thumbnail="user_info.image_url" :extra="forum_detail.create_time" note="喜欢">
		
			<view @longtap="longtapCard">
				<view class="content-title">
					{{ forum_detail.forum_title }}
				</view>
				
				<view class="content-box">
					{{ forum_detail.forum_content }}
				</view>
			</view>
			<!-- <template v-slot:footer>
				<view class="footer-box">
					<view class="footer-box__item" @click.stop="footerClick('喜欢')"><text> 喜欢</text></view>
					<view class="footer-box__item" @click.stop="footerClick('评论')"><text> 评论</text></view>
					<view class="footer-box__item" @click.stop="footerClick('分享')"><text> 收藏</text></view>
				</view>
			</template> -->
		
		</uni-card>
		
		
		<view class="uni-padding-wrap">		
			<!-- 评论区 start -->
			<view v-for="(comment,index) in comments" :key="index">
				<view class="uni-comment">
					<view class="uni-comment-list">
						<view class="uni-comment-face" @longtap="longtapComment" :data-custom_id="comment.forum_comment_id"><image :src= "comment.user_info.image_url" mode="widthFix"></image></view>
						<view class="uni-comment-body">
							<view class="uni-comment-top">
								<text>{{ comment.user_info.nickname }}</text>
							</view>
							<view class="uni-comment-date">
								<text>{{ comment.create_time }}</text>
							</view>
							<view class="uni-comment-content"><label v-if="comment.parent_id">@{{comment.parent_comment.user_info.nickname+' '}}</label>{{ comment.comment }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 评论区 end -->	
		</view>

		<view class="empty"></view>


		<view class="xuanfu">
		<form @submit="formSubmit">
			<view class="cu-bar input">
				<view class="action">
					<text class="cuIcon-sound text-grey"></text>
				</view>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" class="solid-bottom" :focus="false" maxlength="300" cursor-spacing="10" name="comment_content" :placeholder="custom_name"></input>
				<view class="action">
					<text class="cuIcon-emojifill text-grey"></text>
				</view>
				<button form-type="submit" class="cu-btn bg-green shadow-blur">发送</button>
			</view>
		</form>
		</view>
		
			
    </view>
</template>

<script>

	import apiUrl from '../../common/apiUrl.js';
	import uniCard from '@/components/uni-card/uni-card.vue';
	import service from '../../service.js';
	var graceChecker = require("../../common/graceChecker.js");
	
	
	export default {
		components: {
			uniCard
		},
		data() {
			return {
				forum_detail: {},
				user_info: {},
				comments: {},
				InputBottom: 0,
				forum_id: '',
				user_id: '',
				comment_content: '',
				custom_id: '',
				custom_name: ''
			}		
		},
		onLoad: function (e) {
			uni.showLoading({
				title: "加载中..."
			})
			
			console.log(e);
			uni.request({
				url: apiUrl.forumAndCommentsApi + '?forum_id=' + e.forum_id,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.forum_detail = res.data.forum_detail_and_comments;
					this.user_info = res.data.forum_detail_and_comments.user_info;
					this.comments = res.data.forum_detail_and_comments.comments;
					this.forum_id = e.forum_id; 
					// this.title = res.data.news_detail.financial_news_title;
					// this.create_time = res.data.news_detail.create_time;
					// this.strings = res.data.news_detail.financial_news_content;
					uni.hideLoading();
				},
				fail: () => {
				},
				complete: () => {
				}
			});
		},		
		methods: {
			// clickCard() {
			// 	uni.showToast({
			// 		title: '点击卡片',
			// 		icon: 'none'
			// 	})
			// },
			
			longtapCard: function(e){
			   console.log(e);
			   console.log('longtapCard');
			   
			   this.custom_id = '';
			   
			   console.log(this.custom_id);
			   
			   this.custom_name = '';
			   
			},
			
			longtapComment: function(e){
			   console.log(e);
			   console.log('longtap');
			   
			   this.custom_id = e.currentTarget.dataset.custom_id;
			   
			   console.log('==========');
			   console.log(this.custom_id);
			   
			   var custom_comment = {};
			   for (var i=0; i<this.comments.length; i++) {
				   if (this.comments[i].forum_comment_id == this.custom_id) {
					   custom_comment = this.comments[i];
				   }
			   }
			   
			   this.custom_name = custom_comment.user_info.nickname;
			   this.custom_name = "@" + this.custom_name;
			   
			   
			},
			
			formSubmit: function(e) {
				
				//定义表单规则
				var rule = [
				    // {name:"nickname", checkType : "string", checkRule:"1,3",  errorMsg:"姓名应为1-3个字符"},
				    // {name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
				    // {name:"loves", checkType : "notnull", checkRule:"",  errorMsg:"请选择爱好"},
				    {name:"comment_content", checkType : "notnull", checkRule:"",  errorMsg:"评论不能为空 (>^ω^<)"},
				];
				
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return
					}
				
				this.comment_content = e.detail.value.comment_content;
				var forum_id = this.forum_id;
				var comment_content = this.comment_content;
				var user_id = service.getUserId();
				
				
				var param = '?user_id=' + user_id + '&forum_id=' + forum_id + '&comment=' + comment_content;
				
				if (this.custom_id) {
					param = param + '&parent_id=' + this.custom_id
				}
				
				
				console.log('+++++++++');
				console.log(param);
				
				
				uni.request({
				    url: apiUrl.CommentCreateApi + param,
				    method: 'GET',
				    data: {},
				    success: res => {
				        console.log(res);
				        uni.hideLoading();
						
						// uni.navigateBack();
				
						uni.redirectTo({
							url: './detail?forum_id=' + this.forum_id
						});
				
				    },
				    fail: () => {
				    },
				    complete: () => {
				    }
				});
			},
			
			footerClick(types) {
				uni.showToast({
					title: types,
					icon: 'none'
				})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
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
	
	.content-title {
		padding-top: 20upx;
		font-size: 32upx;
		font-weight: 500;
	}
	
	.content-box {
		padding-top: 20upx;
	}
	
	.box {
		margin: 20upx 0;
	}
	
	.box view.cu-bar {
		margin-top: 20upx;
	}

	.xuanfu{
		left: 0;
		position: fixed;
		bottom: 0;//这里换成top:0;就悬浮在头部
		width: 100%;
		z-index: 100;
	}
	.empty {
		height: 100upx;
	}
	
</style>
