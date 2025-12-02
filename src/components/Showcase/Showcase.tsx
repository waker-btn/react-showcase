import Tabs from '@/components/Tabs/Tabs'
import Viewer from '@/components/Viewer/Viewer'
import { useState } from 'react'

const tabLabels = ['Memory Game', 'Tab 2', 'Tab 3']

function Showcase() {
  const [activeTab, setActiveTab] = useState<string>(tabLabels[0])

  const handleActiveTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <>
      <Tabs
        tabLabels={tabLabels}
        setActiveTab={handleActiveTabChange}
        activeTab={activeTab}
      />
      <Viewer activeTab={activeTab} />
    </>
  )
}

export default Showcase
