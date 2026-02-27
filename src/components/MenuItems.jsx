export default function(){
const menuItems = ["Dashboard", "Sales", "Purchase","Inventory", "Accounts" ,"Payments" ,"Returns" ,"Reports" ];
return (
    menuItems.map((item, index) => (
    
        <button key={index} className="menu-item">{item}</button>
        
      ))
);

}