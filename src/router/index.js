
import Vue from 'vue'
import Router from 'vue-router'
// 甘肃项目
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
// 路由拦截
// Router.beforeEach((to,next,from)=>{
//   if(to.path = "/login"){
//     next()
//   }else{
//     let token = sessionStorage.getItem("token");
//     token ? next() : next("/login")
//   }
// })

export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/forgetpsd',
    component: () => import('@/views/forgetpas/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/my',
    component: Layout,
    name: '个人',
    hidden: true,
    children: [{
      path: 'personcenter',
      component: () => import('@/views/my/index'), 
      meta: {
        title: '个人中心',
        icon: 'table'
      }
    }]
  }
]

export const asyncRouterMap = [
    // 普通用户
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {
      roles: ['普通用户'],
    },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/recruitmentNews/index'),
      name: '',
      meta: {
        title: '招聘动态',
        icon: 'index',
        roles: ['普通用户'],
      }
    }]
  },
  {
    path: '/my',
    component: Layout,
    name: 'my',
    meta: {
      title: '',
      icon: '',
      roles:  ['普通用户'],
    },
    children: [{
      path: 'my',
      component: () => import('@/views/my/index'), 
      name: 'my',
      meta: {
        title: '我的信息',
        icon: 'myinfo',
        roles: ['普通用户'],
      }
    }]
  },

  {
    path: '/myDelivery',
    component: Layout,
    name: 'myDelivery',
    meta: {
      title: '',
      icon: '',
      roles: ['普通用户'],
    },
    children: [{
      path: 'myDelivery',
      component: () => import('@/views/myDelivery/index'), 
      name: 'myDelivery',
      meta: {
        title: '我的投递',
        icon: 'toudi6',
        roles: ['普通用户'],
      }
    }]
  },
  {
    path: '/personnelFiles',
    component: Layout,
    name: 'personnelFiles',
    meta: {
      title: '',
      icon: '',
      roles: ['普通用户'],
    },
    children: [{
      path: 'personnelFiles',
      component: () => import('@/views/personnelFiles/index'),
      name: 'personnelFiles',
      meta: {
        title: '人员档案',
        icon: 'dangan',
        roles: ['普通用户'],
      }
    }]
  },
// 人力专员
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'Dashboard',
  //   meta: {
  //     roles: ['人力专员'],
  //   },
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/personnelFiles/index'),
  //     meta: {
  //       title: '人员档案',
  //       icon: 'index',
  //       roles: ['人力专员'],
  //     }
  //   }]
  // },
  // {
  //   path: '/recruitmentManagement',
  //   component: Layout,
  //   name: 'recruitmentManagement',
  //   meta: {
  //     title: '',
  //     icon: '',
  //     roles:  ['人力专员'],
  //   },
  //   children: [{
  //     path: 'recruitmentManagement',
  //     component: () => import('@/views/recruitmentManagement/index'), 
  //     name: 'mrecruitmentManagement',
  //     meta: {
  //       title: '招聘管理',
  //       icon: 'myinfo',
  //       roles: ['人力专员'],
  //     }
  //   }]
  // },
  // {
  //   path: '/demandManagement',
  //   component: Layout,
  //   name: 'demandManagement',
  //   meta: {
  //     title: '',
  //     icon: '',
  //     roles:  ['人力专员'],
  //   },
  //   children: [{
  //     path: 'demandManagement',
  //     component: () => import('@/views/demandManagement/index'), 
  //     name: 'demandManagement',
  //     meta: {
  //       title: '招聘需求管理',
  //       icon: 'myinfo',
  //       roles: ['人力专员'],
  //     }
  //   }]
  // },
  // {
  //   path: '/personmanage',
  //   component: Layout,
  //   name: 'personmanage',
  //   meta: {
  //     title: '',
  //     icon: 'nested',
  //     roles: ['市公司管理', '省公司管理', '业主', '县公司管理', '项目部管理']
  //   },
  //   children: [{
  //     path: 'personmanage',
  //     component: () => import('@/views/personmanage/home/index'), // Parent router-view
  //     name: 'personmanage',
  //     meta: {
  //       title: '人员档案',
  //       icon: 'dangan',
  //       roles: ['市公司管理', '省公司管理', '业主', '县公司管理', '项目部管理']
  //     }
  //   }]
  // },
  //  超级管理
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]



export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
