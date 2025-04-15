import React from 'react'
import './Footer.css'
import  Instagram  from '../../assets/Instagram.svg'
import  Linkedin  from '../../assets/Linkedin.svg'
import  Gmail  from '../../assets/Gmail.svg'

const Footer = () => {
  return (
    <div id="foot">
        <footer className="footer">
            <div className="left ft">
                <h1>Tomato.</h1>
            </div>
            <div className="right ft">
            <div className="social">
                        <a href="https://www.instagram.com/aj_aryan09/" target="_blank" rel="noopener noreferrer">
                            <img src={Instagram} className="logo" alt="Instagram" />
                        </a>
                        <a href="www.linkedin.com/in/aryan-gupta-01k" target="_blank" rel="noopener noreferrer">
                            <img src={Linkedin} className="logo" alt="LinkedIn" />
                        </a>
                        <a href="mailto:aryangupta.x01@gmail.com" target="_blank" rel="noopener noreferrer">
                            <img src={Gmail} className="logo" alt="Gmail" />
                        </a>
                    </div>
            </div>
        </footer>
            <p>&copy;2024 Tomato. | All Rights Reserved</p>
    </div>
  )
}

export default Footer