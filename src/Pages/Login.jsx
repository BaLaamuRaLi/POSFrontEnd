export default function ({onlogin}){
    return(
    <div className="center fullscreen">
        
       

       <div className="logContainer center">
         
         <form className="vertical" 
          style={{alignItems: "center" ,
            gap: "20px",
            justifyContent:"space-around"
          }}
         >
              <h1 style={{color:'white'}}>LOGIN</h1>

              <input type="username" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button  onClick={onlogin}>login</button>
          </form>
       </div>
      
      
 
    </div>


    );
}