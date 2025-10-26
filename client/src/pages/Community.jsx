import { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";

function Community() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const { data } = await API.get("/posts");
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts", form); // will attach token via interceptor
      setForm({ title: "", body: "" });
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.message || "Could not create post — login required");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-violet-700 mb-4">Community</h2>

      {user ? (
        <form onSubmit={handleCreate} className="mb-6 p-4 border rounded">
          <h3 className="font-semibold mb-2">Create Post</h3>
          <input value={form.title} name="title" onChange={(e)=>setForm({...form, title:e.target.value})} placeholder="Title" className="w-full p-2 border rounded mb-2" required />
          <textarea value={form.body} name="body" onChange={(e)=>setForm({...form, body:e.target.value})} placeholder="Write something..." className="w-full p-2 border rounded mb-2" required />
          <button className="py-2 px-4 bg-violet-700 text-white rounded">Post</button>
        </form>
      ) : (
        <p className="mb-4">Login to create posts.</p>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="p-4 border rounded shadow-sm">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.body}</p>
            <p className="text-xs mt-2 text-gray-500">By: {post.author?.name || "Unknown"} • {new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
