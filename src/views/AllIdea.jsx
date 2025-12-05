import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../util";
import axios from "axios";
import InvestorIdea from "../components/InvestorIdea";

function AllIdea() {
  const [user, setUser] = useState(null);
  const [idea, setIdea] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchIdea = async () => {
    try {
      setLoading(true);
      setError("");
      const authorQuery = user?._id ? `?author=${user._id}` : "?status=published";
      const url = `${import.meta.env.VITE_API_URL}/idea${authorQuery}`;
      const response = await axios.get(url);
      setIdea(response.data.data || []);
    } catch (err) {
      console.error("Error fetching ideas:", err);
      setError("Failed to fetch ideas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    fetchIdea();
  }, [user]);

  useEffect(() => {
    window.addEventListener("focus", fetchIdea);
    return () => window.removeEventListener("focus", fetchIdea);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            💡 All Ideas
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            {user ? `Hello, ${user.name}! Here are your ideas.` : `Welcome Guest! Explore published ideas below.`}
          </p>
        </div>

       
        {loading && (
          <div className="text-center text-gray-600 text-xl py-10">
            ⏳ Loading Ideas...
          </div>
        )}

        
        {error && (
          <div className="text-center text-red-600 text-lg py-4">
            ❌ {error}
          </div>
        )}

      
        {!loading && !error && idea.length > 0 && (
          <div className="space-y-6">
            {idea.map((idea) => (
              <div
                key={idea._id}
                className="bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition-all border border-gray-200"
              >
                <InvestorIdea
                  title={idea.title}
                  content={idea.content}
                  author={idea.author}
                  publishedAt={idea.publishedAt}
                  updatedAt={idea.updatedAt}
                  status={idea.status}
                  category={idea.category}
                  slug={idea.slug}
                />
              </div>
            ))}
          </div>
        )}

      
        {!loading && idea.length === 0 && !error && (
          <p className="text-center text-gray-600 text-xl py-10">
            😕 No ideas found. Be the first to submit!
          </p>
        )}
      </div>
    </div>
  );
}

export default AllIdea;
