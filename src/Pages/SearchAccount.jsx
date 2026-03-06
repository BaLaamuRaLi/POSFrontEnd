import CloseButton from "../Components/CloseButton";

export default function({accountType,onClose}){
    return(
    <div className="modal center">
        <div className="popupChild">
            <CloseButton onClick={onClose} />
            <h1>{accountType}</h1>
        </div>
    </div>

    );
}