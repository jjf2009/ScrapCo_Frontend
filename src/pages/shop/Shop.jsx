import React from 'react'
import Banner from './Banner'
// import TopSellers from './TopSellers'
import Recommened from './Recommened'

const Shop = () => {
  return (
    <div className='bg-white'>
        <Banner/>
        {/* <TopSellers/> */}
        <Recommened/>
    </div>
  )
}

export default Shop