import { useMemo } from "react";
import CloseButton from "../Components/CloseButton";
import ComponentsExtractor from "../Components/ComponentsExtractor";
import Input from "../Components/Input";
import ResultTable from "../Components/ResultTable";
import Button from "../Components/Button";

export default function({onClose}){
    const filterConfigs=[
    {id:"Type", Component:Input,type:"text",placeholder:"Type: bulb, pipe"},
    {id:"Size", Component:Input,type:"text",placeholder:'Size: 9W, 1"'},
    {id:"Company", Component:Input,type:"text",placeholder:'Company: Luker, Supreme'},
    {id:"Batch", Component:Input,type:"text",placeholder:"Batch no:"},
    {id:"Batch1", Component:Input,type:"text",placeholder:"Batch no:"},
    {id:"Batch2", Component:Input,type:"text",placeholder:"Batch no:"},
    {id:"Batch3", Component:Input,type:"text",placeholder:"Batch no:"},

    ];

        const selected = useMemo(()=>[
        { id: 1, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 2, Product: "orange", Qty: 3500 ,Profit:10},
        { id: 3, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 4, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 5, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 6, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 7, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 8, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 9, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 10, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 11, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 12, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 13, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 14, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 15, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 16, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 17, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 18, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 19, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 21, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 22, Product: "orange", Qty: 3500 ,Profit:10},
        { id: 23, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 24, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 25, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 26, Product: "apple", Qty: 2000 ,Profit:10},
        { id: 27, Product: "apple", Qty: 3500 ,Profit:10},
        { id: 28, Product: "apple", Qty: 3500 ,Profit:10},
        
        ],[]);
    
    const footerconfigs= [
        {id:"Add" ,Component:Button,text:"Add"}
    ];

    return(
    <div className="modal center">
        <div className="popup SearchProduct">
            <CloseButton onClick={onClose} />
            <div className="selectedProducts vertical">
             <ResultTable invoices={selected}/>

            </div>
            <div className="filterProducts horizontal">
            <ComponentsExtractor components={filterConfigs} />
            </div>
            <div className="listProducts">
               <ResultTable invoices={selected}/>
            </div>
            <div className="footerSearchProducts horizontal">
            <ComponentsExtractor components={footerconfigs}/>
            
            </div>
           
        </div>
    </div>

    );
}