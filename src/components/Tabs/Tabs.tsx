import Tab from '@/components/Tabs/Tab'
import styles from '@/components/Tabs/Tabs.module.css'

interface TabsProps {
  tabLabels?: string[]
  setActiveTab: (tab: string) => void
  activeTab: string
}

function Tabs(props: TabsProps) {
  return (
    <div className={styles.tabs}>
      {props.tabLabels &&
        props.tabLabels.map((label) => (
          <Tab
            key={label}
            label={label}
            isActive={label === props.activeTab}
            onClick={() => props.setActiveTab(label)}
          />
        ))}
    </div>
  )
}

export default Tabs
