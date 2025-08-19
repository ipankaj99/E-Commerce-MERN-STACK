import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setToken } = useContext(ShopContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
 
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);

        navigate("/"); // redirect to homepage/dashboard
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transition transform hover:scale-[1.01]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Welcome Back 👋
        </h2>

        {/* Error Alert */}
        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded-md mb-4 text-center">
            {error}
          </p>
        )}

        {/* Email */}
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* Password */}
        <label className="block text-gray-700 mb-1 mt-4">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          {...register("password", { required: "Password is required" })}
          className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Links */}
        <div className="flex justify-between mt-5 text-sm text-blue-600">
          <NavLink to="/forgot-password" className="hover:underline">
            Forgot Password?
          </NavLink>
          <NavLink to="/signup" className="hover:underline">
            Create Account
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
