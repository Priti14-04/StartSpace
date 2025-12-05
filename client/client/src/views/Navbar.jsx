import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 group">
        <img
          src="https://th.bing.com/th/id/OIP.vynN_VBU6lxi3pR5LOm9IgHaE_?w=274&h=185&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3"
          alt="Tiny Blog Logo"
          className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
        />
        <span className="text-2xl font-bold text-orange-600 group-hover:text-orange-700">
          Tiny Blog
        </span>
      </Link>

      <div className="space-x-6 hidden md:flex">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <Link to="/about" className="hover:text-orange-600">About</Link>
        <Link to="/contact" className="hover:text-orange-600">Contact</Link>
        <Link to="/login" className="hover:text-orange-600">Login</Link>
        <Link
          to="/signup"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Signup
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
