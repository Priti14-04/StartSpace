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

      const authorQuery = user?._id 
        ? `?author=${user._id}`
        : "?status=published";

      const url = `${import.meta.env.VITE_API_URL}/ideas${authorQuery}`;

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
    if (user !== null) fetchIdea();
  }, [user]);

  useEffect(() => {
    window.addEventListener("focus", fetchIdea);
    return () => window.removeEventListener("focus", fetchIdea);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Ideas</h1>
      <p className="text-lg mb-6">{user ? `Hello ${user.name}!` : `Welcome Guest!`}</p>

      {loading ? (
        <p className="text-center">Loading Ideas...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : idea.length > 0 ? (
        idea.map((item) => (
          <InvestorIdea
            key={item._id}
            idea={item}
          />
        ))
      ) : (
        <p className="text-gray-600 text-center">No ideas found. Be the first to submit!</p>
      )}
    </div>
  );
}

export default AllIdea;
