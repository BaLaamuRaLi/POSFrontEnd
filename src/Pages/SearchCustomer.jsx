import CloseButton from "../Components/CloseButton";

export default function({onClose}){
    return(
    <div className="modal center">
        <div className="popupChild">
            <CloseButton onClick={onClose} />
        </div>
    </div>

    );
}