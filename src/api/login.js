import request from '@/utils/request1'
import qs from 'qs'

export function login(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'api/login', 
      data: postdata
    }).then((val) => {
      resolve(val)
    }).catch((err) => {
       reject(err)
    })
  })
}

