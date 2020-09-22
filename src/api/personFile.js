import request from '@/utils/request1'


export function seachPerson(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'api/queryUser', 
      data: postdata
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}
export function addPerson(postdata) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'api/addUser', 
        data: postdata
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
  export function deletePerson(postdata) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'api/deleteUser', 
        data: postdata
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
  export function updatePerson(postdata) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'api/updateUser', 
        data: postdata
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }