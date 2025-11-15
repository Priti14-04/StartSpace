import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import AllIdea from "./views/AllIdea";
import NewIdea from "./views/NewIdea";
import ReadIdea from "./views/ReadIdea";
import Login from "./views/Login";
import Signup from "./views/Signup";
import InvestorIdea from "./components/InvestorIdea";

// Navbar
const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
    <div className="text-2xl font-bold">StartupCommunity</div>
    <div className="space-x-4">
      <Link className="hover:text-gray-200" to="/">Home</Link>
      <Link className="hover:text-gray-200" to="/idea">Ideas</Link>
      <Link className="hover:text-gray-200" to="/new">Submit Idea</Link>
      <Link className="hover:text-gray-200" to="/login">Login</Link>
      <Link className="hover:text-gray-200" to="/signup">SignUp</Link>
    </div>
  </nav>
);

// Footer
const Footer = () => (
  <footer className="bg-gray-900 text-white p-8 text-center mt-8">
    &copy; {new Date().getFullYear()} StartupCommunity. All rights reserved. |
    <span className="ml-2">Follow us on 
      <a href="#" className="text-blue-400 ml-1">Twitter</a>, 
      <a href="#" className="text-blue-400 ml-1">LinkedIn</a>
    </span>
  </footer>
);

// Modern Home Page
const Home = () => {
  const [latestIdeas, setLatestIdeas] = useState([]);

  useEffect(() => {
    const fetchLatestIdeas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/idea?status=published`);
        setLatestIdeas(response.data.data || []);
      } catch (err) {
        console.error("Error fetching latest ideas:", err);
      }
    };
    fetchLatestIdeas();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white h-[600px] flex items-center justify-center">
        <img 
          src="https://th.bing.com/th/id/OIP.7UGQCCg8a6kyAkuteUIWHgHaEK?w=327&h=184&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" 
          alt="Startup" 
          className="absolute inset-0 w-full h-full object-cover "
        />
        <div className="relative text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Grow Your Startup, Connect With Investors</h1>
          <p className="text-xl mb-6">Join our global community of founders and investors</p>
          <div className="space-x-4">
            <Link to="/signup" className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold  transition">Get Started</Link>
            <Link to="/idea" className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition">View Ideas</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Join Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <img className="mx-auto mb-4 h-20" src="https://th.bing.com/th/id/OIP.WZtUOOBIuXvVfmM3AuthQQHaEy?w=281&h=181&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" alt="Investors"/>
            <h3 className="text-xl font-semibold mb-2">Connect with Investors</h3>
            <p>Showcase your startup ideas and get noticed by potential investors worldwide.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <img className="mx-auto mb-4 h-20" src="https://img.icons8.com/color/96/000000/handshake.png" alt="Collaboration"/>
            <h3 className="text-xl font-semibold mb-2">Collaborate & Grow</h3>
            <p>Collaborate with like-minded entrepreneurs and expand your network.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <img className="mx-auto mb-4 h-20" src="https://img.icons8.com/color/96/000000/idea.png" alt="Learn"/>
            <h3 className="text-xl font-semibold mb-2">Learn & Improve</h3>
            <p>Get feedback, improve your idea, and access resources to make your startup successful.</p>
          </div>
        </div>
      </section>

      {/* Latest Ideas Section */}
      <section className="py-16 container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Ideas</h2>
        {latestIdeas.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestIdeas.map((idea) => (
              <InvestorIdea
                key={idea._id}
                title={idea.title}
                content={idea.content}
                author={idea.author}
                publishedAt={idea.publishedAt}
                updatedAt={idea.updatedAt}
                status={idea.status}
                category={idea.category}
                slug={idea.slug}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No ideas found yet.</p>
        )}
      </section>

      {/* Investors / Founders Showcase */}
      <section className="py-16 bg-blue-50 text-center">
        <h2 className="text-3xl font-bold mb-8">Meet Our Investors</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Alice Johnson", img: "https://randomuser.me/api/portraits/women/44.jpg" },
            { name: "Michael Smith", img: "https://randomuser.me/api/portraits/men/46.jpg" },
            { name: "Sofia Lee", img: "https://randomuser.me/api/portraits/women/47.jpg" },
          ].map((inv, idx) => (
            <div key={idx} className="bg-white p-6 rounded shadow hover:shadow-lg transition w-60">
              <img className="mx-auto mb-4 rounded-full h-24 w-24 object-cover" src={inv.img} alt={inv.name}/>
              <h3 className="font-semibold">{inv.name}</h3>
              <p className="text-gray-600 mt-2">Angel Investor</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Share Your Idea?</h2>
       
      </section>
    </div>
  );
};

// App Component
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/idea" element={<AllIdea />} />
          <Route path="/new" element={<NewIdea />} />
          <Route path="/read/:slug" element={<ReadIdea />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
