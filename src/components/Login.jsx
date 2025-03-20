import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Swal from 'sweetalert2';



const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { signInUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const storedSession = localStorage.getItem("userSession");
    if (storedSession) {
      navigate("/"); // Redirect if already logged in
    }
  }, [navigate]);

  // Handle Email & Password Login
  const onSubmit = async (data) => {
    setMessage(""); // Reset error message
    const { session, error } = await signInUser(data.email, data.password);

    if (error) {
      setMessage(error.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      // Save session to localStorage
      localStorage.setItem("userSession", JSON.stringify(session));
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          ScrapCo Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Error Message */}
          {message && <p className="text-red-500 text-sm text-center">{message}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-500 hover:underline">
            Register
          </Link>
        </p>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-5">
          ©2025 ScrapCo. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
