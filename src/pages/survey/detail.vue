<template>
	<view class="uni-padding-wrap uni-common-mt">
		<view class="survey-title">{{title}}</view>
		<view class="art-content">
			<rich-text class="richText" :nodes="strings"></rich-text>
		</view>


		<view class="">
			<form @submit="formSubmit" @reset="formReset">


				<view v-for="(sub, subIndex) in subjects" :key="sub.subject_id" class="sub">

					<view v-if="sub.subject_type==='1'">

						<view class="cu-form-group- margin-top">
							<view class="title">{{subIndex + 1}}. {{sub.subject_content}}</view>
						</view>

						<view class="uni-list">
							<radio-group @change="radioChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in sub.options" :key="item.value">
									<view>
										<radio :value="item.value" :checked="index === current" />
									</view>
									<view>{{item.name}}</view>
								</label>
							</radio-group>
						</view>

					</view>

					<view v-else-if="sub.subject_type==='2'">

						<view class="cu-form-group- margin-top">
							<view class="title">{{subIndex + 1}}. {{sub.subject_content}}</view>
						</view>
						
						
						<view class="uni-list">
							<checkbox-group @change="checkboxChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="item in sub.options" :key="item.value">
									<view>
										<checkbox :value="item.value" :checked="item.checked" :class="item.zz" class="blue"/>
									</view>
									<view>{{item.name}}</view>
								</label>
							</checkbox-group>
						</view>
						
						
					</view>


					<view v-else-if="sub.subject_type==='3'">

						<view class="cu-form-group- margin-top">
							<view class="title">{{subIndex + 1}}. {{sub.subject_content}}</view>
						</view>

						<view class="cu-form-group">
							<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="多行文本输入框" name='content'></textarea>
						</view>
					</view>

				</view>
				

				
				
				
				




				<!--
                <radio-group class="block" @change="RadioChange">
                    <view class="cu-form-group">
                        <view class="title">单选操作(A)</view>
                        <radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
                    </view>
                </radio-group>

                <checkbox-group class="block" @change="CheckboxChange">
                    <view class="cu-form-group margin-top">
                        <view class="title">复选选操作(checkbox)</view>
                        <checkbox :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A"></checkbox>
                    </view>
                </checkbox-group>
                -->


				<view class="uni-btn-v">
					<button form-type="submit" type="primary">Submit</button>
					<!-- <button type="default" form-type="reset">Reset</button> -->
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	import apiUrl from '../../common/apiUrl.js';
	import service from '../../service.js';

	var graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				subjects: [],
				title: '',
				strings: '',
				selected_radio: '',
				modalName: null,
				textareaAValue: '',
				
				radioItems: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					},
				],
				
				checkBoxItems: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',						// checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					}
				],
				
				current: '',
				checkboxValues: [],
				answerInfo: [],
				
				
				
				
				// checkbox: [{
				// 	value: "201911211629318490974807",
				// 	checked: true
				// }, {
				// 	value: "201911211629429807042319",
				// 	checked: true
				// }, {
				// 	value: "201911211629472869872140",
				// 	checked: false
				// }],
			}
		},
		methods: {

			surveySubmit(ans) {

				var userId = service.getUserId();

				var params = "?user_id=" + userId + "&answerInfo=" + JSON.stringify(ans);

				uni.showLoading({
					title: "加载中..."
				});
				uni.request({
					url: apiUrl.surveySubmitApi + params,
					method: 'GET',
					data: {},
					success: res => {
						uni.hideLoading();
					},
					fail: () => {},
					complete: () => {}
				});


			},

			
			setData(subjects) {
				for ( let i = 0; i < subjects.length; i++) {
					if (subjects[i].subject_type === "1") {
						this.radioItems = subjects[i].options;
					} else if (subjects[i].subject_type === "2"){
						this.checkBoxItems = subjects[i].options;
					}
				}
			},
			
			radioChange(evt) {
				
				for (let i = 0; i < this.radioItems.length; i++) {
					if (this.radioItems[i].value === evt.target.value) {
						
						console.log(evt.target.value);
											
						this.current = i;
						break;
					}
				}
			},
			
			checkboxChange: function (e) {
				var items = this.checkBoxItems,
					values = e.detail.value;
					
					this.checkboxValues = values;
										
					console.log(values);
					
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.indexOf(item.value) >= 0){
						// this.$set(item,'checked',true)
						this.$set(item,'zz','checked')
					}else{
						// this.$set(item,'checked',true)
						this.$set(item,'zz','')
					}
				}
			},
			
			
			
			
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},


			formSubmit: function (e) {
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var rule = [
					// {name:"nickname", checkType : "string", checkRule:"1,3",  errorMsg:"姓名应为1-3个字符"},
					// {name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
					{name:"content", checkType : "notnull", checkRule:"",  errorMsg:"请填写内容"}
				];
				//进行表单检查
				var formData = e.detail.value;
				
				console.log(formData);
				var checkRes = graceChecker.check(formData, rule);


				if (checkRes) {
					
					this.answerInfo.push(this.radioItems[this.current])
					
					for (let i = 0; i < this.checkboxValues.length; i++) {

						for (let j = 0; j < this.checkBoxItems.length; j++) {
							
							if (this.checkBoxItems[j].option_id === this.checkboxValues[i]) {
								
								this.answerInfo.push(this.checkBoxItems[j])
							}
						}
							
					}
					
					console.log("===========");
					console.log(this.answerInfo);
					
					console.log('this.answerInfo为：' + JSON.stringify(this.answerInfo))


					this.surveySubmit(this.answerInfo)

					uni.showToast({title: "提交成功!", icon: "none"});

					
				} else {
					uni.showToast({title: graceChecker.error, icon: "none"});
				}
			},
			formReset: function (e) {
				console.log('清空数据')
			}
		},
		onLoad: function (e) {
			uni.showLoading({
				title: "加载中..."
			})
			console.log(e);
			uni.request({
				url: apiUrl.surveyDetailApi + '?survey_id=' + e.survey_id,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.title = res.data.survey_detail.survey_title;
					this.strings = res.data.survey_detail.survey_content;
					this.subjects = res.data.survey_detail.subjects;
					// this.options = res.data.survey_detail.subjects[0].options;
					
					this.setData(this.subjects);

					uni.hideLoading();

				},
				fail: () => {
				},
				complete: () => {
				}
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
		font-size: 28 upx;
		line-height: inherit
	}
	
	.survey-title {
	    line-height: 2em;
	    font-weight: 500;
	    font-size: 150%;
	    /* text-align: center; */
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	
	.uni-list-cell {
		justify-content: flex-start
	}


.uni-list-cell-pd {
	padding: 22upx 30upx;
}

</style>
