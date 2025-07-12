import React, { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE}/questions`,
        {
          title,
          description,
          tags: tags.split(",").map((tag) => tag.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Question posted successfully!");
      console.log("Posted:", response.data);
      setTitle("");
      setDescription("");
      setTags("");
      //naviagate to home page
      window.location.href = "/home"; // or use a router to navigate
    } catch (err) {
      console.error("Error posting question:", err);
      alert("Failed to post question. Please log in or check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-purple-700">Ask a Question</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter your question title"
              className="w-full border rounded-md px-4 py-2 focus:ring-purple-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Explain your question clearly..."
              className="w-full border rounded-md px-4 py-2 h-32 resize-y focus:ring-purple-500 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g., SQL, joins, beginner"
              className="w-full border rounded-md px-4 py-2 focus:ring-purple-500 focus:outline-none"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
