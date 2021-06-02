import React, { Component } from 'react'
import Cookie from 'js-cookie'
import './my.css'
import { userInfo } from '../../api/login'
export default class index extends Component {
    state = {
        defaultUserInfo: null,
    }
    componentDidMount() {
        document.title = '我的'
        const loginData = Cookie.get('isLogin')
        //判断是否登录
        if (loginData === 'haveLogin') {
            //请求默认数据 我自己的网易云音乐账号信息
            userInfo().then(
                res => {
                    if (res.status === 200) {
                        this.setState({
                            defaultUserInfo: res.data.profile
                        })
                        Cookie.set('userinfoS', res.data.profile)
                    }
                }
            )
        }
    }
    //点击后判断是否登录
    checkLogin = () => {
        const loginData = Cookie.get('isLogin')
        //未登录回到登录页面
        if (loginData !== 'haveLogin') {
            this.props.history.push('/login')
        } else {
            //登录跳转个人信息
            this.props.history.push('/userInfo')
        }

    }
    Go = (type) => {
        if(type === 'myAddress'){
            this.props.history.push('/checkMyAddress')
            return
        }
    }
    render() {
        const { defaultUserInfo } = this.state
        return (
            <div style={{ 'height': '100%', 'backgroundColor': '#f2f2f2' }}>
                <div onClick={this.checkLogin} className="userinfo">
                    <img className="user_img" src={defaultUserInfo === null ? 'https://cube.elemecdn.com/c/6b/8384f98b8dedfd87fc1450926648cjpeg.jpeg?x-oss-process=image/format,webp/resize,w_120,h_120,m_fixed' : defaultUserInfo.avatarUrl} alt="imgs" />
                    <div className="user_info">
                        <h3>{defaultUserInfo === null ? '登录/注册' : defaultUserInfo.nickname}</h3>
                        <p><span className="icon_phone"></span><span>{defaultUserInfo === null ? '登录以后享受更多特权' : '18257371042'}</span></p>
                        <span className="el-icon-arrow-right ar_"></span>
                    </div>
                </div>
                <div className="riches">
                    <div style={{ 'borderRight': '1px solid #ddd' }}>
                        <span className="span_icon"></span>
                        <span>红包</span>
                    </div>
                    <div>
                        <span className="span_icon icon2"></span>
                        <span>金币</span>
                    </div>
                </div>
                <ul className="otherInfo">
                    <li>
                        <div className="left_">
                            <span></span>
                        </div>
                        <div onClick={() => this.Go('myAddress')} className="right_">
                            我的地址
                            <span className="el-icon-arrow-right"></span>
                        </div>
                    </li>
                    <li>
                        <div className="left_">
                            <span className="JB"></span>
                        </div>
                        <div className="right_">
                            金币商城
                            <span className="el-icon-arrow-right"></span>
                        </div>
                    </li>
                    <li>
                        <div className="left_">
                            <span className="KF"></span>
                        </div>
                        <div className="right_">
                            我的客服
                            <span className="el-icon-arrow-right"></span>
                        </div>
                    </li>
                    <li>
                        <div className="left_">
                            <span className="ELM"></span>
                        </div>
                        <div className="right_">
                            下载饿了么APP
                            <span className="el-icon-arrow-right"></span>
                        </div>
                    </li>
                    <li>
                        <div className="left_">
                            <span className="GZ"></span>
                        </div>
                        <div className="right_">
                            规则中心
                            <span className="el-icon-arrow-right"></span>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
