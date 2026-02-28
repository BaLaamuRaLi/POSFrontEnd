import { useState } from "react";
import Menu from "./Menu";
import AccountLogo from "./AccountLogo";
import MenuItems from "./MenuItems";


export default function SideBar ({setMenu, onlogout}) {    
    
     const [isExpanded, setIsExpanded] = useState(false);
  const handleLogout = () => {
  const confirm = window.confirm("Are you sure you want to logout?");
  if (confirm) {
    onlogout();
  }
  };


    return(
    <>
    

    <div className={`sidebar vertical ${isExpanded ? " expanded " : " collapsed "}`}
    onClick={() => setIsExpanded(true)}
    onMouseLeave={() => setIsExpanded(false)}
    >
      {!isExpanded ? (<Menu onExpand={() => setIsExpanded(true)} />)
        :
        (<>
          <AccountLogo/>
          <MenuItems onMenuClick={setMenu} />
          <button className="logout last"
          onClick={handleLogout}
          >logout</button>
          </>
      
        )}  

       
      
    </div>

    </>
    );
}