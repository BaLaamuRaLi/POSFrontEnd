import { useState } from 'react'
import './App.css'
import SideBar from './Components/SideBar'
import MainContent from './Components/MainContent'
import Login from './Pages/Login'
import { UserContext } from './utils/UserContext'

function App() {
 const [isLoggedIn, setLog] = useState(false)
 const [Clicked, setMenu] = useState("Dashboard")
 const [userRole,setUserRole] =useState(null)
 
 
//  setLog should be done by backend,
//  never rely on frontend verification

  return (
  <UserContext.Provider value={{userRole,setUserRole}}>
   {isLoggedIn?(<div className="App">
      <SideBar setMenu={setMenu} onlogout={()=>{setLog(false)}} clickedMenu={Clicked}/>
        
      <MainContent menuClicked={Clicked}/>
    </div>)
    :
    ( <Login onlogin={(x,y)=>{setLog(x); setMenu(y)}}/>
    )}
  </UserContext.Provider>
  )
}

export default App
