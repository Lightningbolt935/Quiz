// App.jsx\
import './App.css';
import React from "react";
import Quiz from "./components/Quiz";
import './Question.css';
import './Feedback.css';
import './Result.css';
import './Quiz.css';

<div className="container">
  <select>
    <option>All</option>
    <option>Geography</option>
    {/* other categories */}
  </select>

  <h2>Question 4 of 4</h2>
  <div className="timer">Time left: 15s</div>
  <div className="question">What is the capital of Germany?</div>

  <div className="options">
    <button>Berlin</button>
    <button>Vienna</button>
    <button>Zurich</button>
    <button>Hamburg</button>
  </div>
</div>



export default function App() {
  return (
    <div className="App min-h-screen bg-gray-50 flex items-center justify-center">
      <Quiz />
    </div>
  );
}
