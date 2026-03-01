export default function({onMenuClick}){
const menuItems = ["Dashboard", "Sales", "Purchase","Inventory", "Accounts" ,"Payments" ,"Returns" ,"Reports" ];


return (
    menuItems.map((item) => (
    
        <button onClick={()=>onMenuClick(item)} key={item} className="menu-item">{item}</button>
        
      ))
);

}