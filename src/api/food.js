import request from '../common/ask/request'
//食品分类
export function foodKind() {
    return request({
        method: 'get',
        url: '/v2/index_entry'
    })
}
//附近商家 传入经纬度
export function nearbyStore(data) {
    return request({
        method: 'get',
        url: `/shopping/restaurants?latitude=${data.latitude}&longitude=${data.longitude}&limit=100`
    })
}
//商家详情 传入id
export function storeInfo(data) {
    return request({
        url: `https://elm.cangdu.org/shopping/restaurant/${data}`,
        method: 'get'
    })
}
//获取商铺食物列表 //传入ID
export function storeFoodList(data){
    return request({
        url:`https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${data}`,
        method:'get'
    })
}
//加入购物车
export function addFood(data){
    return request({
        url:'https://elm.cangdu.org/v1/carts/checkout',
        method:'post',
        data:data
    })
}