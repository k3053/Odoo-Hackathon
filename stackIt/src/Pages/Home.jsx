import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Sidebar from "../Components/Sidebar";
import MobileHeader from "../Components/MobileHeader";
import AnimatedBackground from "../Components/AnimatedBackground";
import QuestionCard from "../Components/QuestionCard";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/questions`, {
        params: { page, filter, search: searchTerm },
      });
      setQuestions(res.data.questions || res.data); // fallback if pagination not implemented
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${API_BASE}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [page, filter, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchQuestions();
  };

  const canAskQuestion = user && ["User", "Admin"].includes(user.role);

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatedBackground />
      <MobileHeader user={user} />
      <div className="flex">
        <Sidebar user={user} />
        <main className="flex-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">All Questions</h1>
            
              <button
                onClick={() => window.location.href = "/ask"}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90"
              >
                <Plus className="w-5 h-5" />
                <span>Ask Question</span>
              </button>
            
          </div>

          {/* Filters and Search */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setFilter("newest"); setPage(1); }}
                className={`px-3 py-1 border rounded text-sm ${filter === "newest" ? "bg-purple-100 border-purple-300" : "border-gray-300 hover:bg-gray-100"}`}
              >
                Newest
              </button>
              <button
                onClick={() => { setFilter("unanswered"); setPage(1); }}
                className={`px-3 py-1 border rounded text-sm ${filter === "unanswered" ? "bg-purple-100 border-purple-300" : "border-gray-300 hover:bg-gray-100"}`}
              >
                Unanswered
              </button>
              <button
                onClick={() => { setFilter("popular"); setPage(1); }}
                className={`px-3 py-1 border rounded text-sm ${filter === "popular" ? "bg-purple-100 border-purple-300" : "border-gray-300 hover:bg-gray-100"}`}
              >
                More <ChevronDown className="w-4 h-4 inline-block" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded px-2 py-1 w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="flex-1 outline-none text-sm"
              />
              <button type="submit">
                <Search className="w-4 h-4 text-gray-500" />
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {questions.length === 0 ? (
              <p className="text-gray-500">No questions found.</p>
            ) : (
              questions.map((q) => <QuestionCard key={q._id} q={q} />)
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 hover:bg-white/20 rounded-lg disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <span className="text-gray-700">Page {page}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="p-2 hover:bg-white/20 rounded-lg disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
