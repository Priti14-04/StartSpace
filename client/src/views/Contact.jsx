import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const base = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const res = await axios.post(
        `${base}/contact`,
        { name, email, message },
        { headers: { "Content-Type": "application/json" }, validateStatus: () => true }
      );

      if (res.status >= 200 && res.status < 300) {
        toast.success("Message sent. We'll get back to you soon.");
        setName(""); setEmail(""); setMessage("");
      } else {
        toast.error(res.data?.message || `Server returned ${res.status}`);
        console.error("Contact failed:", res);
      }
    } catch (err) {
      console.error("Contact error:", err);
      toast.error(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-6">Send us a message and we'll respond as soon as possible.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border p-2 rounded h-32" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}