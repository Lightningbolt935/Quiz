import { useState, useEffect } from 'react'
import { quiz } from './data/quiz'
import './App.css'

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })
  const [timer, setTimer] = useState(null) // Timer starts as null
  const [showComparison, setShowComparison] = useState(false) // To show the comparison
  const [showMainMenu, setShowMainMenu] = useState(true) // To show the main menu

  const { questions } = quiz
  const { question, choices, correctAnswer } = questions[activeQuestion]

  useEffect(() => {
    if (timer === null) return // Don't start the timer until it's set
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    if (timer === 0) {
      handleTimeout()
    }

    return () => clearInterval(interval) // Cleanup interval on component unmount or timer reset
  }, [timer])

  const handleTimeout = () => {
    setResult((prev) => ({
      ...prev,
      wrongAnswers: prev.wrongAnswers + 1,
    }))
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
      setTimer(15) // Reset timer for the next question
    } else {
      setShowResult(true)
    }
  }

  const onClickNext = () => {
    if (!showComparison) {
      setShowComparison(true) // Show comparison first
      return
    }

    // Move to the next question after showing the comparison
    setShowComparison(false)
    setSelectedAnswerIndex(null)

    setResult((prev) => {
      if (selectedAnswer === correctAnswer) {
        // Add points only if the selected answer is correct
        return {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }
      } else {
        // Increment wrong answers if the selected answer is incorrect
        return {
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        }
      }
    })

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
      setTimer(15) // Reset timer for the next question
    } else {
      setShowResult(true)
    }
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    setSelectedAnswer(answer)
  }

  const restartQuiz = () => {
    setActiveQuestion(0)
    setSelectedAnswer('')
    setShowResult(false)
    setSelectedAnswerIndex(null)
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    })
    setTimer(null) // Reset timer to null
    setShowComparison(false)
    setShowMainMenu(true) // Go back to the main menu
  }

  const startQuiz = () => {
    setShowMainMenu(false) // Hide the main menu and start the quiz
    setTimer(15) // Start the timer
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  return (
    <div className="quiz-container">
      {showMainMenu ? (
        <div className="main-menu">
          <h1>Welcome to the Quiz</h1>
          <button onClick={startQuiz} className="start-button">
            Start Quiz
          </button>
        </div>
      ) : !showResult ? (
        <div>
          <div className="timer">
            Time Left: <span>{timer}s</span>
          </div>
          <div>
            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions.length)}</span>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                {answer}
              </li>
            ))}
          </ul>
          {showComparison && (
            <div className="comparison">
              <p>
                <strong>Your Answer:</strong> {selectedAnswer || 'No answer selected'}
              </p>
              <p>
                <strong>Correct Answer:</strong> {correctAnswer}
              </p>
            </div>
          )}
          <div className="flex-right">
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null && !showComparison}>
              {activeQuestion === questions.length - 1 && showComparison ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
          <button onClick={restartQuiz} className="restart-button">
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  )
}

export default Quiz