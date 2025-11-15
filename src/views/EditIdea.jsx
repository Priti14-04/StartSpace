import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getCurrentUser } from '../util';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { toast, Toaster } from 'react-hot-toast';

const IDEA_CATEGORIES = ["Technology", "Travel", "Food", "Lifestyle", "Fashion", "Sports"];

function EditIdea() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(IDEA_CATEGORIES[0]);
  const [status, setStatus] = useState("draft");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    setUser(getCurrentUser());
    fetchIdea();
  }, []);

  const fetchIdea = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/idea/${slug}`);
      const idea = response.data.data;
       if (!idea) {
      toast.error("ideas not found");
      return;
    }

      
      setTitle(idea.title);
      setContent(idea.content);
      setCategory(idea.category);
      setStatus(idea.status);
    } catch (error) {
    
    if (error.response?.status === 404) {
      toast.error("idea not found");
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to fetch idea");
    }
    console.error("Error details:", error);
  } finally {
    setLoading(false);
  }
};

  const updateIdea = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/idea/${slug}`, {
        title,
        content,
        category,
        status,
        author: user?._id
      });

      if (response?.data?.success) {
        toast.success("Idea Updated Successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } 
    catch (error) {
      console.error("Error updating idea:", error);
      toast.error("Failed to update idea");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Edit Idea</h1>

      <input
        type="text"
        placeholder='Idea Title'
        className='border p-3 w-full my-4'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className='flex gap-4 my-4'>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className='border p-2'
        >
          {IDEA_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className='border p-2'
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <MarkdownEditor
        value={content}
        height='500px'
        onChange={(value) => {
          setContent(value);
        }}
      />

      <button 
        className='bg-blue-500 text-white px-4 py-2 mt-4 rounded cursor-pointer'
        type="button"
        onClick={updateIdea}
      >
        Update Idea
      </button>

      <Toaster />
    </div>
  );
}

export default EditIdea;