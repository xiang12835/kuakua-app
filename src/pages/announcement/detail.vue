<template>
    <view class="content">
        <view class="title">{{title}}</view>
        <view class="art-content">
            <rich-text class="richText" :nodes="strings"></rich-text>
        </view>
    </view>
</template>

<script>
    import apiUrl from '../../common/apiUrl.js';
/* export default 的用法：相当于提供一个接口给外界，让其他文件通过 import 来引入使用 ，export default仅有一个*/
    export default {
        data() {
            return {
                title: '',
                strings: ''
            }
        },
		/*  */
        onLoad: function (e) {
            uni.showLoading({
                title: "加载中..."
            })
            console.log(e);
            uni.request({
                url: apiUrl.announcementDetailApi + '?a_id=' + e.a_id,
                method: 'GET',
                data: {},
                success: res => {
                    console.log(res);
                    this.title = res.data.announcement_detail.announcement_name;
                    this.strings = res.data.announcement_detail.announcement_content;
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

    .art-content {
        line-height: 2em;
    }
</style>
