
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
      return true
    }
  }
  
  /**
   * 递归过滤异步路由表，返回符合用户角色权限的路由表
   * @param {Array} asyncRouterMap
   * @param {Array} roles 
   */
export const filterAsyncRouter = (asyncRouterMap, roles) => {
    // console.log(asyncRouterMap)
    const accessedRouters = asyncRouterMap.filter(route => {
      if (hasPermission(roles, route)) {
        if (route.children && route.children.length) {
          route.children = filterAsyncRouter(route.children, roles)
        }
        return true
      }
      return false
    })
    return accessedRouters
  }
  
/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
    return targetarr.some(_ => arr.indexOf(_) > -1)
  }


export const DateFormat = (fmt) => { // author: 
  let newdatedata = new Date();
  let o = {
      "M+": newdatedata.getMonth() + 1, // 月份
      "d+": newdatedata.getDate(), // 日
      "h+": newdatedata.getHours(), // 小时
      "m+": newdatedata.getMinutes(), // 分
      "s+": newdatedata.getSeconds(), // 秒
      "q+": Math.floor((newdatedata.getMonth() + 3) / 3), // 季度
      "S": newdatedata.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (newdatedata.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
}

export const scaleMaintenancedata = (data) => { // author: 
  let newdata = JSON.parse(JSON.stringify(data));
  newdata.forEach((item,index) => {
     item['sorts'] = ['可研批复', '概算批复', '结算审价'];
     item['sorts_real_investment'] = [item.real_investment, item.budgetary_funds, item.info_examine_money];
     item['sorts_date'] = [item.info_feasibilityStudy_date, item.info_firstsetup_date, item.info_examine_date];
     item['sorts_docnum'] = [item.info_feasibilityStudy_docnum, item.info_firstsetup_docnum, '/'];
     item['sorts_tenlineadd'] = [item.scale_tenlineadd, item.scale_tenlineadd1, item.scale_tenlineadd2];
     item['sorts_tenlineupdate'] = [item.scale_tenlineupdate, item.scale_tenlineupdate1, item.scale_tenlineupdate2];
     item['sorts_smalllineadd'] = [item.scale_smalllineadd, item.scale_smalllineadd1, item.scale_smalllineadd2];
     item['sorts_smalllineupdate'] = [item.scale_smalllineupdate, item.scale_smalllineupdate1, item.scale_smalllineupdate2];
     item['sorts_distributionaddplatform'] = [item.scale_distributionaddplatform, item.scale_distributionaddplatform1, item.scale_distributionaddplatform2];
     item['sorts_distributionaddkva'] = [item.scale_distributionaddkva, item.scale_distributionaddkva1, item.scale_distributionaddkva2];
     item['sorts_distributionupdateplatform'] = [item.scale_distributionupdateplatform, item.scale_distributionupdateplatform1, item.scale_distributionupdateplatform2];
     item['sorts_distributionupdatekva'] = [item.scale_distributionupdatekva, item.scale_distributionupdatekva1, item.scale_distributionupdatekva2];
     item['sorts_switch'] = [item.scale_switch, item.scale_switch1, item.scale_switch2];
     item['sorts_meterboxadd'] = [item.scale_meterboxadd, item.scale_meterboxadd1, item.scale_meterboxadd2];
     item['sorts_meterboxupdate'] = [item.scale_meterboxupdate, item.scale_meterboxupdate1, item.scale_meterboxupdate2];
     item['sorts_meteradd'] = [item.scale_meteradd, item.scale_meteradd1, item.scale_meteradd2];
     item['sorts_meterupdate'] = [item.scale_meterupdate, item.scale_meterupdate1, item.scale_meterupdate2];
    //  item['sorts_distributionupdatekva'] = [item.scale_meteradd, item.scale_meteradd1, item.scale_meteradd2];
    //  item['sorts'] = ['可研批复', '概算批复', '结算审价'];
  })
  return newdata
}

// 防抖



// 节流

export function throttle(fn,delay = 1000){
  var lastTime;
  var timer;
  var delay = delay || 200;
  console.log(delay)
  return function() {
    var args = arguments;
    var that = this;
    // 记录当前函数触发的时间
    var nowTime = Date.now();
    if (lastTime && nowTime - lastTime < delay) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        // 记录上一次函数触发的时间
        lastTime = nowTime;
        // 修正this指向问题
        fn.apply(that, args);
      }, delay);
    }else{
      lastTime = nowTime;
      fn.apply(that, args);
    }
  }
} 
