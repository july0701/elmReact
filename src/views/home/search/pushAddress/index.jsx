import React, { Component } from 'react'
import Cookie from 'js-cookie'
import './pushAdd.css'
import { Button, Message } from 'element-react'
import { PushMyAddress } from '../../../../api/city'

export default class index extends Component {
    state = {
        data: null,
        changeMy: null,
        sex_:1
    }
    componentDidMount() {
        if (Cookie.get('changeAddressInfo') !== undefined) {
            const dataInfo = JSON.parse(Cookie.get('changeAddressInfo'))
            this.setState({
                changeMy: dataInfo,
                sex_:dataInfo.sex
            })
            this.keyInpName.value = dataInfo.name
            this.keyInpPhone.value = dataInfo.phone
            this.type = dataInfo.tag_type
            return
        }
        this.keyInpName.value = Cookie.get('name_') === undefined ? '' : Cookie.get('name_')
        this.keyInpPhone.value = Cookie.get('phone_') === undefined ? '' : Cookie.get('phone_')
        //记录的地址信息
        if (Cookie.get('myAddressForChoose') !== undefined) {
            const data = JSON.parse(Cookie.get('myAddressForChoose'))
            this.setState({
                data: data
            })
        }

    }
    whereToGo = (type) => {
        if (type === 'back') {
            this.props.history.push('/changeAddress')
            Cookie.remove('name_')
            Cookie.remove('phone_')
            return
        }
        this.props.history.push('/searchWhere')
        Cookie.set('name_', this.keyInpName.value.replace(/\s+/g, ''))
        Cookie.set('phone_', this.keyInpPhone.value)
    }
    //性别选择
    SexMe = (type) => {
        if (type === 'man') {
            this.setState({
                sex_:1
            })
            return
        }
        this.setState({
            sex_:2
        })
    }
    //家学校公司选择
    whereAreYou = (type) => {
        if (type === 'home') {
            this.type = 2
            this.type_ = '家'
            return
        }
        if (type === 'school') {
            this.type = 3
            this.type_ = '学校'
            return
        }
        this.type = 4
        this.type_ = '公司'

    }
    //添加地址
    pushNow = () => {
        const Phone = this.keyInpPhone.value
        const Names = this.keyInpName.value.replace(/\s+/g, '')
        //验证
        if (Names === '') {
            Message('该让谁来收外卖呢？正确填写你的姓名哦!🥰')
            return
        }
        if (Phone.length !== 11) {
            Message('请输入正确的手机号码!🥰')
            return
        }
        if (this.keyNodeadr.innerHTML === '小区/写字楼/学校') {
            Message('地址还没有填写哦!🥰')
            return
        }
        const { data,changeMy } = this.state
        //添加地址参数 接口默认城市ID1 上海 没法改
        const dataInfo = {
            address:changeMy === null? data.name:changeMy.address,
            address_detail:changeMy === null? data.address:changeMy.address_detail,
            geohash:changeMy === null? data.geohash:changeMy.st_geohash,
            name: this.keyInpName.value,
            phone: this.keyInpPhone.value,
            tag: this.type_ !== undefined ? this.type_ : '家',
            sex: this.state.sex_,
            phone_bk: '',
            tag_type: this.type !== undefined ? this.type : 2
        }
        PushMyAddress(dataInfo).then(
            res => {
                if (res.status === 200) {
                    Cookie.remove('name_')
                    Cookie.remove('phone_')
                    this.props.history.push('/changeAddress')
                }
            },
            error => {
                console.log(error.message);
            }
        )
    }
    componentWillUnmount() {
        Cookie.remove('changeAddressInfo')
    }
    render() {
        const { data, changeMy,sex_ } = this.state
        return (
            <div style={{ 'height': '100%', 'backgroundColor': '#f5f5f5', 'textAlign': 'center' }}>
                <div className="pushAddressTop">
                    <span onClick={() => this.whereToGo('back')} className="el-icon-arrow-left"></span>
                    <p >添加地址</p>
                    <p></p>
                </div>
                <ul className="addInfos">
                    <li>
                        <span>联系人</span>
                        <input ref={c => this.keyInpName = c} type="text" placeholder="姓名" />
                        <Button style={{'backgroundColor':sex_===1?'#2395ff':'#fff'}} onClick={() => this.SexMe('man')} className="sir" plain={true} type="info">先生</Button>
                        <Button style={{'backgroundColor':sex_===2?'#2395ff':'#fff'}} onClick={() => this.SexMe('woman')} className="mdn" plain={true} type="info">女士</Button>
                    </li>
                    <li>
                        <span>电话</span>
                        <input ref={c => this.keyInpPhone = c} type="number" maxLength={11} placeholder="手机号码" />
                    </li>
                    <li>
                        <span>地址</span>
                        <span onClick={() => this.whereToGo('search')} className="spanAddress_">
                            <span ref={c => this.keyNodeadr = c}>{changeMy !== null ? changeMy.address : data === null ? '小区/写字楼/学校' : data.name}</span>
                            <span>{changeMy !== null ? changeMy.address_detail : data === null ? '' : data.address}</span>
                        </span>
                        <i onClick={() => this.whereToGo('search')} className="el-icon-arrow-right"></i>
                    </li>
                    <li>
                        <span>门牌号</span>
                        <input type="text" placeholder="10号楼5层501室222" />
                        <i className="el-icon-edit"></i>
                    </li>
                    <li style={{ 'border': '0' }}>
                        <span>标签</span>
                        <div style={{ 'width': '80%', 'textAlign': 'left' }}>
                            <Button onClick={() => this.whereAreYou('home')} className="home_" plain={true} type="info">家</Button>
                            <Button onClick={() => this.whereAreYou('school')} className="school_" plain={true} type="info">学校</Button>
                            <Button onClick={() => this.whereAreYou('company')} className="company_" plain={true} type="info">公司</Button>
                        </div>
                    </li>
                </ul>
                <Button onClick={this.pushNow} style={{ 'width': '90%', 'height': '40px', 'marginTop': '20px' }} type="success">确定</Button>
            </div>
        )
    }
}
