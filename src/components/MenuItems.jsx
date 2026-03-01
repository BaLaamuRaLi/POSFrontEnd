export default function({menuItems, onMenuClick}){



return (
    menuItems.map((item) => (
    
        <button onClick={()=>onMenuClick(item)} key={item} className="menu-item">{item}</button>
        
      ))
);

}