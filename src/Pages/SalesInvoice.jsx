import { createPortal } from "react-dom";
import CloseButton from "../Components/CloseButton";
import LeftPane from "../Components/LeftPane";
import RightPane from "../Components/RightPane";
import DropBox from "../Components/DropBox";
import ResultTable from "../Components/ResultTable";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Display from "../Components/Display";



export default function({isOpen ,setWindow}){

       const result = [
    { id: 1, Product: "apple", Qty: 2000 },
    { id: 2, Product: "orange", Qty: 3500 },
    { id: 3, Product: "apple", Qty: 2000 },
    { id: 4, Product: "apple", Qty: 3500 },
    { id: 5, Product: "apple", Qty: 3500 },
    { id: 6, Product: "apple", Qty: 2000 },
    { id: 7, Product: "apple", Qty: 3500 },
    { id: 8, Product: "apple", Qty: 3500 },
    { id: 9, Product: "apple", Qty: 2000 },
    { id: 10, Product: "apple", Qty: 3500 },
    { id: 11, Product: "apple", Qty: 3500 },
    { id: 12, Product: "apple", Qty: 2000 },
    { id: 13, Product: "apple", Qty: 3500 },
    { id: 14, Product: "apple", Qty: 3500 },
    { id: 15, Product: "apple", Qty: 2000 },
    { id: 16, Product: "apple", Qty: 3500 },
    { id: 17, Product: "apple", Qty: 3500 },
    { id: 18, Product: "apple", Qty: 2000 },
    { id: 19, Product: "apple", Qty: 3500 },
    ];

//#region left pane Config
    const lheaderConfig =[
        {id:"Add", Component:Button ,text:"Add Customer"},

    ];
     const items =["Buy 1 get 1","3 for 100Rs" ,"No offer" ,
    ];
    const lproductConfig =[
        {id:"profit", Component:Input,type:"text",placeholder:"profit %:"},
        {id:"Qty", Component:Input,type:"text",placeholder:"Quantity:"},
        {id:"Discount", Component:Input,type:"text",placeholder:"Discount %:"},
        {id:"offer", Component:DropBox,message:"select offer" ,items:items,name:"offer" ,id:"off"},


    ];
    const lbillConfig =[
        {id:"Discount", Component:Input,type:"text",placeholder:"Total Discount:"},
        {id:"Commision", Component:Input,type:"text",placeholder:"Agent Commision:"},
        {id:"Charge", Component:Input,type:"text",placeholder:"Delivery Charge:"},
        {id:"otherCharge", Component:Input,type:"text",placeholder:"Service Charge:"},
        

    ];

//#endregion

//#region rightpaneConfig
    const rheaderConfig =[
        {id:"Draft", Component:Display ,label:"Draft No",text:"A1001"},
        {id:"Name", Component:Display ,label:"Name",text:"Shibu"},
        {id:"GST", Component:Display ,label:"GSTIN",text:"GA23948324"},
        {id:"phone", Component:Display ,label:"phone",text:"98989238473"},
        {id:"Address", Component:Display ,label:"Address",text:"Pulikattil"},
       
    ];

    const rcontentConfig=[
        {id:"result", Component:ResultTable ,invoices:result},

    ];

    const rfooterConfig =[
        {id:"balance", Component:Display ,label:"Previous Balance",text:"100.0"},
        {id:"Total", Component:Display ,label:"Amount",text:"1000.0"},
    ];
//#endregion 
    

    if(!isOpen) return null;
    return createPortal(
        <div className="modal center">

            <div className="popup">
                
              <CloseButton onClick={setWindow} />
                
            <LeftPane lheadcomps={lheaderConfig} 
                lproductcomps={lproductConfig}
                lbillcomps={lbillConfig}
            />

            <RightPane rheadcomps={rheaderConfig} 
                rcontentcomps={rcontentConfig} 
                rfootcomps={rfooterConfig}
            />

            </div>
            
        </div>
    ,document.body);
}