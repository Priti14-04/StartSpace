import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        window.location.href = "/idea";
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://th.bing.com/th/id/OIP.J4L-Y6apUBJ9Ol6MJphGNgHaE2?w=262&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3')",
      }}
    >
      
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/20 backdrop-blur-md border border-white/30">
        <h2 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-xl bg-white/80 focus:bg-white outline-none shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl bg-white/80 focus:bg-white outline-none shadow-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-white/90 mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/Signup" className="text-yellow-300 font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
