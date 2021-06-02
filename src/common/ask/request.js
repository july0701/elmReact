import axios from 'axios'
let request = axios.create({
    baseURL:'https://elm.cangdu.org',
    timeout:5000
})
//请求拦截
request.interceptors.request.use(
    function(config){
        console.log('请求拦截',config)
        
        if(!config.headers.token){
            console.log('令牌验证通过')
            
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }
    
)
//响应拦截
request.interceptors.response.use(
    function(response){
        // console.log('响应拦截',response)
        return response
    },
    function(error){
        // console.log('响应拦截报错',error.message)
        // if(error.message === 'timeout of 2000ms exceeded'){
        //     window.location.href="http://localhost:3000/notfound"

        // }
        return Promise.reject(error)
    }
)
export default request