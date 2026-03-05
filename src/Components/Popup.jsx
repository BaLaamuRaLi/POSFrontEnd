import { createPortal } from "react-dom";
import CloseButton from "./CloseButton";

export default function({isOpen ,children}){
    
    
    
    if(!isOpen) return null;
    return createPortal(
        <>
        
        {children}
        </>
        
    ,document.body);
}