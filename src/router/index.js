import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Regist from "@/components/Regist"
import OptionDetail from "@/components/OptionDetail"
import List from '@/components/list/List'
import Task from '@/components/task/Task'
import Mine from '@/components/mine/Mine'
import Recommend from '@/components/mine/Recommend'
import TaskDetail from '@/components/taskDetail/taskDetail'

Vue.use(Router)

export default new Router({
	linkActiveClass: 'active',
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
		,{
			path: '/optiondetail',
			name: 'OptionDetail',
			component: OptionDetail
		},
		{
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },{
      path: '/taskDetail',
      name: 'TaskDetail',
      component: TaskDetail
    },
    
  ]
})
