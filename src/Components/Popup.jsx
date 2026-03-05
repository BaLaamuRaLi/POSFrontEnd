import { createPortal } from "react-dom";
import CloseButton from "./CloseButton";

export default function({isOpen,openWindow,children}){
    
    
    
    if(isOpen!=openWindow) return null;
    return createPortal(
        <>
        
        {children}
        </>
        
    ,document.body);
}