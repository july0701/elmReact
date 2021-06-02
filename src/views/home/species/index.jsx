import React, { Component } from 'react'
import './species.css'
import {Loading} from 'element-react'
import { foodKind } from '../../../api/food'
export default class index extends Component {
    state = {
        foodKind: [],
        spans:">",
        flag:true,//控制loading
    }
    componentDidMount() {
        //获取食品种类
        foodKind().then(
            res => {
                if (res.status === 200) {
                    this.setState({
                        foodKind: res.data,
                        flag:false
                    })

                }
            }
        )
    }
    render() {
        const { foodKind,spans,flag } = this.state
        return (
            <div>
                <Loading loading={flag} >
                <ul className="foodKind">
                    {
                        foodKind.map(i => {
                            return <li key={i.id}>
                                <img src={`http://fuss10.elemecdn.com${i.image_url}`} alt="" />
                                <span>{i.title}</span>
                            </li>
                        })
                    }
                </ul>
                </Loading>
                <div className="banner">
                    <div className="_con">
                        <div>
                            <h4>品质搭配</h4>
                            <p style={{ 'fontSize': '12px', 'color': '#777' }}>搭配齐全吃得好</p>
                            <p style={{ 'fontSize': '12px', 'color': '#af8260' }}>立即抢购{spans}</p>
                        </div>
                        <div className="img_food">
                        </div>
                    </div>
                    <div className="_message">
                        <span className="huangguan"></span>
                        <h5 style={{'color':'#644f1b'}}>超级会员 <span style={{'fontSize':'12px','color':'#644f1b'}}>· 已为我节省48元</span></h5>
                        <p style={{'fontSize':'12px','color':'#644f1b'}}>下单即可获得奖励金  {spans}</p>
                    </div>
                </div>
            </div>
        )
    }
}
