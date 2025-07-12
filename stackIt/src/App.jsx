import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Main from './Pages/Main';
import Register from './Pages/Register';
import QuestionDetails from './Components/QuestionDetails';
import AskQuestion from './Components/AskQuestion';
import Home from './Pages/Home'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/question/:id" element={<QuestionDetails />} />
        <Route path="/ask" element={<AskQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;
