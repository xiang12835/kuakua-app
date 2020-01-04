<template>
    <view class="cnt">
		<view class="title">{{promo_name}}</view>
		<image :src="qrcode" class="ui-flex justify-center center" style="margin: 0 auto;"></image>
    </view>
</template>

<script>
	
	import apiUrl from '../../common/apiUrl.js';
	
	export default {
		data() {
			return {
				promo_id: '',
				qrcode: '',
				promo_name: ''
				
			}
		},
		onLoad(e) {
			this.promo_id = e.promo_id;
			
			var params = '?promo_id=' + this.promo_id;
			
			uni.request({
			    url: apiUrl.promoteDetailApi + params,
			    method: 'GET',
			    data: {},
			    success: res => {
			        console.log(res);
					this.qrcode = res.data.promote_detail.qr_code
					this.promo_name = res.data.promote_detail.promo_name
					
					
			        uni.hideLoading();
					
			    },
			    fail: () => {
			    },
			    complete: () => {
			    }
			});
			
			
		},
		methods: {
			
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
	
	.title {
	    line-height: 2em;
	    font-weight: 500;
	    font-size: 150%;
	    text-align: center;
	}
	
	.qrcode-related {
		margin: 0 auto;
	}

    .ui-flex {
        display: -webkit-box !important;
        display: -webkit-flex !important;
        display: -ms-flexbox !important;
        display: flex !important;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap
    }

    .ui-flex, .ui-flex *, .ui-flex :after, .ui-flex :before {
        box-sizing: border-box
    }

    .ui-flex.justify-center {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center
    }
    .ui-flex.center {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center
    }


</style>
