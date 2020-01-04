<template>
	<view class="ctn">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				
				<!-- 
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							业务类型
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange1" :value="index1" :range="array1" range-key="name1">
								<view class="uni-input">{{array1[index1].name1}}</view>
							</picker>
						</view>
					</view>
				</view>
				 -->
				 
				 
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in typeList" :key="index" @tap="tabSelect" :data-id="index">
						{{item.name}}
					</view>
				</scroll-view>
				
				
				<view class="cu-form-group margin-top">
					<input placeholder="标题" name="title"></input>
				</view>
				<view class="cu-form-group">
					<textarea name="content" maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="内容"></textarea>
				</view>
				
				
				
				<!-- 
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							话题类型
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange2" :value="index2" :range="array2" range-key="name2">
								<view class="uni-input">{{array2[index2].name2}}</view>
							</picker>
						</view>
					</view>
				</view>
				 -->


				<view class='flex flex-wrap margin-top'>
					<view class='cu-tag' :class="'line-' + topic.name" @tap="actionSheetTap"><view class="tag-title"># {{topic.title}}</view></view>
				</view>
				
				<view class="uni-btn-v">
					<button type="primary" form-type="submit">Submit</button>
					<!-- <button type="default" form-type="reset">Reset</button> -->
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	import apiUrl from '../../common/apiUrl.js';
	import service from '../../service.js';
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	
	var graceChecker = require("../../common/graceChecker.js");
	
	
	// TopicChoices = (
	//         ("1", "业务资讯"),
	//         ("2", "问题发现"),
	//         ("3", "意见建议"),
	//     )

	export default {
		data() {
			return {
				typeList: [],
				scrollLeft: 0,
				modalName: null,
				TabCur: 0,
				forum_type: 1,
				topic: {
					name: 'blue',
					title: "选择话题"
				},
				topicTitleList: ['业务咨询', '问题发现', '意见建议'],
				
				array1: [{name1:'理财'},{name1: '保险'}, {name1:'基金'}, {name1:'资管'}, {name1:'贵金属'}, {name1:'其他'}],
				index1: 0,
				array2: [{name2:'业务咨询'},{name2: '问题发现'}, {name2:'意见建议'}],
				topicIndex: 0,
				
				topicChoices: [
					{
						id: "1",
						name: "业务咨询"
					},
					{
						id: "2",
						name: "问题发现"
					},
					{
						id: "3",
						name: "意见建议"
					},
				]
			}
		},
		onLoad(e) {
					
			uni.request({
			    url: apiUrl.forumTypeListApi,
			    method: 'GET',
			    data: {},
			    success: res => {
			        console.log(res);
					this.typeList = res.data.forum_type_list
			        uni.hideLoading();
			    },
			    fail: () => {
			    },
			    complete: () => {
			    }
			});
		},
		methods: {
			
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.typeList[this.TabCur].id
				this.forum_type = this.typeList[this.TabCur].id;
				
				console.log("=========");
				console.log(this.forum_type);
			},
			
			actionSheetTap() {
				uni.showActionSheet({
					title:'',
					itemList: ['业务咨询', '问题发现', '意见建议'],
					success: (e) => {
						console.log(e.tapIndex);
						// uni.showToast({
						// 	title:"点击了第" + e.tapIndex + "个选项",
						// 	icon:"none"
						// })
						
						this.topicIndex = e.tapIndex;
						
						this.topic.title = this.topicTitleList[this.topicIndex];
						
						console.log("=========");
						console.log(this.topic.title);
						
						
					}
				})
			},
			
			
			bindPickerChange1: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index1 = e.target.value
			},
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index2 = e.target.value
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				console.log(e.detail.value)
                //定义表单规则
                var rule = [
                    // {name:"nickname", checkType : "string", checkRule:"1,3",  errorMsg:"姓名应为1-3个字符"},
                    // {name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
                    // {name:"loves", checkType : "notnull", checkRule:"",  errorMsg:"请选择爱好"},
                    {name:"title", checkType : "notnull", checkRule:"",  errorMsg:"请填写标题 (>^ω^<)"},
                    {name:"content", checkType : "notnull", checkRule:"",  errorMsg:"请填写内容 (>^ω^<)"},
                ];
				
				
                //进行表单检查
                var formData = e.detail.value;
				
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
				    // uni.showToast({title:"验证通过!", icon:"none"});
					var forum_title = formData.title;
					var forum_content = formData.content;
					var forum_type = this.forum_type;
					var forum_topic = this.topicChoices[this.topicIndex].id;

					var userId = service.getUserId();

					console.log(userId);

					uni.request({
					    url: apiUrl.forumCreateApi + '?user_id=' + userId + '&forum_title=' + forum_title + '&forum_content=' + forum_content + '&forum_type=' + forum_type + '&forum_topic=' + forum_topic,
					    method: 'GET',
					    data: {},
					    success: res => {
					        console.log(res);
					        uni.hideLoading();
							
							// uni.navigateBack();

							uni.reLaunch({
								url: '../community/community'
							});

					    },
					    fail: () => {
					    },
					    complete: () => {
					    }
					});
					
					
					
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
				
				
                
			},
			formReset: function(e) {
				console.log('清空数据')
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
	
	
	.uni-form-item .title {
		padding: 20rpx 0;
	}
	
	.uni-input {
		height: 80upx;
		line-height: 80upx;
	}
	
	
	
</style>
