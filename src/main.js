import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()

// router.beforeEach(function (to, from, next) {
// 	const agent = navigator.userAgent
// 	const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
// 	// XXX: 修复iOS版微信HTML5 History兼容性问题
// 	if (isiOS && to.path !== location.pathname) {
// 		location.assign(to.fullPath)
// 	} else {
// 		next()
// 	}
// })
