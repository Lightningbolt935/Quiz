// components/Question.jsx
import React from "react";

export default function Question({ question, selectedOption, onOptionClick }) {
  return (
    <div className="mb-4">
      <p className="mb-4">{question.question}</p>
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => onOptionClick(option)}
          className={`block w-full text-left px-4 py-2 mb-2 border rounded ${selectedOption === option ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
