import wx from 'weixin-js-sdk';




// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// var params = new URLSearchParams();
// params.append('url', href)
// axios({
// 	method: 'post',
// 	url: "/share",
// 	data: params
// }).then(res => {
// 		wxshare(res.data, "");
// 	});



function wxshare(signData, shareData) {
    // var url = window.location.href; //分享的文章地址
    var appId = 'wx3c5359404a314750';
    var timestamp = signData.timestamp;
    var nonceStr = signData.nonceStr;
    var signature = signData.signature;

    console.log('hhhhhhhhhhhhhhhhhhhh');
    console.log(signature);

    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function () {

        // 分享给朋友
        wx.updateAppMessageShareData({
            title: shareData.title, // 分享标题
            desc: shareData.desc, // 分享描述
            link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareData.imgUrl, // 分享图标
            success: function () {
                // 设置成功
                console.log("success")
            },
            fail:function (e) {
                console.log(e)
            }
        });

        // wx.updateAppMessageShareData({
        //         title: shareData.link, // 分享标题
        //         desc: "shareData.desc", // 分享描述
        //         link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //         imgUrl: "", // 分享图标
        //         success: function () {
        //             // 设置成功
        //             console.log("success")
        //         },
        //         fail:function (e) {
        //             console.log(e)
        //         }
        //     },
        // );

        //分享朋友圈
        wx.updateTimelineShareData({
            title: shareData.title, // 分享标题
            link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareData.imgUrl, // 分享图标
            success: function () {
                // 设置成功
            }
        })




        // wx.updateTimelineShareData({
        //     title: shareData.title, // 分享标题
        //     desc: shareData.desc, // 分享描述
        //     link: shareData.url, // 分享链接
        //     imgUrl: shareData.imgUrl, // 分享图标
        //     type: "", // 分享类型,music、video或link，不填默认为link
        //     dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
        //     success: function () {
        //     },
        //     cancel: function () {
        //         // 用户取消分享后执行的回调函数
        //     }
        // });
    });
}



export default wxshare;

