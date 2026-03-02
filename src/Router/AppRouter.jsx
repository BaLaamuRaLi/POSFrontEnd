import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, useState } from "react";
const SideBar = lazy(()=>import("../Components/SideBar"));
const Login = lazy(()=>import("../Pages/Login"));
const SalesInvoice = lazy(()=>import("../Pages/SalesInvoice"));
const MainContent = lazy(()=>import("../Components/MainContent"));


export default function(){
 const [isLoggedIn, setLog] = useState(false)
 const [Clicked, setMenu] = useState("Dashboard")
 

    return(
    <BrowserRouter>
         <Routes>
            <Route path="/" element={ isLoggedIn?<Navigate to="/dashboard" /> : <Login onlogin={()=>{setLog(true); setMenu("Dashboard")}}/>}/>
        
            <Route
            path="/dashboard"
            element={isLoggedIn ?
                    (<div className="App">
                  <SideBar setMenu={setMenu} onlogout={()=>{setLog(false)}} clickedMenu={Clicked}/>
                    
                  <MainContent menuClicked={Clicked}/>
                </div>) 
                :
                (<Login onlogin={()=>{setLog(true); setMenu("Dashboard")}}/>) 
            }
            />

            <Route path="/newSales" element={<SalesInvoice/>} />
        
         </Routes>


         
    </BrowserRouter>
    );
}