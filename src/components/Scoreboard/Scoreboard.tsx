import styles from '@/components/Scoreboard/Scoreboard.module.css'

interface ScoreboardProps {
  score: number
  bestScore: number
}

function Scoreboard(props: ScoreboardProps) {
  return (
    <div className={styles.scoreboard}>
      <p>Score: {props.score}</p>
      <p>Best Score: {props.bestScore}</p>
    </div>
  )
}

export default Scoreboard
