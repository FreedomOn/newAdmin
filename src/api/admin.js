import request from '@/utils/request'
// 同步日志
export function queryQuartz(postData) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'get',
        url:'GSPdwPC/LogAction!queryQuartz.action',
        // data: JSON.stringify(postData)
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