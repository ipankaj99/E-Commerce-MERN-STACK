// Policy.jsx
import React from 'react';
import PolicyCard from './PolicyCard';
import { assets } from '../assets/assets';

function Policy() {
  return (
    <div className="px-6 sm:px-[6vw] lg:px-[10vw] py-10 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-full mx-auto">
        <PolicyCard
          icon={assets.exchange_icon}
          title="Easy Exchange Policy"
          description="We offer hassle free exchange policy"
        />
        <PolicyCard
          icon={assets.quality_icon}
          title="7 Days Return Policy"
          description="We offer hassle free return policy"
        />
        <PolicyCard
          icon={assets.support_img}
          title="Best Customer Support"
          description="We provide 24/7 customer support"
        />
      </div>
    </div>
  );
}

export default Policy;
