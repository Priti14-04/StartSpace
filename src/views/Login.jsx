// ...existing code...
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginUser = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, user);
      if (response?.data?.success) {
        const token = response.data.token;
        const userObj = response.data.user || {};
        const userWithToken = { ...userObj, token };
        localStorage.setItem("loggedInUser", JSON.stringify(userWithToken));
        window.location.href = "/";
      } else {
        alert(response?.data?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className='text-center text-4xl font-bold mb-6'>Login</h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder='Email'
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder='Password'
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            onClick={loginUser}
            type="button"
          >
            Login
          </button>

          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 underline">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
// ...existing code...