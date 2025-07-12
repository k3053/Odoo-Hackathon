// src/pages/Main.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);


  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/questions`, {
        params: {
          page,
          filter,
          search: searchTerm
        }
      });
      console.log(res.data.questions);
      setQuestions(res.data.questions);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [page, filter, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchQuestions();
    setSearchTerm(''); // Clear search term after submitting
  };

  return (

    <div className="min-h-screen ml-[8%] mr-[8%] bg-white px-4 py-6">
       {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Login Required</h2>
            <p className="text-sm text-gray-600 mb-4">
              You must be logged in to ask a question, post answers, or upvote.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 rounded text-sm text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <Link
                to="/login"
                className="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-purple-700">StackIt</h1>
        <Link to="/login" className="text-purple-600 border border-purple-600 px-4 py-1 rounded hover:bg-purple-50">
          Login
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <button
          onClick={() => {
            const token = localStorage.getItem('token');
            if (!token) setShowLoginModal(true);
            else window.location.href = '/ask'; // OR use navigate('/ask')
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
        >
          Ask New Question
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setFilter('newest'); setPage(1); }}
            className={`px-3 py-1 border rounded text-sm ${filter === 'newest' ? 'bg-purple-100 border-purple-300' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            Newest
          </button>
          <button
            onClick={() => { setFilter('unanswered'); setPage(1); }}
            className={`px-3 py-1 border rounded text-sm ${filter === 'unanswered' ? 'bg-purple-100 border-purple-300' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            Unanswered
          </button>
          <button
            onClick={() => { setFilter('popular'); setPage(1); }}
            className={`px-3 py-1 border rounded text-sm ${filter === 'popular' ? 'bg-purple-100 border-purple-300' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            More <ChevronDown className="w-4 h-4 inline-block" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded px-2 py-1 w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setPage(1);       // reset to page 1
                fetchQuestions(); // call fetch on Enter
              }
            }}
            placeholder="Search"
            className="flex-1 outline-none text-sm"
          />
          <button type="submit">
            <Search className="w-4 h-4 text-gray-500" />
          </button>
        </form>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q) => (
          <div
            key={q._id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {q.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{q.description}</p>
            <div className="mt-2 flex items-center flex-wrap gap-2 text-xs text-gray-500">
              {q.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
              <span>User: {q.username || 'Anonymous'}</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                {q.answerIds?.length || 0} answers
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-8 gap-2">
        <button
          onClick={() => setPage(page => Math.max(1, page - 1))}
          className="p-2 border rounded hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {[...Array(totalPages).keys()].map((i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${i + 1 === page ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage(page => Math.min(page + 1, totalPages))}
          className="p-2 border rounded hover:bg-gray-100"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Main;
