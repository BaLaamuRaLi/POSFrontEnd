import { useState } from "react";
import Menu from "./Menu";
import AccountLogo from "./AccountLogo";
import MenuItems from "./MenuItems";


export default function SideBar ({onlogout}) {

    
    
     const [isExpanded, setIsExpanded] = useState(false);

    return(
    <>

      


    <div className={`sidebar vertical ${isExpanded ? " expanded " : " collapsed "}`}
    onMouseEnter={() => setIsExpanded(true)}
    onMouseLeave={() => setIsExpanded(false)}
    >
      {!isExpanded ? (<Menu onExpand={() => setIsExpanded(true)} />)
        :
        (<>
          <AccountLogo/>
          <MenuItems/>
          <button className="logout last"
          onClick={onlogout}
          >logout</button>
          </>
      
        )}  

       
      
    </div>

    </>
    );
}