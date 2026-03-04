import { createPortal } from "react-dom";


export default function({isOpen ,setWindow}){
    if(!isOpen) return null;
    return createPortal(
        <div className="modal center">
            <div className="popup center">
                <h1>Sales Invoice</h1>
                <button onClick={setWindow} >close</button>
            </div>
            
        </div>
    ,document.body);
}