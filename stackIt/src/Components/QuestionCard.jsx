import {ThumbsUp, MessageCircle, Eye, User} from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

const Stat = ({ icon: Icon, value }) => (
    <div className="flex items-center space-x-1 text-gray-600">
      <Icon className="w-4 h-4" />
      <span>{value}</span>
    </div>
  );

const QuestionCard = ({ q }) => (
    <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-lg p-4 hover:bg-white/40">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 cursor-pointer">
            <Link to={`/question/${q._id}`}>
              <h2 className="font-semibold text-lg hover:underline">{q.title}</h2>
            </Link>
          </h3>
          <p className="text-gray-600 mt-1">{q.description}</p>
          <div className="flex items-center space-x-2 mt-2">
            {q.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/20 rounded-full text-xs text-gray-600">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2 ml-4">
          <Stat icon={ThumbsUp} value={q.votes} />
          <Stat icon={MessageCircle} value={q.answerIds.length} />
          <Stat icon={Eye} value={q.views} />
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span>{q.username}</span>
        </div>
        <span>{new Date(q.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );

  export default QuestionCard;  