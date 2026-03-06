import CloseButton from "../Components/CloseButton";

export default function({onClose}){
    return(
    <div className="modal center">
        <div className="popup SearchProduct">
            <CloseButton onClick={onClose} />
            <div className="selectedProducts">
             <h1>Search Product</h1>
            </div>
            <div className="filterProducts">

            </div>
            <div className="listProducts">

            </div>
           
        </div>
    </div>

    );
}