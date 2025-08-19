import React from 'react'
import { assets } from '../assets/assets'
import Subscriber from '../components/Subscriber'

function About() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Top container */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide">ABOUT US___</h2>
      </div>
      
      {/* Bottom container: responsive flex layout */}
      <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
        {/* Left image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.about_img}
            alt="About Us"
            className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Right text */}
        <div className="md:w-1/2 space-y-8 text-gray-700">
          <p className="text-justify leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate cum recusandae consectetur ducimus ab similique accusamus architecto, explicabo laboriosam, deleniti repellat ipsa ipsam adipisci nisi magni excepturi dolorem non quas, facere officiis maxime odio sit sequi. Deserunt quis soluta veniam!
          </p>
          <p className="text-justify leading-relaxed">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit sed corporis, itaque quidem, excepturi aliquid ipsum numquam reiciendis debitis, consequuntur fugiat quas a odit necessitatibus neque ut commodi beatae expedita eius est ipsa! Dolorum natus laudantium officia in iusto ducimus?
          </p>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Our Mission</h3>
            <p className="text-justify leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi dicta ratione eius nemo fugit, natus error, molestias eos ad iusto, expedita fuga tempore. Sequi culpa dolore hic inventore vitae quo!
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section with increased top margin */}
      <div className="mt-24 mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-10 tracking-wide">
          WHY CHOOSE US___
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Quality Assurance',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, amet?',
            },
            {
              title: 'Customer Support',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, amet?',
            },
            {
              title: 'Fast Delivery',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, amet?',
            },
          ].map(({ title, description }, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold mb-3 text-blue-600">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscriber Section with minimal bottom margin */}
      <div className="mt-20 mb-2">
        <Subscriber />
      </div>
    </div>
  )
}

export default About
