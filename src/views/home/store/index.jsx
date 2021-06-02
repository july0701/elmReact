import React, { Component } from 'react'
import Cookie from 'js-cookie'
import { nearbyStore } from '../../../api/food'
import './store.css'
import { Rate ,Loading} from 'element-react'
import { withRouter } from 'react-router-dom'
import { AtCity } from '../../../api/city'
class index extends Component {
    state = {
        imgBaseUrl: "https://elm.cangdu.org/img/",
        dataInfo: [],
        flag:true,//控制loading
        reLoad:false,//请求超时处理
    }
    componentDidMount() {
        //定位当前城市当前位置，取出经纬度
        AtCity().then(
            res => {
                const data = {
                    latitude: res.data.latitude,
                    longitude: res.data.longitude
                }
                //获取附近商家
                nearbyStore(data).then(
                    res => {
                        if (res.status === 200) {
                            this.setState({
                                dataInfo: res.data,
                                flag:false
                            })
                            
                        }
                    },
                    error => {
                        console.log(error.message);
                        this.setState({
                            reLoad:true,
                            flag:false
                        })
                    }
                )
            },
            error => {
                this.setState({
                    reLoad:true,
                    flag:false
                })
            }
        )
    }
    //点击查看商铺详情及食物
    lookFood = (id) => {
        //判断是否登录
        if (Cookie.get('isLogin') !== undefined) {
            //传
            this.props.history.push({
                pathname: '/dianpu',
                query: {
                    id: id
                }
            })
            //存
            Cookie.set('storeID', id)
        }else{
            //未登录回到登录页面
            this.props.history.push('/login')
        }

    }
    render() {
        const { dataInfo, imgBaseUrl,flag,reLoad } = this.state
        return (
            <div style={{ 'marginTop': '15px' }}>
                <p style={{ 'fontSize': '15px', 'textAlign': 'center' }}>—— 推荐商家 ——</p>
                <p style={{'display':reLoad?'block':'none'}} className="errorForNetWork"><span>当前网络异常</span> <a href="/home">尝试重新加载</a></p>
                {/* <p>保留头</p> */}
                <Loading loading={flag} >
                <ul className="storeList">
                    {
                        dataInfo.map(i => {
                            return <li onClick={() => this.lookFood(i.id)} key={i.id}>
                                <div className="storeImg">
                                    <img src={imgBaseUrl + i.image_path} alt="imgs" />
                                </div>
                                <div className="storeInfo">
                                    <h4 style={{ 'marginBottom': '5px' }}><span style={{ 'display': i.is_new === true ? 'block' : 'none' }} className="pin">品牌</span><span className="sname">{i.name}</span></h4>
                                    <div className="yues"><Rate disabled={true} value={i.rating} /><span style={{ 'margin': '0 3px' }}>{i.rating}</span> <span>月售{i.recent_order_num}单</span><span style={{ 'display': i.delivery_mode ? 'block' : 'none' }} className="fnzs"><span className="fnzs_con">蜂鸟专送</span></span></div>
                                    <p><span>¥{i.float_minimum_order_amount}起送</span> | <span>{i.piecewise_agent_fee.tips}</span></p>
                                    <p style={{ 'color': '#57a9ff' }}>{i.distance} | {i.order_lead_time}</p>
                                    <div className="category">
                                        <i>{i.category}</i>
                                    </div>
                                    {/* 循环店铺活动 满减 新人等等 */}
                                    <div style={{ 'display': i.activities.length === 0 ? 'none' : 'block' }}>
                                        {
                                            i.activities.map((a, index) => {
                                                return <div key={index} className="Jian">
                                                    <i style={{ 'backgroundColor': '#' + a.icon_color }} className="jian">{a.icon_name}</i>
                                                    <p>{a.description}</p>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul>
                </Loading>
            </div>
        )
    }
}
export default withRouter(index)