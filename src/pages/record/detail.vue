<template>
        <view class="cnt">
            <view class="uni-padding-wrap uni-common-mt">
				
				<view class="title">券名：{{item.promote_info.promo_name}}</view>
				<view class="title">发放时间：{{item.update_time}}</view>
                <view class="title">券数：{{item.promo_count}}</view>
                <image :src="item.promote_info.qr_code" class="ui-flex justify-center center" style="margin: 0 auto;"></image>
                
            </view>
        </view>
</template>

<script>


    import apiUrl from '../../common/apiUrl.js';

    export default {
        data() {
            return {
				record_id: '',
				item: {},

            }
        },
        onLoad(e) {
			this.record_id = e.record_id;
			
			var params = '?record_id=' + this.record_id;
			

            uni.showLoading({
                title: "加载中..."
            })
            uni.request({
                url: apiUrl.promoteRecordDetailApi + params,
                method: 'GET',
                data: {},
                header: {},
                success: res => {
                    console.log(res);
                    this.item = res.data.promote_record_detail;
                    uni.hideLoading();
                },
                fail: () => {},
                complete: () => {}
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
	    // text-align: center;
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
