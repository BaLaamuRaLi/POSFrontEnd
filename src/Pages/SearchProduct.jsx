import CloseButton from "../Components/CloseButton";
import ComponentsExtractor from "../Components/ComponentsExtractor";
import Input from "../Components/Input";

export default function({onClose}){
    const filterConfigs=[
    {id:"Type", Component:Input,type:"text",placeholder:"Type: bulb, pipe"},
    {id:"Size", Component:Input,type:"text",placeholder:'Size: 9W, 1"'},
    {id:"Company", Component:Input,type:"text",placeholder:'Company: Luker, Supreme'},
    {id:"Batch", Component:Input,type:"text",placeholder:"Batch no:"},

    ];
    return(
    <div className="modal center">
        <div className="popup SearchProduct">
            <CloseButton onClick={onClose} />
            <div className="selectedProducts">
             <h1>Search Product</h1>
            </div>
            <div className="filterProducts horizontal">
            <ComponentsExtractor components={filterConfigs} />
            </div>
            <div className="listProducts">

            </div>
           
        </div>
    </div>

    );
}