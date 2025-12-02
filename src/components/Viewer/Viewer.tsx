import styles from '@/components/Viewer/Viewer.module.css'
import MemoryGame from '@/components/MemoryGame/MemoryGame'

interface ViewerProps {
  activeTab: string
}

function Viewer(props: ViewerProps) {
  return (
    <div className={styles.viewer}>
      {props.activeTab === 'Memory Game' && <MemoryGame />}
    </div>
  )
}

export default Viewer
