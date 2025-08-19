import React from 'react';
import { assets } from '../assets/assets.js';

function Hero() {
  return (
   <section className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-[4vw] lg:px-[8vw] py-10 bg-gray-50">
  {/* Hero Left */}
  <div className="flex flex-col gap-5 text-center md:text-left md:w-1/2">
    <p className="text-sm uppercase text-gray-500 tracking-widest">Our Bestsellers</p>
    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
      Latest Arrivals
    </h2>
    <p className="text-lg text-gray-600">Shop now</p>
  </div>

  {/* Hero Right */}
  <div className="mt-8 md:mt-0 md:w-1/2 flex flex-col items-center">
    <div className="w-full h-96">
      <img
        src={assets.hero_img}
        alt="Latest collection hero"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</section>

  );
}

export default Hero;
