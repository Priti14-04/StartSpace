import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../util";
import axios from "axios";
import InvestorIdea from "../components/InvestorIdea";

function AllIdea() {
  const [user, setUser] = useState(null);
  const [idea, setIdea] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIdea = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/idea?status=published`;
      if (user && user._id) {
        url = `${import.meta.env.VITE_API_URL}/idea?author=${user._id}`;
      }
      const response = await axios.get(url);
      setIdea(response.data.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Set user when component mounts
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Fetch blogs when user changes
  useEffect(() => {
    fetchIdea();
  }, [user]);

  // Refetch blogs when returning to page
  useEffect(() => {
    window.addEventListener('focus', fetchIdea);
    return () => window.removeEventListener('focus', fetchIdea);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Ideas</h1>
      <p className="text-lg mb-6">
        {user ? `Hello ${user.name}!` : `Welcome Guest!`}
      </p>

      {loading ? (
        <p>Loading Ideas...</p>
      ) : idea.length > 0 ? (
        idea.map((idea) => {
          const {
            _id,
            title,
            content,
            author,
            publishedAt,
            updatedAt,
            status,
            category,
            slug,
          } = idea;

          return (
            <InvestorIdea
              key={_id}
              title={title}
              content={content}
              author={author}
              publishedAt={publishedAt}
              updatedAt={updatedAt}
              status={status}
              category={category}
              slug={slug}
            />
          );
        })
      ) : (
        <p className="text-gray-600">No Ideas found.</p>
      )}
    </div>
  );
}

export default AllIdea;