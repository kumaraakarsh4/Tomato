import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const {GetTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value}));
  }

  const placeOrder = async(event) => {
    event.preventDefault();
    let orderItems = []; 
    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    
    let orderData = {
      address:data,
      items:orderItems,
      amount:GetTotalCartAmount()+3,
    }

    // console.log(orderData);
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
      if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
      }
      else{
        alert(response.data.error);
      }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate("/cart");
    }
    else if(GetTotalCartAmount() == 0){
      navigate("/cart");
      alert("First add some items!")
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">

        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First Name' required/>
          <input name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder='Last Name' required/>
        </div>

        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' required/>
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required/>

        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required/>
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required/>
        </div>

        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' required/>
          <input name='country' onChange={onChangeHandler} value={data.cou} type="text" placeholder='Country' required/>
        </div>

      <input name='phone' onChange={onChangeHandler} type="text" placeholder='Phone' required/>
        
      </div>
      <div className="place-order-right">
          <div className="cart-total">
            <h2>cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>${GetTotalCartAmount()}</p>
              </div>
              <hr id='hori1' />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${GetTotalCartAmount() === 0 ? 0 : 3}</p>
              </div>
              <hr id='hori2' />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${GetTotalCartAmount() === 0 ? 0 : GetTotalCartAmount()+3}</b>
              </div>
            </div>
            <button type='submit'>Proceed To Pay</button>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder