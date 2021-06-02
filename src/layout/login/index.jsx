import React, { Component } from 'react'
import Cookie from 'js-cookie'
import { Input, Button, Message } from 'element-react'
import './login.css'
import { getCaptcha, login } from '../../api/login'
export default class index extends Component {
    state = {
        maxL: 11,
        maxLc: 8,
        isFlag: false,//是否可以请求验证码  验证码框是否为灰色
        phone: null,//不需要在请求时做判断，isFlag默认false不能请求
        code: null,//验证码
        isInVal: true,//记录定时器是否开启 true=关闭
        clear: true,
    }
    //得到输入的手机号
    getPhone = (event) => {
        let isnum = /^\d+$/.test(event)
        //判断是否符合条件
        if (isnum && event.length >= 11) {
            //仅输入为存数字且等于11位时
            this.setState({
                //记录输入手机号
                phone: event
            })
            //定时器关闭时:如果不添加此项,会导致在获取验证码后再一次重新输入11位手机号,会使"获取验证码"高亮蓝色,以至于再一次点击获取 造成混乱
            if (this.state.isInVal === true) {
                //获取验证码 颜色为蓝色
                this.setState({
                    isFlag: true
                })
            }
        } else {
            //不符合 获取验证码颜色为灰色
            this.setState({
                isFlag: false
            })
        }
    }
    //获取当前手机号的验证码
    getCode = () => {
        const { isFlag, phone } = this.state
        //判断是否加载定时器以及验证完输入请求验证码
        if (isFlag) {
            //请求验证码
            getCaptcha(phone).then(
                res => {
                    
                }
            )
            //改变isFlag
            this.setState({
                isFlag: false
            })
            //定义倒计时90s
            let miao = 89
            //定义定时器
            this.miaoData = setInterval(() => {
                if (miao !== 0 && this.state.clear === true) {
                    this.keyCode.innerHTML = `已发送(${miao--})`
                    //防止在重复获取验证码:定时器开启时间段关闭获取方式
                    this.setState({
                        //记录定时器开启
                        isInVal: false
                    })
                } else {
                    //倒计时结束 
                    this.setState({
                        //记录定时器关闭
                        isInVal: true
                    })
                    //清除定时器
                    clearInterval(this.miaoData)
                    //定时器结束 重置获取
                    this.setState({
                        isFlag: true
                    })
                    //定时器为0后
                    this.keyCode.innerHTML = '重新获取'
                }
            }, 1000)   
        } else {
            return false
        }
    }
    //验证码
    realCode = (event) => {
        this.setState({
            code: event
        })
    }
    //登录验证
    loginThis = () => {
        const { phone, code } = this.state
        //手机号 验证码
        const data = {
            phone: phone,
            code: code
        }
        //验证data
        if (phone !== null && code !== null) {
            login(data).then(
                res => {
                    if (res.data.code === 200 && res.data.data === true) {
                        this.setState({
                            clear: false
                        })
                        //清除定时器 跳转home
                        clearInterval(this.miaoData)
                        this.props.history.push('/my')
                        //存入信息 模拟token
                        Cookie.set('isLogin', 'haveLogin')
                        window.location.reload()
                    }
                },
                error => {
                    Message('验证码错误');
                }
            )
        }
    }
    componentWillUnmount(){
        //卸载清空定时器
        clearInterval(this.miaoData)
    }
    render() {
        const { maxL, maxLc, isFlag } = this.state
        return (
            <div>
                <div className="ELM_">
                    <div className="logo"></div>
                </div>
                <div className="login_inp">
                    <p onClick={this.getCode} ref={c => this.keyCode = c} className="getCode" style={{ 'fontSize': '14px', 'color': isFlag ? '#2395ff' : '#ccc' }}>获取验证码</p>
                    <Input onChange={this.getPhone} maxLength={maxL} className="inp" placeholder="手机号" />
                    <Input onChange={this.realCode} maxLength={maxLc} className="inp" placeholder="验证码" />
                    <p style={{ 'fontSize': '14px', 'color': '#999', 'marginTop': '15px' }}>
                        新用户登录即自动注册，并表示已同意
                        <span style={{ 'color': '#4AA5F0' }}>《用户服务协议》</span>
                        和
                        <span style={{ 'color': '#4AA5F0' }}>《隐私权政策》</span>
                    </p>
                    <Button onClick={this.loginThis} type="primary">登录</Button>
                    <p style={{ 'fontSize': '12px', 'color': "#999", 'marginTop': '20px', 'textAlign': 'center' }}>关于我们</p>
                </div>
            </div>
        )
    }
}
