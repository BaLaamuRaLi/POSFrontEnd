import CloseButton from "../Components/CloseButton";

export default function({accountType ,onClose}){
    return(
    <div className="modal center">
        <div className="popup addAccount">
            <CloseButton onClick={onClose} />
            <h1>Add {accountType}</h1>
        </div>
    </div>
    );
}