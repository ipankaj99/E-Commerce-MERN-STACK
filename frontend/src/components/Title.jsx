import React from 'react';

function Title({ text1, text2 }) {
  return (
    <div className="text-center mb-12">
      <p className="text-lg sm:text-xl uppercase tracking-widest text-gray-500">
        {text1}
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mt-2">
        <span className="text-gray-800">{text2}</span>
      </h2>
      <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
    </div>
  );
}

export default Title;
