import styles from '@/components/Tabs/Tab.module.css'

interface TabProps {
  label: string
  isActive?: boolean
  onClick: () => void
}

function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <div
      className={isActive ? styles['tab--selected'] : styles.tab}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

export default Tab
