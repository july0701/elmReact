// import request from '../common/ask/request'
import wyyAPI from '../common/ask/wyyAPI'
//获取验证码 网易云音乐
export function getCaptcha (data){
    return wyyAPI({
        url:`/captcha/sent?phone=${data}`,
        method:'get'
    })
}
//验证 验证码
export function login (data){
    return wyyAPI({
        url:`captcha/verify?phone=${data.phone}&captcha=${data.code}`,
        method:'get',
    })
}
//获取登录后用户信息 默认我的网易云信息
export function userInfo (){
    return wyyAPI({
        url:'/user/detail?uid=312405714',
        method:'get'
    })
}
//登出
export function loginout (){
    return wyyAPI({
        url:'/logout',
        method:'get'
    })
}
