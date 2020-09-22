import request from '@/utils/request1'
import qs from 'qs'
export function registerdata(postdata) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'api/register', 
        data: postdata
      }).then((val) => {
        resolve(val)
      }).catch((err) => {
         reject(err)
      })
    })
  }
  export function check(param,type) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'api/check'+'/'+param +'/'+type,
      }).then((val) => {
        resolve(val)
      }).catch((err) => {
         reject(err)
      })
    })
  }