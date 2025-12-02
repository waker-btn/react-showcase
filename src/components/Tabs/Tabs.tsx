import Tab from '@/components/Tabs/Tab'
import { useState } from 'react'
import styles from '@/components/Tabs/Tabs.module.css'

const tabLabels: string[] = ['Tab 1', 'Tab 2', 'Tab 3']

function Tabs() {
  const [activeTab, setActiveTab] = useState<string>(tabLabels[0])

  return (
    <div className={styles.tabs}>
      {tabLabels.map((label) => (
        <Tab
          key={label}
          label={label}
          isActive={label === activeTab}
          onClick={() => setActiveTab(label)}
        />
      ))}
    </div>
  )
}

export default Tabs
