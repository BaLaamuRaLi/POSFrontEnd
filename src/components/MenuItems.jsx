export default function({onMenuClick}){
const menuItems = ["Dashboard", "Sales", "Purchase","Inventory", "Accounts" ,"Payments" ,"Returns" ,"Reports" ];


return (
    menuItems.map((item, index) => (
    
        <button onClick={()=>onMenuClick(item)} key={index} className="menu-item">{item}</button>
        
      ))
);

}