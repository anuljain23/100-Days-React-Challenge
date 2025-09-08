import Navbar from './components/Navbar'
import Main from './components/Main'
import { useContext } from 'react'
import { ThemeContext } from './context/themeContext'
import { DataProvider } from './context/dataContext'

const App = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} ${theme.text} flex flex-col gap-0 md:gap-4`}>
      {/* Navbar */}
      <Navbar />
      {/* Main Page */}
      <DataProvider>
        <Main />
      </DataProvider>
    </div>
  )
}

export default App