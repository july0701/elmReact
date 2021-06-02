import React, { Component } from 'react'
import {Loading} from 'element-react'
import Cookie from 'js-cookie'
import './allCard.css'
import { storeFoodList, storeInfo } from '../../../../../api/food'
export default class need extends Component {
    state = {
        foodList: [],//全部数据
        foodReal: [],//食物分组列
        foodNamelist:[],//食物分组名称
        imgBaseUrl: "https://elm.cangdu.org/img/",//图片拼接
        flag: false,
        storeImg: '',
        loadFlag: true,//控制loading
    }
    componentDidMount() {
        const id = Cookie.get('storeID')
        storeInfo(id).then(
            res => {
                this.setState({
                    storeImg: res.data.image_path
                })
            }
        )
        //获取商铺食物列表
        storeFoodList(id).then(
            res => {
                if (res.status === 200) {
                    console.log(res);
                    const data = res.data.map(i => {
                        return i.foods
                    })
                    const foodName = res.data.map( i => {
                        return i.name
                    })
                    this.setState({
                        foodList: res.data,
                        foodNamelist:foodName,
                        foodReal: data,
                        loadFlag: false
                    })
                    if (res.data.length === 0) {
                        this.setState({
                            flag: true
                        })
                    }
                }

            }
        )
    }
    render() {
        const { foodList, imgBaseUrl, foodReal, flag, storeImg, loadFlag,foodNamelist} = this.state
        return (
            <Loading loading={loadFlag} >
                <div>
                    <div style={{ 'backgroundImage': `url(${imgBaseUrl}${storeImg})` }} className="storeImgBg">
                    </div>
                    <div className="storePush">
                        <h4>商家推荐</h4>

                    </div>
                    <h1 className="h1_" style={{ 'display': flag ? 'block' : 'none' }}>关门大吉哦!看看别的吧</h1>

                    <div className="foodList_">
                        <ul className="foodName">
                            {
                                foodList.map((i, index) => {
                                    return <li key={i.id}><a href={`#${index}`}>{i.name}</a></li>
                                })
                            }
                        </ul>
                        <div className="fatList">
                            {
                                foodReal.map((i, index) => {
                                    return <ul id={index} key={index} className="foodInfoList">
                                        <p>{foodNamelist[index]}</p>
                                        {
                                            i.map(a => {
                                                return <li key={a.item_id}>
                                                    <div className="foodImg">
                                                        <img src={imgBaseUrl + a.image_path} alt="imgs" />
                                                    </div>
                                                    <div className="foodThisInfo">
                                                        <h4>{a.name}</h4>
                                                        <p className="desc">{a.description}</p>
                                                        <p>{a.tips}</p>
                                                        <p style={{ 'fontSize': '16px', 'color': '#ff5339', 'position': 'absolute', 'bottom': '10px' }}>¥{a.specfoods[0].price}</p>
                                                        <span className="plus_">
                                                            <i className="el-icon-plus"></i>
                                                        </span>
                                                    </div>
                                                </li>
                                            })
                                        }

                                    </ul>
                                })
                            }
                        </div>
                    </div>
                </div>
            </Loading>
        )
    }
}
