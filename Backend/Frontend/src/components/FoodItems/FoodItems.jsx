import React, { useContext, useState } from 'react'
import './FoodItems.css'
import { assets } from '../../Eassets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItems = ({id, name, price, description, image}) => {

  // const [itemCount, setItemCount] = useState(0);

  const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {!cartItems[id]
              ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='/' />
                : <div className='food-item-counter'>
                  <img onClick={()=> removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                  <p className='foor-item-quantity'>{cartItems[id]}</p>
                  <img onClick={()=> addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>

        <div className="foor-item-info">
            <div className="food-item-rating">
                <p className="food-item-name">{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>

            <p className="food-item-discription">{description}</p>  
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItems