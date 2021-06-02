import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import BottomFrame from './layout/bottomFrame'
import Home from './views/home/home'
import Address from './views/home/search/address/index'
import UserInfo from './views/my'
import Login from './layout/login'
import SetInfo from './layout/setInfo'
import SearchPage from './layout/searchPage'
import StoreFood from './views/home/store/storeFood'
import AllCity from './views/home/search/allCity'
import PushAddress from './views/home/search/pushAddress'
import ForSearchWhereToChoose from './views/home/search/forSearch'
import NOTFOUND from './layout/NotFOUND'
import CheckMyAddress from './views/my/myAddressCheck'
export default class App extends Component {
    
    render() {
        return (
            <div style={{'height':'100%'}}>
                <Switch>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/changeAddress" component={Address}></Route>
                    <Route path="/my" component={UserInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/userInfo" component={SetInfo}></Route>
                    <Route path="/searchPage" component={SearchPage}></Route>
                    <Route path="/dianpu" component={StoreFood}></Route>
                    <Route path="/checkCity" component={AllCity}></Route>
                    <Route path="/pushAddress" component={PushAddress}></Route>
                    <Route path="/searchWhere" component={ForSearchWhereToChoose}></Route>
                    <Route path="/checkMyAddress" component={CheckMyAddress}></Route>
                    <Route path="/notfound" component={NOTFOUND}></Route>
                    <Redirect to="/home"></Redirect>
                </Switch>
                <BottomFrame></BottomFrame>
            </div>
        )
    }
}
