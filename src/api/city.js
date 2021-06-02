import request from '../common/ask/request'

//当前定位城市
export function AtCity(){
    return request({
        method:'get',
        url:'/v1/cities?type=guess',
    })
}
//当前搜索城市详细地址
export function AddressInfo(data){
    return request({
        method:'get',
        url:`/v1/pois?city_id=${data.city_id}&keyword=${data.keyword}`,
    })
}
//当前定位位置
export function AtWhere(data){
    return request({
        method:'get',
        url:`/v2/pois/${data.latitude},${data.longitude}`
    })
}
//获取所有城市
export function AllCity(){
    return request({
        method:'get',
        url:'/v1/cities?type=group'
    })
}
//获取当前城市信息 id
export function GetNowCity(data){
    return request({
        url:`/v1/cities/${data}`,
        method:'get'
    })
}
//登录后我的地址信息
export function GetMyAddress(){
    return request({
        url:`/v1/users/5/addresses`,
        method:'get'
    })
}
//添加收货地址
export function PushMyAddress(data){
    return request({
        method:"post",
        url:'/v1/users/5/addresses',
        data:data
    })
}
//删除地址
export function DelMyAddress(data){
    return request({
        method:"DELETE",
        url:`/v1/users/5/addresses/${data}`,
    })
}