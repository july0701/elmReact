import React, { Component } from 'react'
import './myAddC.css'
import Cookie from 'js-cookie'
import { GetMyAddress, DelMyAddress } from '../../../api/city'
export default class index extends Component {
    state = {
        data: [],
        flag: false,
        d_id: null,
    }
    componentDidMount() {
        if (Cookie.get('isLogin') === undefined) {
            //未登录回到登录页面
            this.props.history.push('/login')
            return
        }
        this.getMyAddress()
    }
    getMyAddress = () => {
        GetMyAddress().then(
            res => {
                if (res.status === 200) {
                    this.setState({
                        data: res.data
                    })
                }
            },
            error => {
                console.log(error.message);
            }
        )
    }
    whereToGo = (type) => {
        if (type === 'add') {
            this.props.history.push('/pushAddress')
            return
        }
        this.props.history.push('/my')

    }
    changeAddr = (type, id) => {
        //获取当前地址ID 存入state
        this.setState({
            d_id: id
        })
        if (type === 'close') {
            this.setState({
                flag: true
            })
            //遮罩层显示禁止页面滚动
            document.addEventListener('touchmove', this.handler, { passive: false });
            return
        }
        if (type === 'cancel') {
            this.setState({
                flag: false
            })
            //解除页面滚动限制
            document.removeEventListener('touchmove', this.handler, { passive: true });
            return
        }
        if (type === 'enter') {
            const { d_id } = this.state
            //删除该地址
            DelMyAddress(d_id).then(
                res => {
                    if (res.status === 200) {
                        this.getMyAddress()
                    }
                }
            )
            this.setState({
                flag: false
            })
            //解除页面滚动限制
            document.removeEventListener('touchmove', this.handler, { passive: true });
            return
        }
        if (type === 'edit') {
            const data = JSON.stringify(id)
            this.props.history.push(`/pushAddress`)
            Cookie.set('changeAddressInfo',data)
            return
        }
    }
    //阻止默认事件
    handler = (e) => {
        e.preventDefault();
    }
    render() {
        const { data, flag } = this.state
        return (
            <div style={{ 'height': '100%', 'backgroundColor': '#F5F5F5' }}>
                {/* 遮罩 */}
                <div style={{ 'display': flag ? 'block' : 'none' }} className="shelter"></div>
                {/* 遮罩 */}
                <div style={{ 'display': flag ? 'block' : 'none' }} className="message_">
                    <h3 style={{ 'marginTop': '20px' }}>删除地址</h3>
                    <p style={{ 'fontSize': '12px', 'color': '#666', 'margin': '12px 0' }}>确定删除该地址</p>
                    <div>
                        <button onClick={() => this.changeAddr('cancel')} style={{ 'color': '#333' }}>取消</button>
                        <button onClick={() => this.changeAddr('enter')} style={{ 'backgroundColor': '#2396ff', 'marginLeft': '10px' }}>确定</button>
                    </div>
                </div>
                <div className="pushAddressTop">
                    <span onClick={() => this.whereToGo('back')} className="el-icon-arrow-left"></span>
                    <p>我的地址</p>
                    <p></p>
                </div>
                <ul className="_myAD_">
                    {
                        data.map(i => {
                            return <li key={i.id}>
                                <div>
                                    <p>
                                        <span style={{ 'fontWeight': 'bold', 'fontSize': '17px', 'color': '#333' }}>{i.name}</span>
                                        <span style={{ 'color': '#666', 'fontWeight': 'normal', 'margin': '0 3px' }}>{i.sex === 1 ? '先生' : '女士'}</span>
                                        <span style={{ 'color': '#666', 'fontSize': '15px' }}>{i.phone}</span>
                                    </p>
                                    <p style={{ 'display': 'flex', 'alignItems': 'center' }}>
                                        <span style=
                                            {{
                                                'color': i.tag_type === 2 ? '#ff5722' : i.tag_type === 3 ? '#00d762' : '#3190e8',
                                                'borderColor': i.tag_type === 2 ? '#ff5722' : i.tag_type === 3 ? '#00d762' : '#3190e8'
                                            }}
                                            className="whereTag">
                                            {i.tag === '' ? '未选择' : i.tag}
                                        </span>
                                        <span className="howLong">{i.address}{i.address_detail}</span>
                                    </p>
                                </div>
                                <i onClick={() => this.changeAddr('edit', i)} className="el-icon-edit"></i>
                                <i onClick={() => this.changeAddr('close', i.id)} className="el-icon-close"></i>
                            </li>
                        })
                    }

                </ul>
                <div onClick={() => this.whereToGo('add')} className="footer_">
                    <i className="el-icon-plus"></i>
                    <span style={{ 'marginLeft': '8px' }}>新增收货地址</span>
                </div>
            </div>
        )
    }
}
