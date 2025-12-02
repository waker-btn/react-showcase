import styles from '@/App.module.css'
import Showcase from '@/components/Showcase/Showcase'

function App() {
  return (
    <div className={styles.app}>
      <h1>React Showcase</h1>
      <Showcase />
    </div>
  )
}

export default App
