import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Search, Plus, Filter, ChevronLeft, ChevronRight
} from 'lucide-react';
import Sidebar from '../Components/Sidebar';
import MobileHeader from '../Components/MobileHeader';
import AnimatedBackground from '../Components/AnimatedBackground';
import QuestionCard from '../Components/QuestionCard';

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState(null);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/questions`);
      setQuestions(res.data);
    } catch (err) {
      console.error('Error fetching questions:', err);
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
    fetchQuestions();
    fetchUser();
  }, []);

  const canAskQuestion = user && ["user", "admin"].includes(user.role);

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatedBackground />
      <MobileHeader user={user} />
      <div className="flex">
        <Sidebar user={user} />
        <main className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">All Questions</h1>
            {canAskQuestion && (
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90">
                <Plus className="w-5 h-5" />
                <span>Ask Question</span>
              </button>
            )}
          </div>

          <div className="my-4 flex items-center space-x-4 overflow-x-auto pb-2">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 bg-white/30 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="p-2 hover:bg-white/20 rounded-lg">
              <Filter className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="space-y-4">
            {questions.map(q => <QuestionCard key={q._id} q={q} userRole={user?.role || "guest"} />)}
          </div>

          <div className="flex items-center justify-center space-x-2 mt-4">
            <button className="p-2 hover:bg-white/20 rounded-lg">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <span className="text-gray-700">Page {currentPage}</span>
            <button className="p-2 hover:bg-white/20 rounded-lg">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
