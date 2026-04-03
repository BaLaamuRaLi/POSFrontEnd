import { useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import AccountLogo from "./AccountLogo";
import MenuItems from "./MenuItems";
import { UserContext } from "../utils/UserContext";
import { api } from "../services/api";

export default function SideBar ({setMenu, onlogout ,clickedMenu}) {
  let menuItems;
const {userRole} =useContext(UserContext)
 const AdminPages=["Dashboard", 
                      "Sales", 
                      "Purchase",
                      "Inventory", 
                      "Accounts" ,
                      "Payments" ,
                      "Returns" ,
                      "Reports" 
                    ];
  const StaffPages=[ 
                      "Sales", 
                      "Purchase",                    
                      "Payments" ,
                      "Returns" ,
                       
                    ];

    if(userRole==="Admin")                
    { menuItems =AdminPages
    }else{
       menuItems=StaffPages
    }


     const [isExpanded, setIsExpanded] = useState(false);
  const handleLogout =  async() => {
        const confirm = await api.showDialogBox("Are you sure you want to logout?",['yes','no']);
        console.log('confirm is ',confirm)
        if (confirm.response===0) {
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
          <MenuItems menuItems={menuItems} onMenuClick={setMenu} clickedMenu={clickedMenu} />
          <button className="logout last"
          onClick={handleLogout}
          >logout</button>
          </>
      
        )}  

       
      
    </div>

    </>
    );
}