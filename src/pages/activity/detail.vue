<template>
    <view class="content">
        <view class="title">{{title}}</view>
		<view class="time">{{create_time}}</view>
        <view class="art-content">
            <rich-text class="richText" :nodes="strings"></rich-text>
        </view>
    </view>
</template>

<script>
    import apiUrl from '../../common/apiUrl.js';

    export default {
        data() {
            return {
                title: '',
                strings: '',
				create_time: ''
            }
        },
        onLoad: function (e) {
            uni.showLoading({
                title: "加载中..."
            })
            console.log(e);
            uni.request({
                url: apiUrl.activityDetailApi + '?activity_id=' + e.activity_id,
                method: 'GET',
                data: {},
                success: res => {
                    console.log(res);
                    this.title = res.data.activity_detail.title;
                    this.strings = res.data.activity_detail.body;
					this.create_time = res.data.activity_detail.create_time;
                    uni.hideLoading();
                },
                fail: () => {
                },
                complete: () => {
                }
            });
        }
    }
</script>

<style>
    .content {
        padding: 10 upx 2%;
        width: 96%;
        flex-wrap: wrap;
    }
	
	.title {
	    line-height: 2em;
	    font-weight: 500;
	    font-size: 150%;
	    /* text-align: center; */
	}
	
	.time {
	    line-height: 2em;
	    /*font-weight: 700;*/
	    font-size: 30 upx;
	    text-align: left;
	    color: #C0C0C0;
	}
	
    .art-content {
        line-height: 2em;
    }
</style>
