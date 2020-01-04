<template>
    <view class="cnt">
        <view>我是模版页面</view>
    </view>
</template>

<script>
	
	import apiUrl from '../../common/apiUrl.js';
	
	export default {
		data() {
			return {	
				
			}
		},
		onLoad(e) {
            var appId = "wx3c5359404a314750";

            var pageUrl = "http://test123.borntech.cn:7000/information/news/show?item_id=201911281200514284217386"

            uni.showLoading({
                title: "加载中..."
            })

            console.log(apiUrl.WxShareApi + '?appId=' + appId + '&pageUrl=' + pageUrl);


            uni.request({
                url: apiUrl.WxShareApi + '?appId=' + appId + '&pageUrl=' + pageUrl,
                method: 'GET',
                data: {},
                success: res => {

                    console.log("1111111111111");

                    console.log(res);
                    this.signData = res.data.result;

                    console.log("==============");
                    // console.log(this.h5_url);

                    console.log("#########");

                    console.log(this.res.data.result);
                    console.log(this.signData);

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
	
    
</style>
