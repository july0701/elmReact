import React, { Component } from 'react'
import Cookie from 'js-cookie'
import { withRouter } from 'react-router-dom'
import { AtCity, AtWhere } from '../../../api/city'
import './search.css'
class index extends Component {
    state = {
        address: null,
        isFixed: false
    }
    componentWillUnmount() {
        //卸载清空window事件
        window.onscroll = null
    }
    componentDidMount() {
        window.onscroll = this.scrollHandler
        //获取当前城市 经纬度
        //判断用户是否有上一次缓存城市信息：如果用户在上一次行为中重新选择了城市，那么会缓存选择后城市的经纬度。这里在每次首页渲染时判断是否记录有该信息 
        //!==undefined 表示记录该信息 页面会渲染该城市的默认定位地址
        if (Cookie.get('jw') !== undefined) {
            const data = JSON.parse(Cookie.get('jw'))
            //判断是否在用户进来时有之前的定位地址：注意的是 在用户自己选择城市后应删除该记录 避免刷新bug
            if (Cookie.get('Address') === undefined) {
                //加载选择城市的默认地址位置
                AtWhere(data).then(
                    res => {
                        this.setState({
                            address: res.data.address
                        })
                    }
                )
            } else {
                //有地址该记录：地址记录只在首次选城市时 重置默认
                this.setState({
                    address: Cookie.get('Address')
                })
            }
            return
        }
        //没有缓存城市信息 加载默认定位信息
        AtCity().then(
            res => {
                const data = {
                    latitude: res.data.latitude,
                    longitude: res.data.longitude
                }
                //判断上一次用户是否有缓存城市 
                if (Cookie.get('cityID') === undefined) {
                    //默认定位当前城市
                    Cookie.set('cityID', res.data.id)
                }
                //判断用户之前是否有位置缓存
                if (Cookie.get('Address') === undefined) {
                    //没有缓存 获取默认定位的位置
                    AtWhere(data).then(
                        res => {
                            this.setState({
                                address: res.data.address
                            })
                        }
                    )
                } else {
                    //存在缓存 用户选择后的位置
                    this.setState({
                        address: Cookie.get('Address')
                    })
                }
            }
        )
    }
    //滚动事件 头部搜索框定位
    scrollHandler = () => {
        let scrollTop = document.documentElement.scrollTop;  //滚动条滚动高度
        if (scrollTop < 49) {
            this.setState({
                isFixed: false
            })
        }
        if (scrollTop > 50) {
            this.setState({
                isFixed: true
            })
        }
    }
    //跳转地址搜索
    searchAddress = () => {
        this.props.history.push('/changeAddress')
    }
    //跳转商家搜索
    searchStore = () => {
        //判断是否登录
        if (Cookie.get('isLogin') !== undefined) {
            this.props.history.push('/searchPage')
        } else {
            //未登录回到登录页面
            this.props.history.push('/login')
        }
    }
    render() {
        const { address, isFixed } = this.state
        return (
            <div className="search_">
                <div className="address">
                    <div className="box_box">
                        <div className="address_con" onClick={this.searchAddress}>
                            <span style={{ 'fontSize': '16px', 'fontWeight': 'bold' }} className="el-icon-search"></span>
                            <span className="adress_adress">{address}</span>
                            <span className="el-icon-caret-bottom"></span>
                        </div>

                    </div>

                </div>
                <div style={{ 'position': isFixed === false ? 'relative' : 'fixed' }} className='search'>
                    <input onFocus={this.searchStore} className="searchInp" type="text" placeholder="搜索饿了么商家、商品名称" />
                </div>
            </div>
        )
    }
}
export default withRouter(index)