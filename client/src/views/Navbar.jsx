import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import About from "./About.jsx";
import Contact from "./Contact.jsx";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-tight">
            Start<span className="text-yellow-300">Space</span>
          </span>
        </Link>
          
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/idea" className="hover:underline">Ideas</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/new" className="ml-2 inline-block bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-semibold">Submit Idea</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="text-sm hover:opacity-90">Login</Link>
              <Link to="/signup" className="ml-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow-sm">Sign up</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm">{user.name || user.email}</span>
              <button onClick={handleLogout} className="bg-white text-indigo-700 px-3 py-1 rounded">Logout</button>
            </div>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(s => !s)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md bg-white/10 hover:bg-white/20"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/5 border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setOpen(false)} className="block">Home</Link>
            <Link to="/idea" onClick={() => setOpen(false)} className="block">Ideas</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="block">About</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="block">Contact</Link>
            <Link to="/new" onClick={() => setOpen(false)} className="block font-semibold bg-white/10 px-3 py-2 rounded mt-2">Submit Idea</Link>

            {!user ? (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center">Login</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 text-center bg-white text-indigo-700 px-3 py-2 rounded">Sign up</Link>
              </div>
            ) : (
              <div className="flex gap-2 pt-2">
                <button onClick={() => { setOpen(false); handleLogout(); }} className="w-full bg-white text-indigo-700 px-3 py-2 rounded">Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}