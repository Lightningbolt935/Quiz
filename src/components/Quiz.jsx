// components/Quiz.jsx
import React, { useState, useEffect } from "react";
import Question from "./Question";
import Feedback from "./Feedback";
import Result from "./Result";
import quizData from "../data/quizData";

export default function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredData, setFilteredData] = useState(quizData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!quizCompleted && selectedOption === null) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleNext();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestion, selectedOption, quizCompleted]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredData(quizData);
    } else {
      setFilteredData(quizData.filter(q => q.category === selectedCategory));
    }
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
  }, [selectedCategory]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === filteredData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      setTimeLeft(30);
      if (currentQuestion + 1 < filteredData.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
    setTimeLeft(30);
  };

  if (quizCompleted) {
    return <Result score={score} total={filteredData.length} onRestart={handleRestart} />;
  }

  const current = filteredData[currentQuestion];

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <label className="block mb-1">Select Category:</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 border rounded">
          <option value="All">All</option>
          <option value="Geography">Geography</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
        </select>
      </div>
      <h2 className="text-xl font-semibold mb-2">Question {currentQuestion + 1} of {filteredData.length}</h2>
      <p className="mb-2">Time left: {timeLeft}s</p>
      <Question question={current} selectedOption={selectedOption} onOptionClick={handleOptionClick} />
      {selectedOption && (
        <button onClick={handleNext} className="px-4 py-2 bg-green-500 text-white rounded">
          Next
        </button>
      )}
      {showFeedback && (
        <Feedback isCorrect={selectedOption === current.correctAnswer} />
      )}
    </div>
  );
}
