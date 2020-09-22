import request from '@/utils/request'
import qs from 'qs'


// 作业总数
export function queryAllOrg(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/Login!queryAllOrg.action', 
      data: JSON.stringify(postdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}


// 执行中和未执行的施工计划
export function AndToimplement(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/Login!queryImplementAndToimplement.action', 
      data: JSON.stringify(postdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}

// 查询计划数量和开工数量
export function queryStartNumber(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/Login!queryStartNumber.action', 
      data: JSON.stringify(postdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}


// 查询附近地区的施工计划
export function queryMapCon(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/ConstructionPlanAction!queryMapCon.action', 
      data: JSON.stringify(postdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}

// pc端根据选择日期查询统计图
export function statisticalChartOne(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/Login!statisticalChartOne.action', 
      data: JSON.stringify(postdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}
// pc端根据选择日期查询统计图1
export function statisticalChartTwo(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'GSPdwPC/Login!statisticalChartTwo.action', 
      data: JSON.stringify(postdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}

