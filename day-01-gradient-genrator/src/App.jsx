import React, { useContext, useState } from 'react'
import NavBar from './components/NavBar'
import { ViewContext } from './context/ViewContext'
import CardPage from './components/CardPage'
import FullScreenPage from './components/FullScreenPage'
import GridPage from './components/GridPage'

const App = () => {
  const { view } = useContext(ViewContext)
  return (
    <div className='min-h-screen bg-gray-100'>
      <NavBar />
      {view === 'card' ? (<CardPage />) : null}
      {view === 'fullscreen' ? (<FullScreenPage />) : null}
      {view === 'grid' ? (<GridPage />) : null}
    </div>
  )
}

export default App