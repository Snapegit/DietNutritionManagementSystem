import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import shiwuyingyangList from '../pages/shiwuyingyang/list'
import shiwuyingyangDetail from '../pages/shiwuyingyang/detail'
import shiwuyingyangAdd from '../pages/shiwuyingyang/add'
import yinshixinxiList from '../pages/yinshixinxi/list'
import yinshixinxiDetail from '../pages/yinshixinxi/detail'
import yinshixinxiAdd from '../pages/yinshixinxi/add'
import yinshijiluList from '../pages/yinshijilu/list'
import yinshijiluDetail from '../pages/yinshijilu/detail'
import yinshijiluAdd from '../pages/yinshijilu/add'
import yingyangpingguList from '../pages/yingyangpinggu/list'
import yingyangpingguDetail from '../pages/yingyangpinggu/detail'
import yingyangpingguAdd from '../pages/yingyangpinggu/add'
import yinshileixingList from '../pages/yinshileixing/list'
import yinshileixingDetail from '../pages/yinshileixing/detail'
import yinshileixingAdd from '../pages/yinshileixing/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'shiwuyingyang',
					component: shiwuyingyangList
				},
				{
					path: 'shiwuyingyangDetail',
					component: shiwuyingyangDetail
				},
				{
					path: 'shiwuyingyangAdd',
					component: shiwuyingyangAdd
				},
				{
					path: 'yinshixinxi',
					component: yinshixinxiList
				},
				{
					path: 'yinshixinxiDetail',
					component: yinshixinxiDetail
				},
				{
					path: 'yinshixinxiAdd',
					component: yinshixinxiAdd
				},
				{
					path: 'yinshijilu',
					component: yinshijiluList
				},
				{
					path: 'yinshijiluDetail',
					component: yinshijiluDetail
				},
				{
					path: 'yinshijiluAdd',
					component: yinshijiluAdd
				},
				{
					path: 'yingyangpinggu',
					component: yingyangpingguList
				},
				{
					path: 'yingyangpingguDetail',
					component: yingyangpingguDetail
				},
				{
					path: 'yingyangpingguAdd',
					component: yingyangpingguAdd
				},
				{
					path: 'yinshileixing',
					component: yinshileixingList
				},
				{
					path: 'yinshileixingDetail',
					component: yinshileixingDetail
				},
				{
					path: 'yinshileixingAdd',
					component: yinshileixingAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
