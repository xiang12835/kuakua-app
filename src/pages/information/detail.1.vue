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
                url: apiUrl.newsDetailApi + '?news_id=' + e.news_id,
                method: 'GET',
                data: {},
                success: res => {
                    console.log(res);
                    this.title = res.data.news_detail.financial_news_title;
                    this.create_time = res.data.news_detail.create_time;
                    this.strings = res.data.news_detail.financial_news_content;
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
        font-weight: 700;
        font-size: 38 upx;
        text-align: center;
    }
	
	.time {
	    line-height: 2em;
	    font-weight: 700;
	    font-size: 30 upx;
	    text-align: left;
		color:#C0C0C0;
	}

    .art-content {
        line-height: 2em;
    }
</style>
