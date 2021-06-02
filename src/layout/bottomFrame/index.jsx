import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './btf.css'
class index extends Component {
    state = {
        data: [
            {
                icon: 'el-icon-star-on',
                name: '首页',
                index: 0
            },
            {
                icon: 'el-icon-menu',
                name: '发现',
                index: 1
            },
            {
                icon: 'el-icon-document',
                name: '订单',
                index: 2
            },
            {
                icon: 'el-icon-setting',
                name: '我的',
                index: 3
            },
        ],
        currentIndex: 0
    }
    //跳转路由
    changeColor = (id) => {
        this.setState({
            currentIndex: id
        })
        switch (id) {
            case 0:
                return this.props.history.push('/home')
            case 1:
                return this.props.history.push('/notfound')
            case 2:
                return this.props.history.push('/notfound')
            case 3:
                return this.props.history.push('/my')
            default:
                return id
        }
    }
    componentDidMount() {
        //记忆底部选中高亮
        const pathName = this.props.history.location.pathname
        if (pathName === '/my' || pathName === '/userInfo') {
            this.setState({
                currentIndex: 3
            })
        }
        if (pathName === '/home') {
            this.setState({
                currentIndex: 0
            })
        }
    }
    render() {
        const { data } = this.state
        return (
            <div>
                <div style=
                    {{
                        'display': this.props.history.location.pathname === '/dianpu' ||
                            this.props.history.location.pathname === '/login' ||
                            this.props.history.location.pathname === '/checkCity' ||
                            this.props.history.location.pathname === '/pushAddress' ||
                            this.props.history.location.pathname === '/searchWhere' ||
                            this.props.history.location.pathname === '/notfound' ||
                            this.props.history.location.pathname === '/checkMyAddress' ? 'none' : 'block'
                    }}
                >
                    <div className="bottom_fixed">
                        {
                            data.map((i, index) => {
                                return <div
                                    key={index}
                                    className={index === this.state.currentIndex ? "current" : null}
                                    onClick={() => this.changeColor(i.index)}
                                >
                                    <i className={i.icon}></i>
                                    <span>{i.name}</span>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div style=
                    {{
                        'display': this.props.history.location.pathname === '/dianpu' ? 'block' : 'none'
                    }}
                >
                    <div className="carFixed">
                        <div className="tips">
                            <p style={{ 'fontSize': '12px', 'color': '#666' }}>满100减99</p>
                        </div>
                        <div className="car">
                            <div className="carBg">
                            </div>
                            <div className="carbg_c">
                                <i className="el-icon-menu"></i>
                            </div>
                            <div className="needInfo">
                                <p>未选购商品</p>
                                <p>另需配送费5元</p>
                            </div>
                            <h4>¥20起送</h4>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}
export default withRouter(index)
