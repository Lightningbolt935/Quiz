// components/Feedback.jsx
import React from "react";

export default function Feedback({ isCorrect }) {
  return (
    <div className={`mt-2 p-2 text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
      {isCorrect ? "Correct!" : "Incorrect!"}
    </div>
  );
}
