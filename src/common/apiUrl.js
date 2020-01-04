const host = 'http://118.25.81.114:9000';
// const host = 'http://118.25.81.114:10000';
// const host = 'http://localhost:11000';

// 微信

const WxShareApi = host + '/api/wx/share_page/signature';


// 其他
const adviceListApi = 'https://unidemo.dcloud.net.cn/api/news';
const adviceDetailApi = 'https://unidemo.dcloud.net.cn/api/news/36kr/';


// 用户模块
const userLoginApi = host + '/api/user/v1/phone/login';
const userHomeInfoApi = host + '/api/user/v1/home_info';


// 资讯模块
const newsCateListApi = host + '/api/information/v1/news/cate_list';
const newsListByCateApi = host + '/api/information/v1/news_list/by_cate';
const newsDetailApi = host + '/api/information/v1/news_detail';


// 精选文案
const docListHotApi = host + '/api/information/v1/hot_doc_list';
const docCateListApi = host + '/api/information/v1/doc/cate_list';
const docListByCateApi = host + '/api/information/v1/doc_list/by_cate';
const docDetailApi = host + '/api/information/v1/doc_detail';




// 社区模块
const surveyListApi = host + '/api/community/v1/survey_list';
const surveyDetailApi = host + '/api/community/v1/survey_detail';
const surveySubmitApi = host + '/api/community/v1/survey/submit';

const announcementListApi = host + '/api/community/v1/announcement_list/by_type';
const announcementDetailApi = host + '/api/community/v1/announcement_detail';
const announcementTypeApi = host + '/api/community/v1/announcement/type_list';
const announcementRecordApi = host + '/api/community/v1/announcement_record';
const forumTypeListApi = host + '/api/community/v1/forum/type_list';
const forumListByTypeApi = host + '/api/community/v1/forum_list/by_type';
const forumCreateApi = host + '/api/community/v1/forum_create';
const forumListApi = host + '/api/community/v1/forum_list';
const forumAndCommentsApi = host + '/api/community/v1/forum_and_comments';
const CommentCreateApi = host + '/api/community/v1/forum/comment_create';


// 产品模块
const productCateListApi = host + '/api/information/v1/product/cate_list';
const productListByCateApi = host + '/api/information/v1/product_list/by_cate';
const productDetailApi = host + '/api/information/v1/product_detail';
const promoteListApi = host + '/api/product/v1/promote_list';
const promoteDetailApi = host + '/api/product/v1/promote_detail';
const promoteAmountAddApi = host + '/api/product/v1/promote/add_amount';
const promoteRecordListApi = host + '/api/product/v1/promote/record_list';
const promoteRecordDetailApi = host + '/api/product/v1/promote/record_detail';
const activityListApi = host + '/api/product/v1/activity_list';
const activityDetailApi = host + '/api/product/v1/activity_detail';
const activityEnrollApi = host + '/api/product/v1/activity_enroll';
const activityQRcodeApi = host + '/api/product/v1/activity/qr_code';
const productSwiperListApi = host + '/api/product/v1/swiper_list';
const productSwiperDetailApi = host + '/api/product/v1/swiper_detail';


export default {
	WxShareApi,
	userLoginApi,
	userHomeInfoApi,
	surveyListApi,
	surveyDetailApi,
	surveySubmitApi,
	adviceListApi,
	adviceDetailApi,
	announcementListApi,
	announcementDetailApi,
	announcementTypeApi,
	announcementRecordApi,
	newsCateListApi,
	newsListByCateApi,
	newsDetailApi,
	docDetailApi,
	docCateListApi,
	docListByCateApi,
	docListHotApi,
	forumTypeListApi,
	forumListByTypeApi,
	forumCreateApi,
	forumListApi,
	forumAndCommentsApi,
	CommentCreateApi,
	productCateListApi,
	productListByCateApi,
	productDetailApi,
	promoteListApi,
	promoteDetailApi,
	promoteAmountAddApi,
	promoteRecordListApi,
	promoteRecordDetailApi,
	activityListApi,
	activityDetailApi,
	activityEnrollApi,
	activityQRcodeApi,
	productSwiperListApi,
	productSwiperDetailApi
}
