<template>
    <view class="content">
        <view class="title">{{title}}</view>
        <view class="art-content">
            <rich-text class="richText" :nodes="strings"></rich-text>
        </view>

        <view v-for="(survey, index) in subjects" :key="index">

            <view class="uni-title uni-common-mt" v-if="survey.subject_type==='1'">
                <view class="subject-title uni-padding-wrap">
                    <view>{{survey.subject_content}}</view>
                </view>
                <radio-group @change="radioChange">
                    <label class="uni-list-cell uni-list-cell-pd" v-for="(item1,index1) in survey.options"
                           :key="index1">
                        <view>
                            <radio :value="item1.option_id"/>
                        </view>
                        <view>{{item1.option_content}}</view>
                    </label>
                </radio-group>
            </view>




            <view class="uni-form-item uni-column" v-if="survey.subject_type==='2'">
                <view class="title">{{survey.subject_content}}</view>
                <checkbox-group class="uni-list" @change="checkboxChangeq">
                    <label class="uni-list-cell uni-list-cell-pd" v-for="item in survey.options" :key="item.option_id">
                        <view>
                            <checkbox :value="item.option_id" :checked="item.checked"></checkbox>
                        </view>
                        <view>{{item.option_content}}</view>
                    </label>
                </checkbox-group>
            </view>




            <view class="uni-title uni-common-mt" v-if="survey.subject_type==='2'">
                <view class="subject-title uni-padding-wrap">
                    <view>{{survey.subject_content}}</view>
                </view>
                <checkbox-group @change="checkboxChange">
                    <label class="uni-list-cell uni-list-cell-pd" v-for="(item2,index2) in survey.options"
                           :key="index2">
                        <view>
                            <checkbox :value="item2.option_id" :checked="item2.checked">
                            </checkbox>
                        </view>
                        <view>{{item2.option_content}}</view>
                    </label>
                </checkbox-group>
            </view>

            <view class="uni-title uni-common-mt" v-if="survey.subject_type==='3'">
                <view class="subject-title uni-padding-wrap">
                    <view>{{survey.subject_content}}</view>
                </view>
                <view class="uni-list-cell uni-list-cell-pd">
                    <textarea class="uni-textarea" placeholder-style="" placeholder="内容"/>
                </view>
            </view>

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
                subjects: '',
                options: {}
            }
        },
        methods: {
            checkboxChangeq: function(e) {
                var checked = e.target.value
                console.log(checked)

            },


            radioChange(evt) {
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].option_id === evt.target.option_id) {
                        this.current = i;
                        break;
                    }
                }
            },
            checkboxChange: function (e) {

                console.log('==========');
                console.log(e);

                var options = this.options,
                    values = e.detail.value;

                console.log(values)

                for (var i = 0, lenI = options.length; i < lenI; ++i) {
                    const item2 = options[i]
                    if (values.indexOf(item2.option_id) >= 0) {
                        this.$set(item2, 'checked', true)
                    } else {
                        this.$set(item2, 'checked', false)
                    }
                }
            }
        },
        onLoad: function (e) {
            uni.showLoading({
                title: "加载中..."
            })
            console.log(e);
            uni.request({
                url: apiUrl.surveyDetailApi + '?survey_id=' + e.survey_id,
                method: 'GET',
                data: {},
                success: res => {
                    console.log(res);
                    this.title = res.data.survey_detail.survey_title;
                    this.strings = res.data.survey_detail.survey_content;
                    this.subjects = res.data.survey_detail.subjects;
                    this.options = res.data.survey_detail.subjects[0].options;

                    uni.hideLoading();
                },
                fail: () => {
                },
                complete: () => {
                }
            });
        },
    }


	// export default {
	// 	data() {
	// 		return {
	// 			title: 'label',
	// 			checkboxItems: [{
	// 					name: 'USA',
	// 					value: '美国'
	// 				},
	// 				{
	// 					name: 'CHN',
	// 					value: '中国',
	// 					checked: 'true'
	// 				}
	// 			],
	// 			radioItems: [{
	// 					name: 'USA',
	// 					value: '美国'
	// 				},
	// 				{
	// 					name: 'CHN',
	// 					value: '中国',
	// 					checked: 'true'
	// 				}
	// 			],
	// 			hidden: false
	// 		}
	// 	},
	// 	methods: {
	// 		checkboxChange: function(e) {
	// 			var checked = e.target.value
	// 			console.log(checked)
    //
	// 		},
	// 		radioChange: function(e) {
	// 			var checked = e.target.value
	// 			console.log(checked)
	// 		}
	// 	}
	// }
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
	
	
	.uni-list-cell {
		justify-content: flex-start
	}

	.uni-list .label-3 {
		padding: 0;
	}
    
    .label-2-text {
        flex: 1;
    }

    .title {
        line-height: 2em;
        font-weight: 700;
        font-size: 38 upx;
    }

    .art-content {
        line-height: 2em;
    }

    .uni-list-cell {
        justify-content: flex-start
    }


</style>
