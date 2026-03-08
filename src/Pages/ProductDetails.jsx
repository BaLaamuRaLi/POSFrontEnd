import CloseButton from "../Components/CloseButton";

export default function({onClose}){
    return(
    <div className="modal center">
        <div className="popup productDetails">
        <CloseButton onClick={onClose}/>
        
        </div>
    </div>
    )
}