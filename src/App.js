import React, { useState, useEffect } from 'react'

const App = () => {
  const [targetNumber, setTargetNumber] = useState(0)
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [hint, setHint] = useState('')

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess('')
    setMessage('')
    setAttempts(0)
    setGameWon(false)
    setHint('Arvaa numero väliltä 1-100')
  }

  const handleGuess = () => {
    const guessNum = parseInt(guess)
    if (isNaN(guessNum)) {
      setMessage('Syötä kelvollinen numero!')
      return
    }

    setAttempts(prev => prev + 1)
    
    if (guessNum === targetNumber) {
      setMessage(`Onneksi olkoon! Arvasit numeron ${attempts + 1} yrityksellä!`)
      setGameWon(true)
      setHint('')
    } else {
      const newHint = guessNum > targetNumber 
        ? 'Liian suuri numero!' 
        : 'Liian pieni numero!'
      setHint(newHint)
      setMessage(`Yritä uudelleen! (Yritys ${attempts + 1})`)
    }
    setGuess('')
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Arvaa Numero</h1>
      
      <div className="mb-6">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Syötä arvauksesi..."
          disabled={gameWon}
        />
      </div>

      <div className="space-y-4">
        <button
          onClick={handleGuess}
          disabled={gameWon}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Arvaa
        </button>

        {gameWon && (
          <button
            onClick={startNewGame}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Pelaa uudestaan
          </button>
        )}
      </div>

      {hint && (
        <div className="mt-4 p-4 bg-blue-100 rounded text-center">
          {hint}
        </div>
      )}

      {message && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-center">
          {message}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 text-center">
        Yrityksiä: {attempts}
      </div>
    </div>
  )
}

export default App
