import React, { Component } from 'react'
import './notf.css'
export default class index extends Component {
    render() {
        return (
            <div>
                <div className="for404"></div>
                <p style={{'fontSize':'14px','color':'#999','textAlign':'center'}}>页面跑丢了哦～🥰</p>
                <div style={{'textAlign':'center'}}>
                    <a style={{'fontSize':'12px','color':'#999','marginRight':'10px'}} href="/home">回到主页</a>
                    <a style={{'fontSize':'12px','color':'#999'}} href="/changeAddress">重新加载</a>
                </div>
            </div>
        )
    }
}
