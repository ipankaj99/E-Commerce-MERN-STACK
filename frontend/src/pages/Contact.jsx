import React from 'react';
import { assets } from '../assets/assets';
import Subscriber from '../components/Subscriber';

function Contact() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Contact Us Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide">
          CONTACT US___
        </h2>
      </div>

      {/* Main content: image + text */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={assets.contact_img}
            alt="Contact Us"
            className="max-w-full max-h-96 object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Contact info */}
        <div className="md:w-1/2 space-y-8 text-gray-700">
          {/* Address & Phone */}
          <div className="space-y-3">
            <h4 className="text-base md:text-lg font-semibold text-red-600 mb-2">Address</h4>
            <address className="not-italic leading-relaxed space-y-1 text-sm md:text-base">
              <p>54709 Williams Station</p>
              <p>Suite 350, Washington, USA</p>
            </address>
            <div className="mt-4">
              <h4 className="text-base md:text-lg font-semibold text-red-600 mb-2">Contact</h4>
              <p className="text-sm md:text-base">Tel: (416) 555-0132</p>
            </div>
          </div>

          {/* Careers section */}
          <div className="space-y-3">
            <h4 className="text-base md:text-lg font-semibold mb-2">Careers at Forever</h4>
            <p className="text-sm md:text-base">Learn more about our teams and job openings</p>
            <button
              type="button"
              className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition mt-4 text-sm md:text-base"
            >
              Explore Job
            </button>
          </div>
        </div>
      </div>

      {/* Subscriber section */}
      <div className="mt-16">
        <Subscriber />
      </div>
    </div>
  );
}

export default Contact;
