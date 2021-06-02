import React, { Component } from 'react'
import Cookie from 'js-cookie'
import './allCity.css'
import { AtCity, AllCity } from '../../../../api/city'
export default class index extends Component {
    state = {
        city: '',
        allCity: {},
        isFixed: false,
        searchCity: '',//
        flag: false,//控制搜索城市列表
    }
    componentWillUnmount() {
        window.onscroll = null
    }
    componentDidMount() {
        //滚动定位
        window.onscroll = this.scrollHandler
        //获取当前城市定位
        AtCity().then(
            res => {
                if (res.status === 200) {
                    this.setState({
                        city: res.data.name
                    })
                }
            }
        )
        //获取所有城市
        AllCity().then(
            res => {
                if (res.status === 200) {
                    this.setState({
                        allCity: res.data,
                    })
                }

            }
        )
    }
    //滚动事件 头部搜索框定位
    scrollHandler = () => {
        let scrollTop = document.documentElement.scrollTop;  //滚动条滚动高度
        if (scrollTop < 19) {
            this.setState({
                isFixed: false
            })
        }
        if (scrollTop > 20) {
            this.setState({
                isFixed: true
            })
        }
    }
    backPre = (num, data) => {
        //num识别调用者 data选择城市后的数据
        if (data === undefined) {
            if (num === 1) {
                //仅返回
                this.props.history.push('/changeAddress')
                return
            }
            //点击默认定位城市 清除之前的经纬度记录 重置首页位置为当前定位位置
            Cookie.remove('jw')
            Cookie.set('cityID', '32')
        } else {
            //缓存当前选中城市id
            Cookie.set('cityID', data.id)
            const datas = {
                latitude: data.latitude,
                longitude: data.longitude
            }
            //清除上一次缓存的用户选择地址信息 避免在用户选择其他城市后 导致首次页面不刷新地址定位
            Cookie.remove('Address')
            //缓存当前城市经纬度
            Cookie.set('jw', datas)
        }
        this.props.history.push('/changeAddress')
    }
    //搜索
    searchCity = (event) => {
        const { allCity } = this.state
        const val = event.target.value
        const data = Object.values(allCity)
        if (val === '') {
            this.setState({
                flag: false
            })
            return
        }
        //循环全部城市数据
        var newArr = []
        for (var i = 0; i < data.length; i++) {
            //单独循环每一个标签下的城市
            for (var a = 0; a < data[i].length; a++) {
                //模糊匹配
                if (data[i][a].name.indexOf(val) !== -1 || data[i][a].pinyin.indexOf(val) !== -1) {
                    newArr.push(JSON.parse(JSON.stringify(data[i][a])))
                    this.setState({
                        searchCity: newArr,
                        flag: true
                    })

                }
            }
        }
    }

    render() {
        const { city, allCity, isFixed, searchCity, flag } = this.state
        return (
            <div>
                <div className="searchCity">
                    <div className="top_">
                        <i onClick={() => this.backPre(1)} className="el-icon-arrow-left"></i>
                        <p style={{ 'marginLeft': '124px' }}>城市选择</p>
                    </div>
                </div>
                <div style={{ 'position': isFixed ? 'fixed' : 'relative' }} className="top_inp">
                    <input onChange={this.searchCity} type="text" placeholder="输入城市名或拼音名" />
                    <i className="el-icon-search"></i>
                </div>
                <ul style={{ 'display': flag ? 'none' : 'block' }} className="thisCity_">
                    <li className="nowWhere_" style={{ 'width': '100%', 'height': '40px', 'lineHeight': '40px' }}><span>当前定位城市</span></li>
                    <li onClick={() => this.backPre(2)} style={{ 'border': '0' }}>{city}</li>
                </ul>
                {
                    Object.keys(allCity).sort().map((a, index) => {
                        return <ul style={{ 'display': flag ? 'none' : 'block' }} key={index + 111} className="thisCity_">
                            <li key={index + 67} id={a} className="nowWhere_" style={{ 'width': '100%', 'height': '40px', 'lineHeight': '40px' }}><span>{a}</span></li>
                            {
                                allCity[a] === undefined ? '' : allCity[a].map(i => {
                                    return <li onClick={() => this.backPre(3, i)} key={i.id}>{i.name}</li>
                                })
                            }
                        </ul>
                    })
                }
                <ul style={{ 'display': flag ? 'block' : 'none' }} className="thisCity_">
                    {
                        searchCity === '' ? '' : searchCity.map(j => {
                            return <li onClick={() => this.backPre(3, j)} key={j.id}>{j.name}</li>
                        })
                    }
                </ul>
                <div style={{ 'display': flag ? 'none' : 'block' }} className="a_z">
                    {
                        Object.keys(allCity).sort().map((a, index) => {
                            return <a key={index + 2} style={{ 'textDecoration': 'none', 'marginBottom': '3px', 'color': '#999' }} href={`#${a}`}>{a}</a>
                        })

                    }
                </div>
            </div>
        )
    }
}
