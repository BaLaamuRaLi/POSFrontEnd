import CloseButton from "../Components/CloseButton";

export default function({onClose}){
    return(
    <div className="modal center">
        <div className="popup SearchProduct">
            <CloseButton onClick={onClose} />
            <h1>Search Product</h1>
        </div>
    </div>

    );
}