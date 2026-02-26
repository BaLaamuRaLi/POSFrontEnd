import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideBar from './Components/SideBar'
import MainContent from './Components/MainContent'

function App() {
 
  return (
    
    <div className="App Horizontal">
      <SideBar />
      <MainContent/>
    </div>

  )
}

export default App
