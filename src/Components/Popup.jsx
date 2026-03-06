import { createPortal } from "react-dom";
import CloseButton from "./CloseButton";

export default function({WindowsOpen,Window,children}){
    
    
    
    if(!WindowsOpen.includes(Window)) return null;
    return createPortal(
        <>
        
        {children}
        </>
        
    ,document.body);
}