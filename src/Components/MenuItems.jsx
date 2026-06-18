export default function({menuItems, onMenuClick ,clickedMenu}){



return (
    menuItems.map((item) => (
    
        <button onClick={()=>onMenuClick(item)} key={item} 
        className={`${item===clickedMenu ? "Active" : "inActive"}`}
        >{item}</button>
        
      ))
);

}