import React, { Component } from 'react'
import Search from './search/index'
import Species from './species/index'
import Store from './store/index'
import { addFood } from '../../api/food'
export default class home extends Component {
    componentDidMount() {
        document.title = '饿死了么'
        const data = {
            restaurant_id: 1,
            geohash: '23.12497,113.26308',
            entities: [
                {
                    attr:[],
                    extra:{},
                    id: 23716,
                    name: "阿斯顿·",
                    packing_fee: 0,
                    price: 20,
                    quantity: 1,
                    sku_id: 23689,
                    specs: { anme: '规格', value: '111', _id: "5e018a9ede911551beafacf0" },
                    stock: 1000
                }
            ]
        }
        addFood(data).then(
            res => {
                console.log(res);
            }
        )
    }
    render() {
        return (
            <div>
                <Search></Search>
                <Species></Species>
                <Store></Store>
            </div>

        )
    }
}
