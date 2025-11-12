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
        setTimeout(() => navigate("/idea"), 1500); // redirect after 1.5s
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting idea");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Submit New Idea</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Submit Idea
        </button>
      </form>
    </div>
  );
};

export default NewIdea;
