import { useState } from 'react'
import './App.css'
import SideBar from './Components/SideBar'
import MainContent from './Components/MainContent'
import Login from './Pages/Login'

function App() {
 const [isLoggedIn, setLog] = useState(false)
 const [Clicked, setMenu] = useState("Dashboard")
 
 //setLog should be done by backend,
 //never rely on frontend verification

  return (
  
   isLoggedIn?(<div className="App">
      <SideBar setMenu={setMenu} onlogout={()=>{setLog(false)}} clickedMenu={Clicked}/>
        
      <MainContent menuClicked={Clicked}/>
    </div>)
    :
    ( <Login onlogin={()=>{setLog(true); setMenu("Dashboard")}}/>
    )

  )
}

export default App
