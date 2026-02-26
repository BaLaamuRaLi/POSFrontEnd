import { useState } from "react";


export default function SideBar () {

    const menuItems = ["Dashboard", "Sales", "Purchase","Inventory", "Accounts" ,"Payments" ,"Returns" ,"Reports" ];
    
     const [isExpanded, setIsExpanded] = useState(false);

    return(
    <>

      {!isExpanded && (
        <img
          src="src\assets\menu.svg"
          alt="menu"
          className="floating-menu logo"
          onMouseEnter={() => setIsExpanded(true)}
          style={{width:'3%'}}
        
        />
      )}


    <div className={`sidebar Vertical ${isExpanded ? " expanded " : " collapsed "}`}
    onMouseEnter={() => setIsExpanded(true)}
    onMouseLeave={() => setIsExpanded(false)}
    >
        {isExpanded &&(
        
        <div style={{display:'grid',placeItems:'center'}} >
    
        <img className="user logo" src="src\assets\image.png" alt="Logo"/>
        </div>
        )}

        {isExpanded &&(menuItems.map((item, index) => (
    
        <button key={index} className="menu-item">{item}</button>
        
      )))}
    
      
    </div>

    </>
    );
}