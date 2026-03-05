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
    { id: 1, client: "Shibu", amount: 2000 },
    { id: 2, client: "Client B", amount: 3500 },
    { id: 3, client: "Client A", amount: 2000 },
    { id: 4, client: "Client B", amount: 3500 },
    { id: 5, client: "Client B", amount: 3500 },
    { id: 6, client: "Client A", amount: 2000 },
    { id: 7, client: "Client B", amount: 3500 },
    { id: 8, client: "Client B", amount: 3500 },
    { id: 9, client: "Client A", amount: 2000 },
    { id: 10, client: "Client B", amount: 3500 },
    { id: 11, client: "Client B", amount: 3500 },
    { id: 12, client: "Client A", amount: 2000 },
    { id: 13, client: "Client B", amount: 3500 },
    { id: 14, client: "Client B", amount: 3500 },
    { id: 15, client: "Client A", amount: 2000 },
    { id: 16, client: "Client B", amount: 3500 },
    { id: 17, client: "Client B", amount: 3500 },
    { id: 18, client: "Client A", amount: 2000 },
    { id: 19, client: "Client B", amount: 3500 },
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
        {id:"Draft", Component:Display ,text:"Draft No"},
        {id:"Name", Component:Display ,text:"Customer Name"},
        {id:"GST", Component:Display ,text:"GSTIN"},
        {id:"phone", Component:Display ,text:"phone"},
        {id:"Address", Component:Display ,text:"Address"},
       
    ];

    const rcontentConfig=[
        {id:"result", Component:ResultTable ,invoices:result},

    ];

    const rfooterConfig =[
        {id:"Total", Component:Display ,text:"Amount"},
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