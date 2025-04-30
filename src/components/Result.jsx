// components/Result.jsx
import React from "react";

export default function Result({ score, total, onRestart }) {
  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="mb-2">Your Score: {score} / {total}</p>
      <button onClick={onRestart} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Restart Quiz
      </button>
    </div>
  );
}
