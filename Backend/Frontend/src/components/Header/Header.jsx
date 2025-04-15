import React from 'react'
import './Header.css'

function handleClick(){
      const element = document.getElementById('food-display');
      if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
};


export const Header = () => {

  return (
    <div className='Header'>
        <div className="content">
            <h2>Order your<br/> favourite food here</h2>
            <p>Savor the Convenience: From Our Kitchen to Your Doorstep, Enjoying Delicious Meals Made Easy, Anytime, Anywhere, Every Day!</p>
            <button className='button-81' onClick={() => handleClick()}>view menu</button>
        </div>
    </div>
  )
}