import Tab from '@/components/Tabs/Tab'

const tabLabels: string[] = ['Tab 1', 'Tab 2', 'Tab 3']

function Tabs() {
  return (
    <>
      {tabLabels.map((label) => (
        <Tab key={label} label={label} />
      ))}
    </>
  )
}

export default Tabs
