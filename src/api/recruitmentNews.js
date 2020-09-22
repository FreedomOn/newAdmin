import request from '@/utils/request1'

export function seachData(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'api/queryRecruit', 
      data: postdata
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}
export function addRecruit(postdata) {
    return new Promise ((resolve,reject) => { 
      request({
        method: 'post',
        url:'api/addRecruit', 
        data: postdata
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
  export function updateRecruit(postdata) {
    return new Promise ((resolve,reject) => { 
      request({
        method: 'post',
        url:'api/updateRecruit', 
        data: postdata
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
  export function deleteRecruit(postdata) {
    return new Promise ((resolve,reject) => { 
      request({
        method: 'post',
        url:'api/deleteRecruit',  
        data: postdata
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }