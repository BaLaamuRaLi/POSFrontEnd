import { createPortal } from "react-dom";

export default function({WindowsOpen,Window,children}){
    
    
    
    if(!WindowsOpen.includes(Window)) return null;
    return createPortal(
        <>
        
        {children}
        </>
        
    ,document.body);
}