import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Regist from "@/components/Regist"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
			path: '/regist',
			name: 'Regist',
			component: Regist
		}
  ]
})
