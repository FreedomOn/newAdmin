import request from '@/utils/request1'
export function queryQuestionData(postdata) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'api/queryQuestion', 
        data: postdata
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
  export function checkAnswerData(postdata) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'api/checkAnswer', 
        data: postdata
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
  export function updatePasswordData(postdata) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'api/updatePassword', 
        data: postdata
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }