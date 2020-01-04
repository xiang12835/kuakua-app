<template>
    <view class="cnt">
        <view class="uni-padding-wrap uni-common-mt">
        	<form @submit="formSubmit" @reset="formReset">
        		<view class="cu-form-group margin-top">
        			<!-- <view class="title">姓名</view> -->
        			<input name="regular_amount" placeholder="请输入定期存款" />
        		</view>
				
				
				<view class="cu-form-group margin-top">
					<!-- <view class="title">姓名</view> -->
					<input name="foundation_amount" placeholder="请输入基金定投" />
				</view>
				
				<view class="cu-form-group margin-top">
					<!-- <view class="title">姓名</view> -->
					<input name="insurance_amount" placeholder="请输入保险期激" />
				</view>
        		
        		
        		
        		<view class="uni-btn-v">
        			<button type="primary" form-type="submit">Submit</button>
        			<button type="default" form-type="reset">Reset</button>
        		</view>
        	</form>
        </view>
    </view>
</template>

<script>
	import apiUrl from '../../common/apiUrl.js';
	import service from '../../service.js';
	
	var  graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				promo_id: '',
				regular_amount: 0,
				foundation_amount: 0,
				insurance_amount: 0,
				
				
			}
		},
		onLoad(e) {
			this.promo_id = e.promo_id;
		},
		methods: {
			formSubmit: function(e) {
				
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))

	            var rule_regular = [{name:"regular_amount", checkType : "int", checkRule:"1,9",
					errorMsg:"请输入数字 (>^ω^<)"}];

	            var rule_foundation = [{name:"foundation_amount", checkType : "int", checkRule:"1,9",
					errorMsg:"请输入数字 (>^ω^<)"}];

	            var rule_insurance = [{name:"insurance_amount", checkType : "int", checkRule:"1,9",
					errorMsg:"请输入数字 (>^ω^<)"}];
	            //进行表单检查
	            var formData = e.detail.value;

	            // var checkRes = graceChecker.check(formData, rule);

				var checkRes_regular = graceChecker.check(formData,rule_regular);
				console.log(checkRes_regular);
				var checkRes_foundation = graceChecker.check(formData, rule_foundation);
				console.log(checkRes_foundation);
				var checkRes_insurance = graceChecker.check(formData, rule_insurance);
				console.log(checkRes_insurance);

				if(checkRes_regular || checkRes_foundation || checkRes_insurance){
	                // uni.showToast({title:"验证通过!", icon:"none"});
					
					
					/* console.log("======");
					console.log(formData); */
					
					// {regular_amount: "11", foundation_amount: "11", insurance_amount: "11"}


					if(formData.regular_amount == null || formData.regular_amount == ""){
						 formData.regular_amount = 0;
					}

					if(formData.foundation_amount == null || formData.foundation_amount == ""){
						formData.foundation_amount = 0;
					}

					if(formData.insurance_amount == null || formData.insurance_amount == ""){
						formData.insurance_amount = 0;
					}
					var regular_amount = formData.regular_amount;
					var foundation_amount = formData.foundation_amount;
					var insurance_amount = formData.insurance_amount;
					var promo_id = this.promo_id;
					
					
					var userId = service.getUserId();
					
					
					var params = '?user_id=' + userId + '&promo_id=' + promo_id + '&regular_amount=' + regular_amount + '&foundation_amount=' + foundation_amount + '&insurance_amount=' + insurance_amount;
					
					
					console.log("======");
					console.log(params);
					
					
					uni.request({
					    url: apiUrl.promoteAmountAddApi + params,
					    method: 'GET',
					    data: {},
					    success: res => {
					        console.log(res);
					        uni.hideLoading();
							
							// uni.navigateBack();
							
							uni.redirectTo({
							    url: './result?promo_id=' + this.promo_id,
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
	
	.col {
		margin-top: 20upx;
	}
	
	.uni-input {
		height: 80upx;
		line-height: 80upx;
	}
	
	
	/*
	
	https://ask.dcloud.net.cn/question/62277
	
	.uni-input {
	height: 80upx;
	line-height: 80upx;
	div{
	height: inherit;
	}
	} 
	
	*/
	
    
</style>
