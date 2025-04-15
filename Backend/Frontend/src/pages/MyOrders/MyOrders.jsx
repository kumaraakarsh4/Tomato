import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from "../../Context/StoreContext"
import {assets} from "../../Eassets/assets"
import "./MyOrders.css"
import axios from 'axios';

const MyOrders = () => {

    const {token,url} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() => {
        if(token){
            fetchOrders();
        }
    },[token]) 

  return (
    <div className='my-orders'>
       <h2>My Orders</h2>
       <div className="container">
        {
            data.map((order,index) => {
                return (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.item.map((items,index) => {
                            if(index == order.item.length-1){
                                return items.name + " x " + items.quantity;
                            }
                            else{
                                return items.name + " x " + items.quantity + " , ";
                            }
                        })}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.item.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })
        }
       </div>
    </div>
  )
}

export default MyOrders
