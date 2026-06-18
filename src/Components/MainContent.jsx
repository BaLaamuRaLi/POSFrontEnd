import Dashboard from "../Pages/Dashboard";
import Sales from "../Pages/Sales";
import Inventory from "../Pages/Inventory";
import Purchase from "../Pages/Purchase";
import Payments from "../Pages/Payments";
import Reports from "../Pages/Reports";
import Returns from "../Pages/Returns";
import Accounts from "../Pages/Accounts";


 
export default function MainContent({menuClicked}){
const menuComponents = { 
     Dashboard:Dashboard,
     Sales: Sales, 
     Inventory:Inventory, 
     Purchase:Purchase,
     Payments:Payments,
     Reports:Reports,
     Returns:Returns,
     Accounts:Accounts };
const Component = menuComponents[menuClicked];
   
    
    return (
    <div className="MainContent">
        <Component/>
    </div>
    );
}