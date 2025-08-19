import React from 'react';
import { useForm } from 'react-hook-form';

function Subscriber() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submit = (data) => {
    console.log('Form submitted with:', data);
    // Add API call or logic here
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md mt-10 mb-20">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Subscribe now & get 20% off</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, sint.</p>
      </div>

      <form onSubmit={handleSubmit(submit)} className="mt-2">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter your email"
            className="flex-grow bg-transparent p-2 focus:outline-none"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white font-semibold py-2 px-6 text-sm rounded hover:bg-gray-800 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'SUBSCRIBE'}
          </button>
        </div>

        {errors.email && (
          <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
        )}
      </form>
    </div>
  );
}

export default Subscriber;
