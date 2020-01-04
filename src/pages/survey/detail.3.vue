<template>
    <view>
        <view class="title">{{title}}</view>
        <view class="art-content">
            <rich-text class="richText" :nodes="strings"></rich-text>
        </view>


        <view class="uni-padding-wrap uni-common-mt">
            <form @submit="formSubmit" @reset="formReset">


                <view v-for="(sub, subIndex) in subjects" :key="sub.subject_id" class="sub">

                    <view v-if="sub.subject_type==='1'">

                        <view class="cu-form-group- margin-top">
                            <view class="title">{{subIndex + 1}}. {{sub.subject_content}}</view>
                        </view>

                        <radio-group class="block" @change="RadioChange" v-for="opt in sub.options"
                                     :key="opt.option_id">
                            <view class="cu-form-group">
                                <view class="title">{{opt.option_content}}</view>
                                <!--<radio :class="rradio=='{{opt.option_id}}'?'checked':''" :checked="radio=='{{opt.option_id}}'?true:false" :value="opt.option_id"></radio>-->
                                <radio :checked="selected_radio==opt.option_id?true:false"
                                       :value="opt.option_id"></radio>
                            </view>
                        </radio-group>

                    </view>

                    <view v-else-if="sub.subject_type==='2'">

                        <view class="cu-form-group- margin-top">
                            <view class="title">{{subIndex + 1}}. {{sub.subject_content}}</view>
                        </view>

                        <checkbox-group class="block" @change="CheckboxChange" v-for="opt in sub.options"
                                        :key="opt.option_id">
                            <view class="cu-form-group">
                                <view class="title">{{opt.option_content}}</view>
                                <checkbox :class="checkbox[0].checked?'checked':''"
                                          :checked="checkbox[0].checked?true:false" :value="opt.option_id"></checkbox>

                                <!--<checkbox :value="opt.option_id" checked="false">
                                </checkbox>-->

                            </view>
                        </checkbox-group>

                    </view>
					
					
					<view v-else-if="sub.subject_type==='3'">
						
						<view class="cu-form-group- margin-top">
						    <view class="title">{{subIndex + 1}}. {{sub.subject_content}}</view>
						</view>
						
					<view class="cu-form-group">
						<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="多行文本输入框"></textarea>
					</view>
					</view>

                </view>


                <!--
                <radio-group class="block" @change="RadioChange">
                    <view class="cu-form-group">
                        <view class="title">单选操作(A)</view>
                        <radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
                    </view>
                </radio-group>

                <checkbox-group class="block" @change="CheckboxChange">
                    <view class="cu-form-group margin-top">
                        <view class="title">复选选操作(checkbox)</view>
                        <checkbox :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A"></checkbox>
                    </view>
                </checkbox-group>
                -->


                <view class="uni-btn-v">
                    <button form-type="submit">Submit</button>
                    <!-- <button type="default" form-type="reset">Reset</button> -->
                </view>
            </form>
        </view>
    </view>
</template>
<script>
    import apiUrl from '../../common/apiUrl.js';

    var graceChecker = require("../../common/graceChecker.js");
    export default {
        data() {
            return {
                subjects: [],
                title: '',
                strings: '',
                selected_radio: '',
                checkbox: [{
                    value: "201911211629318490974807",
                    checked: true
                }, {
                    value: "201911211629429807042319",
                    checked: true
                }, {
                    value: "201911211629472869872140",
                    checked: false
                }],
            }
        },
        methods: {
            RadioChange(e) {
                this.selected_radio = e.detail.value;
                console.log(this.selected_radio);
                console.log(e);
            },
            CheckboxChange(e) {

                // console.log('============');
                // console.log(this.subjects);
                //
                //
                // for (var m=0; m <= this.checkbox.length; ++m) {
                //     var sub = this.subjects[m];
                //     console.log("++++++");
                //     console.log(sub);
                //     console.log(this.subjects[m].subject_type);
                //
                //     if (sub['subject_type'] === '2') {
                //
                //         var options = sub.options;
                //         for (var n=0; j<options.length; ++n) {
                //             this.checkbox[n].value = options[n].option_id;
                //         }
                //
                //     }
                //
                // }
                //
                // console.log(this.checkbox);



                var items = this.checkbox,
                    values = e.detail.value;
                
                console.log('??????????');
                
                console.log(values);
                for (var i = 0, lenI = items.length; i < lenI; ++i) {
                    items[i].checked = false;
                    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                        if (items[i].value == values[j]) {
                            items[i].checked = true;
                            break
                        }
                    }
                }


                // var options = this.checkbox,
                //     values = e.detail.value;

                // console.log(values)

                // for (var i = 0, lenI = options.length; i < lenI; ++i) {
                //     const item2 = options[i];
                //     if (values.indexOf(item2.value) >= 0) {
                //         this.$set(item2, 'checked', true)
                //     } else {
                //         this.$set(item2, 'checked', false)
                //     }
                // }




            },


            formSubmit: function (e) {
                // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                //定义表单规则
                //             var rule = [
                //                 {name:"nickname", checkType : "string", checkRule:"1,3",  errorMsg:"姓名应为1-3个字符"},
                //                 {name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
                //                 {name:"loves", checkType : "notnull", checkRule:"",  errorMsg:"请选择爱好"}
                //             ];
                //进行表单检查
                var formData = e.detail.value;
                var checkRes = graceChecker.check(formData, rule);

                checkRes = true;

                if (checkRes) {
                    uni.showToast({title: "验证通过!", icon: "none"});
                } else {
                    uni.showToast({title: graceChecker.error, icon: "none"});
                }
            },
            formReset: function (e) {
                console.log('清空数据')
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
                    // this.options = res.data.survey_detail.subjects[0].options;

                    uni.hideLoading();

                },
                fail: () => {
                },
                complete: () => {
                }
            });
        },
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
        font-size: 28 upx;
        line-height: inherit
    }

    .cu-form-group .title {
        min-width: calc(4em + 15px);
    }


</style>
