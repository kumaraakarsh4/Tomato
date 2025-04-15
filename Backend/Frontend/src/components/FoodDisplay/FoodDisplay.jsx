import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItems from '../FoodItems/FoodItems'

export const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id = 'food-display'>
        <h1>Top dishes near you</h1>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
              if(category === "All" || category === item.category){
                return <FoodItems key = {index} id= {item._id} name = {item.name} description = {item.description} price ={item.price} image = {item.image} />
              }
            })}
        </div>
    </div>
  )
}
