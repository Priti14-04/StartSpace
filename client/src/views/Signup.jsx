import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signupUser = async () => {
    if (!user.name.trim() || !user.email.trim() || !user.password.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        user
      );

      if (response?.data?.success) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => (window.location.href = "/login"), 2000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://th.bing.com/th/id/OIP.J4L-Y6apUBJ9Ol6MJphGNgHaE2?w=262&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3')",
      }}
    >
      <Toaster position="top-right" />

    
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/20 backdrop-blur-md border border-white/30">
        <h1 className="text-center text-4xl font-bold mb-6 text-white drop-shadow-lg">
          Create Account
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-3 font-semibold">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none shadow-md"
          />

          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none shadow-md"
          />

          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none shadow-md"
          />

          <button
            onClick={signupUser}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>

          <p className="mt-4 text-center text-white/90">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-300 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
