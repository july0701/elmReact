import React, { Component } from 'react'
import Cookie from 'js-cookie'
import './sf.css'
import { storeInfo } from '../../../../api/food'
import { Tabs, Loading } from 'element-react'
import Need from './cardFood/need'
import Evaluate from './cardFood/evaluate'
import StoreInfoCard from './cardFood/storeInfo'
export default class index extends Component {
    state = {
        streInfo: [],
        huodong: [],
        imgBaseUrl: "https://elm.cangdu.org/img/",//图片拼接
        flag: false,//控制遮罩层
        loadFlag: true,//控制loading
    }
    componentWillUnmount() {
        //卸载清空window事件
        window.onscroll = null
    }
    componentDidMount() {
        window.onscroll = this.scrollHandlers
        // const id = this.props.location.query.id
        //获取缓存的id
        const id = Cookie.get('storeID')
        //通过ID 获取商家的详情
        storeInfo(id).then(
            res => {
                if (res.status === 200) {
                    console.log(res,'id');
                    this.setState({
                        streInfo: res.data,
                        huodong: res.data.activities,
                        loadFlag: false
                    })
                }

            }
        )
    }
    //滚动事件 头部搜索框定位
    scrollHandlers = () => {
        let scrollTop = document.documentElement.scrollTop;  //滚动条滚动高度
        if (scrollTop < 199) {
            document.querySelector('.el-tabs__header').style.position = 'relative'
        }
        if (scrollTop > 200) {
            document.querySelector('.el-tabs__header').style.position = 'fixed'
            document.querySelector('.el-tabs__header').style.top = 0;
            document.querySelector('.el-tabs__header').style.width = '100%'
            document.querySelector('.el-tabs__header').style.backgroundColor = '#fff'
            document.querySelector('.el-tabs__header').style.zIndex = '889'
        }
    }
    //回主页
    back = () => {
        this.props.history.push('/home')
    }
    //打开卡片
    openCard = (type) => {
        this.setState({
            flag: true
        })
        //遮罩层显示禁止页面滚动
        document.addEventListener('touchmove', this.handler, { passive: false });
        //判断传入参数
        //优惠卡
        if (type === 'discounts') {
            this.keyClose.style.bottom = '0px'
            this.keyClose.style.transition = 'all .4s'
            return
        }
        //商铺信息显示
        this.keyStoreInfo.style.display = 'block'
    }
    //关闭卡片
    closeCard = (type) => {
        this.setState({
            flag: false
        })
        //解除页面滚动限制
        document.removeEventListener('touchmove', this.handler, { passive: true });
        //优惠卡关闭
        if (type === 'discounts') {
            this.keyClose.style.bottom = '-260px'
            this.keyClose.style.transition = 'all .1s'
            return
        }
        //商铺信息隐藏
        this.keyStoreInfo.style.display = 'none'
    }
    //阻止默认事件
    handler = (e) => {
        e.preventDefault();
    }
    render() {
        const { imgBaseUrl, streInfo, huodong, flag, loadFlag } = this.state
        return (
            <div className="store__">
                <Loading loading={loadFlag} text="耐心等待哦～🥰">
                    {/* 遮罩层 */}
                    <div style={{ 'display': flag ? 'block' : 'none' }} className="shelter"></div>
                    {/* 遮罩层 */}
                    {/* 优惠卡片 */}
                    <div ref={c => this.keyClose = c} className="discounts">
                        <i onClick={() => this.closeCard('discounts')} className="el-icon-close"></i>
                        <h4>优惠活动</h4>
                        {
                            huodong.map((k, index) => {
                                return <div className="list_" key={index + 1}>
                                    <span style={{ 'color': '#' + k.icon_color }}>{k.name}</span>
                                    <p>{k.description}</p>
                                </div>
                            })
                        }
                    </div>
                    {/* 优惠卡片 */}
                    {/* 商铺详情卡片 */}
                    <div ref={c => this.keyStoreInfo = c} className="storeInfoCard">
                        <i onClick={() => this.closeCard('storeInfo')} className="el-icon-close"></i>
                        <h3 style={{ 'textAlign': 'center' }}>{streInfo.name}</h3>
                        <div className="info_more">
                            <p>
                                <span className="more_o">{streInfo.rating}</span>
                                <span className="more_t">评分</span>
                            </p>
                            <p>
                                <span className="more_o">{streInfo.recent_order_num}</span>
                                <span className="more_t">月售</span>
                            </p>
                            <p>
                                <span className="more_o">蜂鸟快送</span>
                                <span className="more_t">约10分钟</span>
                            </p>
                            <p>
                                <span className="more_o">5元</span>
                                <span className="more_t">配送费</span>
                            </p>
                            <p>
                                <span className="more_o">10km</span>
                                <span className="more_t">距离</span>
                            </p>
                        </div>
                        <p style={{ 'fontSize': '12px', 'color': '#999', 'textAlign': 'center', 'marginTop': '20px' }}>—公告—</p>
                        <p style={{ 'fontSize': '12px', 'color': '#333', 'textAlign': 'center' }}>{streInfo.promotion_info}</p>
                    </div>
                    {/* 商铺详情卡片 */}
                    <i onClick={this.back} className="el-icon-arrow-left"></i>
                    <img className="infoImg" src={imgBaseUrl + streInfo.image_path} alt="" />
                    <div style={{ 'backgroundImage': `url('${imgBaseUrl}${streInfo.image_path}')` }} className="storebg">

                    </div>
                    <div className="infos">
                        <p className="infosName">{streInfo.name} <span onClick={() => this.openCard('storeInfo')} className="el-icon-caret-right"></span></p>
                        <p><span>评价{streInfo.rating}</span><span>月售{streInfo.recent_order_num}单</span><span>蜂鸟专送</span></p>
                        {
                            huodong.slice(0, 1).map((e, index) => {
                                return <div className="huodong" style={{ 'width': '100%' }} key={index}>
                                    <b style={{ 'color': '#' + e.icon_color, 'float': 'left' }}>{e.description}</b>
                                    <b style={{ 'color': '#' + e.icon_color, 'float': 'left' }}>{e.name}</b>
                                    <span className="open_icon" onClick={() => this.openCard('discounts')} style={{ 'color': '#999', 'fontSize': '12px', 'lineHeight': '27px', 'float': 'right' }}>{huodong.length}个优惠 <span className="el-icon-caret-bottom"></span></span>
                                </div>
                            })
                        }
                        <p style={{ 'fontSize': '12px', 'color': '#666' }}>公告: {streInfo.promotion_info}</p>
                    </div>

                    <Tabs activeName="1" onTabClick={this.moveEle}>
                        <Tabs.Pane label="点餐" name="1">
                            <Need></Need>
                        </Tabs.Pane>
                        <Tabs.Pane label="评价" name="2">
                            <Evaluate></Evaluate>
                        </Tabs.Pane>
                        <Tabs.Pane label="商家" name="3">
                            <StoreInfoCard></StoreInfoCard>
                        </Tabs.Pane>
                    </Tabs>
                </Loading>
            </div>
        )
    }
}
