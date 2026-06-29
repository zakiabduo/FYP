import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import Topdoctors from "../components/Topdoctors";
import Banners from '../components/Banners';

const Home = () => {
  return (
    // Added modern entry animation grid space alignment wrapper
    <div className='w-full animate-in fade-in duration-500 flex flex-col gap-4'>
      <Header />
      <SpecialityMenu />
      <Topdoctors />
      <Banners />
    </div>
  )
}

export default Home


