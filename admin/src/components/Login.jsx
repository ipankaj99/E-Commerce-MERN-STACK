import React from 'react';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

function Login({setToken}) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email: data.email,
        password: data.password
      });

      if (response.status === 200) {
        localStorage.setItem('token',response.data?.token)
        setToken(response.data?.token);
      }
      else{
         toast.error(response.data.message);
      }
    } catch (err) {
            toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input 
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format"
              }
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input 
            type="password"
            {...register("password", {
              required: "Password is required"
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
