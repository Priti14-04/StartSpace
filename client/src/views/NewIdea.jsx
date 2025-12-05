import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewIdea = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login first!");
        return;
      }

      const res = await axios.post(
        "http://localhost:8080/idea",
        { title, category, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setMessage("Idea submitted successfully!");
        setTimeout(() => navigate("/idea"), 1500);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting idea");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-10 border border-white/30">
        <h2 className="text-4xl font-bold text-center text-white mb-8 drop-shadow">
          💡 Submit a New Idea
        </h2>

        {message && (
          <p className="text-center text-yellow-200 mb-4 font-semibold">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            type="text"
            placeholder="Enter Idea Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/80 shadow-md focus:bg-white outline-none"
            required
          />

          <input
            type="text"
            placeholder="Enter Category (e.g., Startup, Tech, Health)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/80 shadow-md focus:bg-white outline-none"
            required
          />

          <textarea
            placeholder="Write your idea in detail..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/80 shadow-md focus:bg-white outline-none min-h-[150px]"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            🚀 Submit Idea
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewIdea;
