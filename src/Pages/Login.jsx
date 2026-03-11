import axios from "axios"
import { useEffect, useState } from "react";

export default function ({onlogin}){
  const[Name,setName] =useState("")
  const[Password,setPassword]=useState("")
  async function handleSubmit(e){
    e.preventDefault();
    try {
      const res = await axios.post("/server/login",{name:Name,password:Password})
      setName(null)
      setPassword(null)
      console.log(res)
 
      const {islogged,page} =res.data

      if(res){
        onlogin(islogged,page)
      }

    } catch (error) {
      console.log(error)
    }
  }
    return(
    <div className="center fullscreen">
        
       

       <div className="logContainer center">
         
         <form className="vertical" 
          style={{alignItems: "center" ,
            gap: "20px",
            justifyContent:"space-around"
          }}
          onSubmit={handleSubmit}
         >
              <h1 style={{color:'white'}}>LOGIN</h1>

              <input type="username" placeholder="User Name" required value={Name} onChange={(e)=>setName(e.target.value)} name="username"/>
              <input type="password" placeholder="Password" required value={Password} onChange={(e)=>setPassword(e.target.value)} name="key"/>
              <button >login</button>
          </form>
       </div>
      
      
 
    </div>


    );
}