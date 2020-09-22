
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
export const  delefile = (postdata) => {
    // 查询部门
    //  let that = this
    return new Promise((resolve, reject) =>{
      request({
       method: 'post',
       url:'GSPdwPC/FileAction!deleteFile.action',
       data: JSON.stringify(postdata)
     })
       .then((res) => {
       
         resolve(res.data.data)
         // that.allorgs = 
       }).catch((err) => {
         reject(err)
       })
    })
  }

  // 查询计划数量和开工数量
export function queryFile(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'get',
      url:'GSPdwPC/FileAction!queryFile.action'
      // data: JSON.stringify(postdata)
    }).then((val) => {
      resolve(val)
    }).catch((err) => {
       reject(err)
    })
  })
}

// 查询公告栏
export function searchNotice(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'get',
      url:'GSPdwPC/NoticeAction!searchNotice.action'
      // data: JSON.stringify(postdata)
    }).then((val) => {
      resolve(val)
    }).catch((err) => {
       reject(err)
    })
  })
}

// 查询案例
export function searchCase(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/NoticeAction!searchCase.action',
      data: JSON.stringify(postdata)
    }).then((val) => {
      resolve(val)
    }).catch((err) => {
       reject(err)
    })
  })
}
// 查询通报消息
export function searchMsg(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/NoticeAction!searchRules.action',
      data: JSON.stringify(postdata)
    }).then((val) => {
      resolve(val)
    }).catch((err) => {
       reject(err)
    })
  })
}

// 删除
export function deleteNotice(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/NoticeAction!deleteNotice.action',
      data: JSON.stringify(postdata)
    }).then((val) => {
      resolve(val)
    }).catch((err) => {
       reject(err)
    })
  })
}
