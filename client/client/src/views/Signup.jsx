import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signupUser = async () => {
    if(!user.name.trim() || !user.email.trim() || !user.password.trim()){
      setError("All fields are required");
      return;
    }
    

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, user);
      if(response?.data?.success){
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => window.location.href = "/login", 2000);
      }
    } catch(err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className='text-center text-4xl font-bold mb-6'>Signup</h1>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <div className="flex flex-col gap-4">
          <input type="text" placeholder='Name' value={user.name} 
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="email" placeholder='Email' value={user.email} 
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="password" placeholder='Password' value={user.password} 
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

          <button onClick={signupUser} disabled={loading}
            className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded-lg font-semibold hover:bg-blue-600 transition duration-200 disabled:opacity-50">
            {loading ? "Signing up..." : "Signup"}
          </button>

          <p className='mt-4 text-center'>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup;
