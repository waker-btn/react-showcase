import { useState } from 'react'
import Cardboard from '../Cardboard/Cardboard.js'
import Scoreboard from '../Scoreboard/Scoreboard.js'

function MemoryGame() {
  const [score, setScore] = useState<number>(0)
  const [clickedCards, setClickedCards] = useState<Set<string>>(
    new Set<string>()
  )
  const [bestScore, setBestScore] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)

  const handleCardClick = (cardName: string) => {
    if (clickedCards.has(cardName)) {
      setBestScore((prevBest) => (score > prevBest ? score : prevBest))
      setClickedCards(new Set())
      setScore(0)
      setLevel(1)
      return
    }

    setClickedCards((prevClicked: Set<string>) => {
      const newClicked = new Set(prevClicked)
      newClicked.add(cardName)
      return newClicked
    })

    const newScore = score + 1
    setScore(newScore)

    if (newScore > 0 && newScore % 12 === 0) {
      setLevel((prev) => prev + 1)
      setClickedCards(new Set())
    }
  }

  return (
    <>
      <h1>Memory Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <Cardboard onCardClick={handleCardClick} level={level} />
    </>
  )
}

export default MemoryGame
