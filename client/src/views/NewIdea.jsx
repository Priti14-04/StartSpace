import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { toast, Toaster } from 'react-hot-toast';

<<<<<<< HEAD
const NewIdea = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

=======
const IDEA_CATEGORIES = ["Technology",
    "Health",
    "Travel",
    "Finance",
    "Education",
    "Lifestyle",
    "Food",
    "Entertainment",
    "Sports",
    "science",
    "Art",
    "History",
    "Politics",
    "Environment",
    "Business",
    "Culture",
    "Fashion",
    "Photography",
    "DIY",
    "Parenting",
    "Other",];

function NewIdea() {
>>>>>>> 5e24e8ff6a584f81c7aeb66eea75fba4694fd013
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(IDEA_CATEGORIES[0]);
  const [status, setStatus] = useState('published');
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();

=======
  

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    
   
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      toast.error("Please login to create a Idea");
      navigate('/login');
    }
  }, [navigate]);

  const saveIdea = async () => {
   
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }
    if (!category) {
      toast.error("Category is required");
      return;
    }

    setLoading(true);
>>>>>>> 5e24e8ff6a584f81c7aeb66eea75fba4694fd013
    try {
      
      const logged = JSON.parse(localStorage.getItem("loggedInUser"));
      const token = logged?.token;

      if (!token) {
        toast.error("Authentication required. Please login again.");
        navigate('/login');
        setLoading(false);
        return;
      }

      console.log("Creating idea with token:", token);
      console.log("Idea data:", { title, content, category, status });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ideas`,
        {
          title: title.trim(),
          content: content.trim(),
          category,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

<<<<<<< HEAD
      if (res.data.success) {
        setMessage("Idea submitted successfully!");
        setTimeout(() => navigate("/idea"), 1500);
=======
      console.log("Response:", response.data);

      if (response?.data?.success) {
        toast.success("Idea created successfully!");
        setTimeout(() => {
          navigate('/ideas');
        }, 1500);
      } else {
        toast.error(response?.data?.message || "Failed to create idea");
>>>>>>> 5e24e8ff6a584f81c7aeb66eea75fba4694fd013
      }
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || error.message || "Failed to create blog");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Create New Idea</h1>

      <input
        type="text"
        placeholder='Blog Title'
        className='border p-3 w-full my-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className='flex gap-4 my-4'>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          {BLOG_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <MarkdownEditor
        value={content}
        height='500px'
        onChange={(value) => setContent(value)}
        className='my-4'
      />

      <div className='flex gap-4 mt-4'>
        <button 
          className='bg-green-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold'
          type="button"
          onClick={saveIdea}
          disabled={loading}
        >
          {loading ? 'Creating Idea...' : 'Create Idea'}
        </button>

        <button 
          className='bg-gray-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-gray-600 transition font-semibold'
          type="button"
          onClick={() => navigate('/ideas')}
          disabled={loading}
        >
          Cancel
        </button>
      </div>

      <Toaster position="top-right" />
>>>>>>> 5e24e8ff6a584f81c7aeb66eea75fba4694fd013
    </div>
  );
}

export default NewIdea;