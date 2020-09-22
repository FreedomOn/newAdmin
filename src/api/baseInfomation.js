import request from '@/utils/request'
// 点击导航查询数据
export function queryAllData(postData) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'GSPdwPC/ProjectInfoAction!projectInfoQuery.action',  
        data: JSON.stringify(postData)
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
  export function addType(postData) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'GSPdwPC/ProjectAction!addType.action',  
        data: JSON.stringify(postData)
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }