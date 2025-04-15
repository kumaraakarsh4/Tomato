import React, { useContext } from 'react'
import './Cart.css'
import {StoreContext} from '../../Context/StoreContext'
import { assets } from '../../Eassets/assets';
import { useNavigate } from 'react-router';

export default function Cart() {
  
  const {cartItems, food_list, removeFromCart, GetTotalCartAmount, url, token} = useContext(StoreContext);
  const Navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item,index) => {

            if(cartItems[item._id] > 0){
              return (
                <>
                <div className="cart-item-title cart-items-item">
                    <img className='cart-item-img' src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]} Items</p>
                    <p>${item.price*cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cart-remove-btn'>X</p>
                </div>
                    <hr className= 'hr'/>
                </>
              )
            }

        })}
        <div className="cart-bottom">
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
            <button onClick={() => {
              if(!token){
                alert("First login");
                Navigate('/order');
              }
              else{
                Navigate('/order');
              }
            }}>Proceed To Checkout</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have any promocode, Enter it here.</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='PromoCode?' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

