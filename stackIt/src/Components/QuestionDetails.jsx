import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowUp, User } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${API_BASE}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user", err);
    }
  };

  const fetchQuestion = async () => {
    const res = await axios.get(`${API_BASE}/questions/${id}`);
    setQuestion(res.data);
  };

  const fetchAnswers = async () => {
    const res = await axios.get(`${API_BASE}/answers?questionId=${id}`);
    setAnswers(res.data);
  };

  const handleUpvote = async (answerId) => {
    if (!user) return alert("Please login to vote.");
    try {
      await axios.post(`${API_BASE}/answers/${answerId}/upvote`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchAnswers(); // Refresh votes
    } catch (err) {
      alert(err?.response?.data?.message || "Unable to vote");
    }
  };

  const handleSubmitAnswer = async () => {
    if (!user) return alert("Login to submit an answer");
    if (!newAnswer.trim()) return;
    try {
      await axios.post(`${API_BASE}/answers`, {
        questionId: id,
        content: newAnswer
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNewAnswer("");
      fetchAnswers();
    } catch (err) {
      alert("Could not submit answer. You may have already answered.");
    }
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="text-sm mb-2">
        <Link to="/" className="text-purple-600 hover:underline">Questions</Link>
        {" > "}
        <span className="text-gray-600">{question.title.slice(0, 30)}...</span>
      </div>

      <h1 className="text-2xl font-bold">{question.title}</h1>
      <p className="mt-2 text-gray-700">{question.body}</p>

      {/* Tags */}
      <div className="flex gap-2 mt-2">
        {question.tags.map((tag, idx) => (
          <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded">{tag}</span>
        ))}
      </div>

      {/* Answers */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Answers</h2>
        {answers.map((ans) => (
          <div key={ans._id} className="border p-4 rounded mt-4 relative">
            <div className="absolute left-2 top-2">
              <button onClick={() => handleUpvote(ans._id)}>
                <ArrowUp className="w-4 h-4 text-purple-600" />
              </button>
              <p className="text-xs text-center">{ans.upvotes}</p>
            </div>
            <p className="ml-6">{ans.content}</p>
            <div className="text-xs text-gray-500 mt-2 flex items-center gap-1 ml-6">
              <User className="w-4 h-4" />
              {ans.user?.username || "Anonymous"}
            </div>
          </div>
        ))}
      </div>

      {/* Answer Form */}
      <div className="mt-10">
        <h3 className="text-lg font-medium mb-2">Submit Your Answer</h3>
        <textarea
          className="w-full p-3 border rounded resize-none"
          rows={5}
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button
          onClick={handleSubmitAnswer}
          className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuestionDetails;
