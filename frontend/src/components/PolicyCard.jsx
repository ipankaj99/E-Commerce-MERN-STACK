import React from 'react';

function PolicyCard({ icon, title, description }) {
  return (
    <div
      className="flex flex-col items-center p-4 rounded-lg
                 transform transition-transform duration-300
                 hover:scale-105 hover:shadow-lg cursor-pointer max-w-[220px] mx-auto"
    >
      <img src={icon} alt={title} className="w-12 h-12 object-contain mb-3" />
      <h3 className="text-lg font-semibold text-gray-800 text-center">{title}</h3>
      <p className="text-gray-600 text-sm mt-1 text-center">{description}</p>
    </div>
  );
}

export default PolicyCard;
