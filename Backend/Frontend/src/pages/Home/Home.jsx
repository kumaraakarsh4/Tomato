import React, { useEffect, useState } from 'react'
import './Home.css'
import { Header } from '../../components/Header/Header'
import { ExploreMenu } from '../../components/ExploreMenu/ExploreMenu'
import { FoodDisplay } from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/Appdownload/AppDownload';
// import Footer from '../../components/Footer/Footer';

export default function Home() {

  const [category,setCategory] = useState("All");

  return (
    <div className='Home'>
      <Header/>

      <ExploreMenu category = {category} setCategory = {setCategory} />

      <FoodDisplay category = {category}/>

      <AppDownload/>
    </div>
  )
}
