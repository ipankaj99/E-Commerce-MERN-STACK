import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Policy from '../components/Policy'
import Subscriber from '../components/Subscriber'
import Footer from '../components/Footer'
function Home() {
  return (
    <div>
        <Hero/>
        <LatestCollection/>
        <BestSeller/>
        <Policy/>
        <Subscriber/> 
    </div>
  )
}

export default Home