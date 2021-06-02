import React, { Component } from 'react'
import Cookie from 'js-cookie'
import './setInfo.css'
import {loginout} from '../../api/login.js'
export default class index extends Component {
    state = {
        data: null
    }
    componentDidMount() {
        this.setState({
            data: JSON.parse(Cookie.get('userinfoS'))
        })
    }
    loginout = () => {
        //登出
        loginout().then( res => {
            if(res.data.code === 200){
                //清空cookie
                Cookie.remove('isLogin')
                Cookie.remove('userinfoS')
                Cookie.remove('Address')
                this.props.history.push('/my')
            }
        })
    }
    render() {
        const { data } = this.state
        return (
            <div style={{ 'height': '100%', 'backgroundColor': '#f2f2f2' }}>
                <ul className="setInfo">
                    <li style={{ 'height': '80px', 'borderBottom': '1px solid #ddd' }}>
                        <h4>头像</h4>
                        <img className="user_imgs" src={data === null ? 'https://cube.elemecdn.com/c/6b/8384f98b8dedfd87fc1450926648cjpeg.jpeg?x-oss-process=image/format,webp/resize,w_120,h_120,m_fixed' : data.avatarUrl} alt="imgs" />
                    </li>
                    <li>
                        <h4>用户名</h4>
                        <p>{data === null ? 'xxx' : data.nickname}</p>
                    </li>
                    <li style={{ 'height': '40px', 'backgroundColor': '#f2f2f2' }}>
                        <p style={{ 'fontSize': '12px', 'color': '#999' }}>账号绑定</p>
                    </li>
                    <li>
                        <h4>手机</h4>
                        <p>1825xxxx042</p>
                    </li>
                    <li style={{ 'height': '40px', 'backgroundColor': '#f2f2f2' }}>
                        <p style={{ 'fontSize': '12px', 'color': '#999' }}>安全设置</p>
                    </li>
                    <li>
                        <h4>密码登录</h4>
                        <p>xxxxxxxx</p>
                    </li>
                </ul>
                <div onClick={this.loginout} className="loginOUt">
                    退出登录
                </div>
            </div>
        )
    }
}
