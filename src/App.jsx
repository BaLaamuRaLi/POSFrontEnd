import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideBar from './Components/SideBar'
import MainContent from './Components/MainContent'
import Login from './Pages/Login'

function App() {
 const [isLoggedIn, setLog] = useState(false)
 //setLog should be done by backend,
 //never rely on frontend verification
 

  return (
  
   isLoggedIn?(<div className="App horizontal">
      <SideBar onlogout={()=>{setLog(false)}}/>
      <MainContent/>
    </div>)
    :
    ( <Login onlogin={()=>{setLog(true)}}/>
    )

  )
}

export default App
