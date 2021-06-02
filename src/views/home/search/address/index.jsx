import React, { Component } from 'react'
import Cookie from 'js-cookie'
import { Loading } from 'element-react'
import { AddressInfo, GetNowCity, GetMyAddress } from '../../../../api/city'
import './address.css'
export default class index extends Component {
    state = {
        addressData: [],
        preAdress: '',
        city: '',
        flag: true,//控制loading
        mySelfAddress: [],
        isshow: true,
        now: false
    }
    componentDidMount() {
        Cookie.get('isLogin') ? this.setState({ isshow: true }) : this.setState({ isshow: false })
        GetMyAddress().then(
            res => {
                if (res.status === 200) {
                    this.setState({
                        mySelfAddress: res.data
                    })
                }
            },
            error => {
                console.log(error.message);
            }
        )
        //请求当前id城市
        const id = Cookie.get('cityID')
        GetNowCity(id).then(
            res => {
                if (res.status === 200) {
                    this.setState({
                        city: res.data.name,
                        flag: false
                    })
                }
            },
            error => {
                console.log(error.message);
                this.props.history.push('/notfound')
            }
        )
        //记录上一次搜索并且使用的地址
        this.setState({
            preAdress: Cookie.get('Address')
        })
    }
    //回到home
    back = () => {
        this.props.history.push('/home')
    }
    //点击地址回到home
    getAddress = (data, cityID) => {
        if (cityID !== undefined) {
            Cookie.set('cityID', cityID)
        }
        //缓存当前点击的地址
        Cookie.set('Address', data)
        this.props.history.push('/home')
    }
    //上一次记录 点击回到home
    backBringPre = () => {
        this.props.history.push('/home')
    }
    //输入法结束
    HaveHandle = () => {
        this.isCompositionEnd = true;
    }
    //输入时
    HavingHandle = () => {
        this.isCompositionEnd = false;
    }
    //onchange事件依据条件来判断是否输出value
    reAdress = (event) => {
        //onChange会比onCompositionEnd快 所以添加一个延迟器 提升onCompositionEnd
        this.setTimers = setTimeout(() => {
            if (this.isCompositionEnd) {
                //判断删除时是否为空
                if (event.target.value === '') {
                    this.setState({
                        addressData: [],
                        isshow: true,
                        now: false
                    })
                } else {
                    const data = {
                        city_id: Cookie.get('cityID'),
                        keyword: event.target.value
                    }
                    //所有条件成立 获取搜索的内容
                    AddressInfo(data).then(
                        res => {
                            if (res.status === 200) {
                                this.setState({
                                    addressData: res.data,
                                    isshow: false,
                                    now: true
                                })
                            }
                        },
                        error => {
                            console.log(error.message);
                        }
                    )
                }
            }
        }, 0)
    }
    //选择城市
    checkCity = () => {
        this.props.history.push('/checkCity')
    }
    //新增地址
    pushAddress = () => {
        this.props.history.push('/pushAddress')
    }
    //卸载清空定时器
    componentWillUnmount() {
        clearTimeout(this.setTimers)
    }
    render() {
        const { addressData, city, flag, mySelfAddress, isshow, now } = this.state
        return (
            <Loading style={{ 'height': '100%' }} loading={flag} text="正在定位你当前的位置🥰">
                <div style={{ 'height': '100%', 'backgroundColor': '#f2f2f2', 'overflow': 'auto' }}>
                    <div className="title">
                        <span onClick={this.back} style={{ 'fontSize': '20px' }} className="el-icon-arrow-left"></span>
                        <p >选择收货地址</p>
                        <p
                            style={{ 'display': Cookie.get('isLogin') ? 'block' : 'none', 'fontSize': '16px' }}
                            onClick={this.pushAddress}>
                            新增地址
                        </p>
                        <p style={{ 'display': Cookie.get('isLogin') ? 'none' : 'block'}}></p>
                    </div>
                    <div className="atAddress">
                        <div onClick={this.checkCity} className="address_now">
                            <span className="cityHowLong">{city}</span>
                            <i className="el-icon-caret-bottom"></i>
                        </div>
                        <div className="address_inp">
                            <span className="el-icon-search"></span>
                            <input
                                onCompositionEnd={this.HaveHandle}
                                onCompositionStart={this.HavingHandle}
                                onChange={this.reAdress} type="text"
                                placeholder="请输入地址"
                            />
                        </div>
                    </div>
                    <ul className="search_infos">
                        <li style={{ 'display': Cookie.get('isLogin') ? 'block' : 'none' }} onClick={this.backBringPre}>
                            <p style={{ 'color': 'rgb(87, 169, 255)', 'fontWeight': 'bold' }}>我还搜索过:</p>
                            <p style={{ 'fontSize': '16px', 'fontWeight': 'bold' }}>{this.state.preAdress}</p>
                        </li>
                        {/* 我添加的地址 */}
                        <li
                            style=
                            {{ 'display': isshow ? 'block' : 'none', 'backgroundColor': '#f2f2f2', 'fontSize': '13px', 'color': '#666', 'fontWeight': '400' }}
                        >
                            收货地址
                            </li>
                        {
                            mySelfAddress.map(i => {
                                return <li
                                    onClick={() => this.getAddress(i.address, i.city_id)}
                                    style={{ 'display': isshow ? 'block' : 'none' }}
                                    key={i.id}
                                >
                                    <p style={{ 'marginBottom': '5px' }}>
                                        <span
                                            style={{ 'fontSize': '14px', 'color': '#000', 'fontWeight': 'bold', 'marginRight': '5px' }}
                                        >
                                            {i.name}
                                        </span>
                                        <span>
                                            {i.phone}
                                        </span>
                                    </p>
                                    <p>{i.address}</p>
                                </li>
                            })
                        }
                        {/* --- */}
                        <li
                            style=
                            {{ 'display': now ? 'block' : 'none', 'backgroundColor': '#f2f2f2', 'fontSize': '13px', 'color': '#666', 'fontWeight': '400' }}
                        >
                            当前搜索
                            </li>
                        {
                            addressData.map((i, index) => {
                                return <li onClick={() => this.getAddress(i.name)} key={index}>
                                    <p>
                                        <span style={{ 'fontSize': '14px', 'fontWeight': 'bold', 'color': '#000' }}>{i.name}</span>
                                        <span style={{ 'float': 'right' }}>718m</span>
                                    </p>
                                    <p className="realAddress">{i.address}</p>
                                </li>
                            })
                        }
                        <li style={{ 'height': '90px', 'fontSize': '12px', 'textAlign': 'center' }}>
                            <p
                                style={{ 'fontSize': '14px', 'color': '#999', 'marginBottom': '10px', 'marginTop': '10px' }}
                            >
                                找不到地址？
                            </p>
                            <p style={{ 'color': '#999' }}>请尝试只输入小区、写字楼或学校名</p>
                            <p style={{ 'color': '#999' }}>详细地址（如门牌号）可稍后输入</p>
                        </li>
                    </ul>
                </div>
            </Loading>
        )
    }
}
