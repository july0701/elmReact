import React, { Component } from 'react'
import Cookie from 'js-cookie'
import './forSearch.css'
import { AddressInfo } from '../../../../api/city'
export default class index extends Component {
    state = {
        adressList: []
    }
    componentDidMount() {

    }
    whereToGo = (type) => {
        if (type === 'back') {
            this.props.history.push('/pushAddress')
            return
        }
        Cookie.set('myAddressForChoose',JSON.stringify(type))
        this.props.history.push('/pushAddress')
    }
    //搜索
    searchFor = () => {
        // console.log(this.keyNode.value);
        if(this.keyNode.value === ''){
            return
        }
        //获取当前城市地址列表
        const data = {
            city_id: Cookie.get('cityID'),
            keyword: this.keyNode.value.replace(/\s+/g,'')
        }
        AddressInfo(data).then(
            res => {
                if (res.status === 200) {
                    this.setState({
                        adressList: res.data,
                    })
                }
            },
            error => {
                console.log(error.message);
            }
        )
    }
    //选择地址
    chooseThis = (data) => {
        Cookie.set(JSON.stringify(data))

    }
    render() {
        const { adressList } = this.state
        return (
            <div>
                <div className="pushAddressTop">
                    <span onClick={() => this.whereToGo('back')} className="el-icon-arrow-left"></span>
                    <p>搜索地址</p>
                    <p></p>
                </div>
                <ul className="adressForNow">
                    <li style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
                        <div>
                            <span className="span_span">
                                <i className="el-icon-search"></i>
                            </span>
                            <input ref={c => this.keyNode = c} type="text" placeholder="请输入小区/写字楼/学校等" />
                        </div>
                        <button onClick={this.searchFor}>搜索</button>
                    </li>
                    {
                        adressList.map(i => {
                            return <li key={i.latitude} onClick={() => this.whereToGo(i)}>
                                <p>{i.name}</p>
                                <p className="p2_">{i.address}</p>
                            </li>
                        })
                    }

                </ul>
            </div>
        )
    }
}
