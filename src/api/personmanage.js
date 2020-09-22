
import qs from 'qs'
import request from '@/utils/request'

// 查询市公司
export const xiaxia = (user_orgCode, userType, user_orgname,checkType) => {
    // 查询部门
    //  let that = this
    return new Promise((resolve, reject) =>{
      request({
       method: 'post',
       url:'GSPdwPC/ArchivesAction!getFirstOrg.action',
       data: JSON.stringify({'userOrg': user_orgCode,'userType':userType, 'userOrgName': user_orgname,'checkType': checkType})
     })
       .then((res) => {
       
         resolve(res.data.data)
         // that.allorgs = 
       }).catch((err) => {
         reject(err)
       })
    })
  }

// 查询市公司
export const getFirstOrg = (postdata) => {
  // 查询部门
  //  let that = this
  return new Promise((resolve, reject) =>{
    request({
     method: 'post',
     url:'GSPdwPC/ArchivesAction!getFirstOrg.action',
     data: JSON.stringify(postdata)
   })
     .then((res) => {
     
       resolve(res.data)
       // that.allorgs = 
     }).catch((err) => {
       reject(err)
     })
  })
}

  // 查询外包公司
export const queryOutCompany = (subCompany) => {
  // 查询部门
  //  let that = this
  return new Promise((resolve, reject) =>{
    request({
     method: 'post',
     url:'GSPdwPC/ArchivesAction!queryOutCompany.action',
     data: JSON.stringify({'subCompany': subCompany})
   })
     .then((res) => {
     
       resolve(res.data.data)
       // that.allorgs = 
     }).catch((err) => {
       reject(err)
     })
  })
}

 // 查询区县公司
 export const getplace = (user_orgCode, userType, user_orgname, checkType) => {
    // 查询部门
    return new Promise((resolve, reject) =>{
      request({
       method: 'post',
       url:'GSPdwPC/ArchivesAction!queryPlace.action',
       data: JSON.stringify({'userOrg': user_orgCode,'userType':userType, 'userOrgName': user_orgname, 'checkType':checkType})
     })
       .then((res) => {
        
         resolve(res.data.data)
         // that.allorgs = 
       }).catch((err) => {
         reject(err)
       })
    })
 }

 // 查询区县公司
 export const getplace2 = (data) => {
  // 查询部门
  return new Promise((resolve, reject) =>{
    request({
     method: 'post',
     url:'GSPdwPC/ArchivesAction!queryPlace.action',
     data: JSON.stringify(data)
   })
     .then((res) => {
      
       resolve(res.data)
       // that.allorgs = 
     }).catch((err) => {
       reject(err)
     })
  })
}

 // 查询所在单位
 export const getallOrg = (user_orgCode, userType, user_orgname,checkType) => {
    // 查询部门
    return new Promise((resolve, reject) =>{
      request({
       method: 'post',
       url:'GSPdwPC/ArchivesAction!getAllOrg.action',
       data: JSON.stringify({'userOrg': user_orgCode,'userType':userType, 'userOrgName': user_orgname, 'checkType':checkType})
     })
       .then((res) => {
        
         resolve(res.data.data)
         // that.allorgs = 
       }).catch((err) => {
         reject(err)
       })
    })
 }

 // s施工计划查单位
 export const searchCommpany = ( user_org, user_placeCode) => {
  // 查询部门
  return new Promise((resolve, reject) =>{
    request({
     method: 'post',
     url:'GSPdwPC/ConstructionPlanAction!searchConstructionPlanImplementCompany.action',
     data: JSON.stringify({'constructionPlan.archives.user_place': user_org, 'constructionPlan.archives.user_placeCode':user_placeCode})
   })
     .then((res) => {
      
       resolve(res.data.data)
       // that.allorgs = 
     }).catch((err) => {
       reject(err)
     })
  })
}

 // 查询单位下的部门
 export const findDeptByOrg = (userOrg) => {
    // 查询部门
    return new Promise((resolve, reject) =>{
      request({
       method: 'post',
       url:'GSPdwPC/ArchivesAction!findDeptByOrg.action',
       data: JSON.stringify({'userOrg': userOrg })
     })
       .then((res) => {
         
         resolve(res.data.data)
         // that.allorgs = 
       }).catch((err) => {
         reject(err)
       })
    })
 }

 // 初始化获取表格数据

 export const getDataAll = (data) => {
    // 
    return new Promise((resolve, reject) =>{
      request({
       method: 'post',
       url:'GSPdwPC/ArchivesAction!query_archives.action',
       data: JSON.stringify(data)
     })
       .then((res) => {
    
         resolve(res.data.data)
         // that.allorgs = 
       }).catch((err) => {
         reject(err)
       })
    })
 }

 // 修改人员档案

 export const updateArchives = (that, postdata) => {
  // 
  return new Promise((resolve, reject) =>{
    request({
     method: 'post',
     url:'GSPdwPC/ArchivesAction!updateArchives.action',
     headers:{'Content-Type':'multipart/form-data'},
     data: JSON.stringify(postdata)
   })
     .then((res) => {
       resolve(res.data)
       // that.allorgs = 
     }).catch((err) => {
       reject(err)
     })
  })
}

// 添加黑名单

export const addBlackList = (postdata) => {
  // 
  return new Promise((resolve, reject) =>{
    request({
     method: 'post',
     url:'GSPdwPC/ArchivesAction!addBlackList.action',
     data: JSON.stringify(postdata)
   })
     .then((res) => {
       resolve(res.data)
       // that.allorgs = 
     }).catch((err) => {
       reject(err)
     })
  })
}

// 移除黑名单

export const deleteByWorkCode = (postdata) => {
  // 
  return new Promise((resolve, reject) =>{
    request({
     method: 'post',
     url:'GSPdwPC/ArchivesAction!deleteByWorkCode.action',
     data: JSON.stringify(postdata)
   })
     .then((res) => {
       resolve(res.data)
       // that.allorgs = 
     }).catch((err) => {
       reject(err)
     })
  })
}

// 查询黑名单
export const queryBlackPeople = (postdata) => {
  return new Promise ((resolve, reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/ArchivesAction!filterBlackPeople.action',
      data: JSON.stringify(postdata)
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

// 激活账户
export const assignAuthority = (postdata) => {
  return new Promise ((resolve, reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/ArchivesAction!assignAuthority.action',
      data: JSON.stringify(postdata)
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

// 查询是否激活
export const queryAssignAuthority = (postdata) => {
  return new Promise ((resolve, reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/ArchivesAction!queryAssignAuthority.action',
      data: JSON.stringify(postdata)
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}


// 打包查询县公司
export const addQuery = (postdata) => {
  return new Promise ((resolve, reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/PackProjectAction!addQuery.action',
      data: JSON.stringify(postdata)
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

// 查询所在施工项目组
export const queryUserTeam = (postdata) => {
  return new Promise ((resolve, reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/ArchivesAction!queryUserTeam.action',
      data: JSON.stringify(postdata)
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}


// 删除人员档案
export const deleteById = (postdata) => {
  return new Promise ((resolve, reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/ArchivesAction!deleteById.action',
      data: JSON.stringify(postdata)
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

// 初始化密码
export const InitPassword = (postdata) => {
  return new Promise ((resolve, reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/ArchivesAction!InitPassword.action',
      data: JSON.stringify(postdata)
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

// 更改权限
export const updateAuthority = (postdata) => {
  return new Promise ((resolve, reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/ArchivesAction!updateAuthority.action',
      data: JSON.stringify(postdata)
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

// 查询查询施工单位
export const findOrgByOutCompany = () => {
  return new Promise ((resolve, reject) => {
    request({
      method: 'get',
      url:'GSPdwPC/OutCompanyAction!findOrgByOutCompany.action'
      // data: JSON.stringify(postdata)
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}


// 查询分包单位
export const filterOutCompany = (postdata) => {
  return new Promise ((resolve, reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/OutCompanyAction!filterOutCompanyByPC.action',
      data: JSON.stringify(postdata)
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

// 判断是否有权限删除
export const isHasDeletePermit = (postdata) => {
  return new Promise ((resolve, reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/ArchivesAction!isHasDeletePermit.action',
      data: JSON.stringify(postdata)
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

 