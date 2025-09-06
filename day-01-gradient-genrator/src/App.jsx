import { useContext, useState } from 'react'
import NavBar from './components/NavBar'
import { ViewContext } from './context/ViewContext'
import CardPage from './components/CardPage'
import FullScreenPage from './components/FullScreenPage'

const App = () => {
  const { view } = useContext(ViewContext)
  return (
    <div className='min-h-screen bg-gray-100'>
      <NavBar />
      {view === 'card' ? (<CardPage />) : null}
      {view === 'fullscreen' ? (<FullScreenPage />) : null}
    </div>
  )
}

export default App