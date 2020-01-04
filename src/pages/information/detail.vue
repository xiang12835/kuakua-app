<template>
    <view class="content">
        <view class="title">{{title}}</view>
        <view class="time">{{create_time}}</view>
        <view class="art-content">
            <rich-text class="richText" :nodes="strings"></rich-text>
        </view>

        <!-- <view class="example-body">
            <button class="button" type="button" @click="togglePopup('bottom', 'share')">底部分享</button>
        </view> -->
		
		
        <!-- 底部分享弹窗 -->
		<!-- 
        <uni-popup ref="share" :type="type" :custom="true" @change="change">
            <view class="uni-share">
                <view class="uni-share-title">分享到</view>
                <view class="uni-share-content">
                    <view v-for="(item, index) in bottomData" :key="index" class="uni-share-content-box">
                        <view class="uni-share-content-image">
                            <image :src="item.icon" class="image"/>
                        </view>
                        <view class="uni-share-content-text">{{ item.text }}</view>
                    </view>
                </view>
                <view class="uni-share-btn" @click="cancel('share')">取消分享</view>
            </view>
        </uni-popup>
		-->
		 
    </view>

</template>

<script>
    import apiUrl from '../../common/apiUrl.js';
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import uniIcons from '@/components/uni-icons/uni-icons.vue'
    import wxshare from '../../share.js';


    export default {
        components: {
            uniPopup,
            uniIcons
        },
        data() {
            return {
                signData: {},
				h5_url:'',
                title: '',
                strings: '',
                create_time: '',
                show: false,
                type: '',
                list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				content: '底部弹出 popup',
                bottomData: [{
						text: '微信',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
						name: 'wx'
					},
					{
						text: '支付宝',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
						name: 'wx'
					},
                    {
                        text: 'QQ',
                        icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
                        name: 'qq'
                    },
                    {
                        text: '新浪',
                        icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png',
                        name: 'sina'
                    }
                    // {
                    //     text: '百度',
                    //     icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png',
                    //     name: 'copy'
                    // },
                    // {
                    //     text: '其他',
                    //     icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
                    //     name: 'more'
                    // }
                ]
            }
        },
        // onNavigationBarButtonTap(e) {
        //     if (e.index == 0) {
        //         console.log("share");
        //         this.togglePopup('bottom', 'share')
        //     }
        //     if (e.index == 1) {
        //         console.log("favorite");
        //     }
        // },
        methods: {
			
			
			
			

            getWxSignData() {

                const appId = "wx3c5359404a314750";

                var pageUrl = window.location.href;
                pageUrl = pageUrl.split("#")[0];

                // pageUrl = this.h5_url;
                // pageUrl = "http://www.baidu.com";


                console.log('---xxxxxxxxxxxxxxxxxxxx')
                console.log(pageUrl);
                // alert(pageUrl)

                uni.request({
                    url: apiUrl.WxShareApi + '?appId=' + appId + '&pageUrl=' + pageUrl,
                    method: 'GET',
                    data: {},
                    success: res => {

                        console.log("1111111111111");

                        console.log(res);
                        this.signData = res.data.result;

                        console.log("==============");
                        console.log(this.h5_url);

                        console.log("#########");

                        console.log(this.signData);

                        uni.hideLoading();



                        var shareData = {

                            "title": "这是标题",
                            "desc": "这是描述",
                            "link": window.location.href,
                            "imgUrl": "https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png",

                        }


                        console.log('---------------------------');
                        console.log(this.signData.timestamp);
                        console.log(this.signData.nonceStr);
                        console.log(this.signData.signature);


                        wxshare(this.signData, shareData)





                    },
                    fail: () => {
                    },
                    complete: () => {
                    }
                });

            },
            togglePopup(type, open) {
                switch (type) {
                    case 'top':
                        this.content = '顶部弹出 popup'
                        break
                    case 'bottom':
                        this.content = '底部弹出 popup'
                        break
                    case 'center':
                        this.content = '居中弹出 popup'
                        break
                }
                this.type = type
                if (open === 'tip') {
                    this.show = true
                } else {
                    this.$refs[open].open()
                }
            },
            cancel(type) {
                if (type === 'tip') {
                    this.show = false
                    return
                }
                this.$refs[type].close()
            },
            change(e) {
                console.log(e.show)
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
					this.h5_url = res.data.news_detail.h5_url;
                    uni.hideLoading();



                    this.getWxSignData();





                    // var dataForWeixin = {
                    //     "title": "这是标题",
                    //     "desc": "这是描述",
                    //     "linkurl": this.h5_url,
                    //     "img": "https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png",
                    //
                    // };
                    //
                    //
                    // wxshare(this.h5_url, dataForWeixin);




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

    /* 底部分享 */
    .uni-share {
        background: #fff;
    }

    .uni-share-title {
        line-height: 60 upx;
        font-size: 24 upx;
        padding: 15 upx 0;
        text-align: center;
    }

    .uni-share-content {
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
    }

    .uni-share-content-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        box-sizing: border-box;
    }

    .uni-share-content-image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60 upx;
        height: 60 upx;
        overflow: hidden;
        border-radius: 10 upx;
    }

    .uni-share-content-image .image {
        width: 100%;
        height: 100%;
    }

    .uni-share-content-text {
        font-size: 26 upx;
        color: #333;
        padding-top: 5px;
        padding-bottom: 10px;
    }

    .uni-share-btn {
        height: 90 upx;
        line-height: 90 upx;
        border-top: 1px #f5f5f5 solid;
        text-align: center;
        color: #666;
    }

</style>
