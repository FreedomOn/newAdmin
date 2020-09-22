
import Vue from 'vue'
import Router from 'vue-router'
// 报表统计  省公司管理
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
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/my',
    component: Layout,
    // redirect: '/my/workout',
    name: '个人',
    hidden: true,
    children: [
      {
        path: 'personcenter',
        component: () => import('@/views/my/index'), // Parent router-view
        name: 'workout',
        meta: { title: '个人中心', icon: 'zonghe' }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {
      roles: ['省公司管理']
    },
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/Batchmanagement/index')
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {
      roles: ['超级管理员']
    },
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/queryQuartz/index')
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {
      roles: ['市公司管理']
    },
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/projectprogressfill/index')
    }]
  },
  {
    path: '/Reportstatistics',
    component: Layout,
    name: 'projectprogressfill',
    meta: {
      title: '工程进度',
      icon: 'nested',
      roles: ['市公司管理']
    },
    children: [
     
      {
        path: 'projectprogressfill',
        component: () => import('@/views/projectprogressfill/index'), // Parent router-view
        name: 'projectprogressfill',
        meta: { title: '工程进度汇总表', icon: 'zonghe',roles: ['市公司管理'] }
      },
      
    ]
  },

  {
    path: '/Reportstatistics',
    component: Layout,
    // redirect: '/personmanage/personmanage',
    name: 'Materialfill',
    // hidden: true,
    meta: {
        title: '工程项目维护',
        icon: 'nested',
        roles: ['市公司管理']
      },
      children: [
        {
          path: 'Projectmanagement',
          component: () => import('@/views/Projectmanagement/index'), // Parent router-view
          name: 'Projectmanagement',
          meta: { title: '基础信息维护', icon: 'zonghe',roles: ['市公司管理'] }
        },
        
        {
          path: 'Materialsummary',
          component: () => import('@/views/Materialsummary/index'), // Parent router-view
          name: 'Materialsummary',
          meta: { title: '物资信息维护', icon: 'zonghe',roles: ['市公司管理'] }
        },
        {
          path: 'scaleMaintenance',
          component: () => import('@/views/scaleMaintenance/index'), // Parent router-view
          name: 'scaleMaintenance',
          meta: { title: '工程规模维护', icon: 'zonghe',roles: ['市公司管理'] }
        },
        
        
      ]
  },
  {
    path: '/Reportstatistics',
    component: Layout,
    // redirect: '/personmanage/personmanage',
    name: 'Projectschedulecontrol',
    // hidden: true,
    meta: {
      title: '工程进度填报',
      icon: 'nested',
      roles: ['市公司管理']
    },
    children: [
      {
        path: 'Materialfill',
        component: () => import('@/views/Materialfill/index'), // Parent router-view
        name: 'Materialfill',
        meta: { title: '物资到货情况填报', icon: 'zonghe',roles: ['市公司管理'] }
      },
      {
        path: 'Projectschedulecontrol',
        component: () => import('@/views/Projectschedulecontrol/index'), // Parent router-view
        name: 'Projectschedulecontrol',
        meta: { title: '工程进度情况填报', icon: 'zonghe',roles: ['市公司管理'] }
      },
    ]
  },
  {
    path: '/Reportstatistics',
    component: Layout,
    // redirect: '/personmanage/personmanage',
    name: 'citypay',
    // hidden: true,
    meta: {
      title: '工程进度填报',
      icon: 'nested',
      roles: ['市公司管理']
    },
    children: [
      {
        path: 'citypay',
        component: () => import('@/views/pay/citypay'), // Parent router-view
        name: 'citypay',
        meta: { title: '财务报账支付率', icon: 'zonghe',roles: ['市公司管理'] }
      },
    ]
  },
  {
    path: '/Reportstatistics',
    component: Layout,
    // redirect: '/personmanage/personmanage',
    name: 'finishedManagement',
    // hidden: true,
    meta: {
      title: '工程进度填报',
      icon: 'nested',
      roles: ['市公司管理']
    },
    children: [
      {
        path: 'finishedManagement',
        component: () => import('@/views/finishedManagement/Commissmanagement'), // Parent router-view
        name: 'finishedManagement',
        meta: { title: '投运管理', icon: 'zonghe',roles: ['市公司管理'] }
      },
      // {
      //   path: 'finishedManagement',
      //   component: () => import('@/views/finishedManagement/cityindex'), // Parent router-view
      //   name: 'finishedManagement',
      //   meta: { title: '竣工管理', icon: 'zonghe',roles: ['市公司管理'] }
      // },
    ]
  },
  {
    path: '/Reportstatistics',
    component: Layout,
    // redirect: '/personmanage/personmanage',
    name: 'finalAccount',
    // hidden: true,
    meta: {
      title: '工程进度填报',
      icon: 'nested',
      roles: ['市公司管理']
    },
    children: [
      {
        path: 'finalAccount',
        component: () => import('@/views/finalAccount/index'), // Parent router-view
        name: 'finalAccount',
        meta: { title: '结算管理', icon: 'zonghe',roles: ['市公司管理'] }
      },
    ]
  },


  {
    path: '/Reportstatistics',
    component: Layout,
    name: 'Projectschedulecontrol',
    meta: {
      title: '一、工程进度管理',
      icon: 'nested',
      roles: ['省公司管理']
    },
    children: [
      {
        path: 'Batchmanagement',
        component: () => import('@/views/Batchmanagement/index'), // Parent router-view
        name: 'Batchmanagement',
        meta: { title: '项目批次管理', icon: 'zonghe',roles: ['省公司管理'] }
      },
      {
        path: 'engineeingNongWang',
        component: () => import('@/views/engineeingNongWang/index'), // Parent router-view
        name: 'engineeingNongWang',
        meta: { title: '工程批次汇总表', icon: 'zonghe',roles: ['省公司管理'] }
      },
      {
        path: 'ProgressStatisticsInfo',
        component: () => import('@/views/ProgressStatisticsInfo/index1'), // Parent router-view
        name: 'ProgressStatisticsInfo',
        meta: { title: '工程进度管控统计表', icon: 'zonghe',roles: ['省公司管理'] }
      },
      {
        path: 'engineeringMaterial',
        component: () => import('@/views/engineeringMaterial/index1'), // Parent router-view
        name: 'engineeringMaterial',
        meta: { title: '工程物资到货统计表', icon: 'zonghe',roles: ['省公司管理'] }
      },
      {
        path: 'pay',
        component: () => import('@/views/pay/index'), // Parent router-view
        name: 'pay',
        meta: { title: '财务报账支付率', icon: 'zonghe',roles: ['省公司管理'] }
      },
      {
        path: 'Customtable',
        component: () => import('@/views/Customtable/index'), // Parent router-view
        name: 'Customtable',
        meta: { title: '自定义表格', icon: 'zonghe',roles: ['省公司管理', '市公司管理'] }
      },
    ]
  },



  {
    path: '/Reportstatistics',
    component: Layout,
    name: 'finishedManagement',
    meta: {
      title: '二、工程结算管理',
      icon: 'nested',
      roles:  ['省公司管理']
    },
    children: [
      {
        path: 'basicInformation',
        component: () => import('@/views/basicInformation/index'), // Parent router-view
        name: 'basicInformation',
        meta: { title: '工程基本信息', icon: 'zonghe',roles: ['省公司管理'] }
      },
      // {
      //   path: 'finishedManagement',
      //   component: () => import('@/views/finishedManagement/index'), // Parent router-view
      //   name: 'finishedManagement',
      //   meta: { title: '竣工管理', icon: 'zonghe',roles: ['省公司管理'] }
      // },
      {
        path: 'finishedManagement',
        component: () => import('@/views/finishedManagement/touyun'), // Parent router-view
        name: 'finishedManagement',
        meta: { title: '投运管理', icon: 'zonghe',roles: ['省公司管理'] }
      },
      {
        path: 'settlementManagement',
        component: () => import('@/views/settlementManagement/index'), // Parent router-view
        name: 'settlementManagement',
        meta: { title: '结算管理', icon: 'zonghe',roles: ['省公司管理'] }
      },
    ]
  },
  // 超级管理员
  {
    path: '/implementationSql',
    component: Layout,
    name: 'implementationSql',
    meta: {
      title: '执行sql',
      icon: 'nested',
      roles: ['超级管理员']
    },
    children: [
      {
        path: 'implementationSql',
        component: () => import('@/views/implementationSql/index'), // Parent router-view
        name: 'implementationSql',
        meta: { title: '执行sql', icon: 'zonghe', roles: ['超级管理员'] }
      },
    ]
  },
  {
    path: '/queryDB',
    component: Layout,
    name: 'queryDB',
    meta: {
      title: '数据库查询',
      icon: 'nested',
      roles: ['超级管理员']
    },
    children: [
      {
        path: 'queryDB',
        component: () => import('@/views/queryDB/index'), // Parent router-view
        name: 'queryDB',
        meta: { title: '数据库查询', icon: 'zonghe', roles: ['超级管理员'] }
      },
    ]
  },
  {
    path: '/queryQuartz',
    component: Layout,
    name: 'queryQuartz',
    meta: {
      title: '内外网同步日志',
      icon: 'nested',
      roles: ['超级管理员']
    },
    children: [
      {
        path: 'queryQuartz',
        component: () => import('@/views/queryQuartz/index'), // Parent router-view
        name: 'queryQuartz',
        meta: { title: '内外网同步日志', icon: 'zonghe', roles: ['超级管理员'] }
      },
    ]
  },
//  超级管理
  
  { path: '*', redirect: '/404', hidden: true }
]


//实例化vue的时候只挂载constantRouter
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

