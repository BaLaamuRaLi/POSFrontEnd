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
    ];

//#region left pane Config
    const lheaderConfig =[
        {id:"sCustomer", Component:Button ,text:"Search Customer"},
        {id:"sAgent", Component:Button ,text:"Search Agent"},
        {id:"Add", Component:Button ,text:"Add Account"},

    ];
     const items =["Buy 1 get 1","3 for 100Rs" ,"No offer" ,
    ];

    const tax =["40%","18%" ,"5%" ,
    ];
    
    const lproductConfig =[
        {id:"Batch", Component:Input,type:"text",placeholder:"Batch no:"},
        {id:"Discount", Component:Input,type:"text",placeholder:"Discount %:"},     
        {id:"Unit", Component:Input,type:"text",placeholder:"Unit:"},
        {id:"Tax", Component:DropBox,message:"select Tax" ,items:tax,name:"Tax" ,id:"tax", value:"18%"},
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
        {id:"Date", Component:Display ,label:"Date",text:"01/01/1000"},
        {id:"Draft", Component:Display ,label:"Draft No",text:"A1001"},
        {id:"Name", Component:Display ,label:"Name",text:"Shibu"},
        {id:"GST", Component:Display ,label:"GSTIN",text:"GA23948324"},
        {id:"phone", Component:Display ,label:"phone",text:"98989238473"},
        {id:"Address", Component:Display ,label:"Address",text:"Pulikattil"},
        {id:"Agent", Component:Display ,label:"Agent",text:"shashi"},
       
    ];

    const rbuttonsconfig=[
        {id:"addProd", Component:Button ,text:"search product"},
        
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
                rbuttons={rbuttonsconfig}
                rcontentcomps={rcontentConfig} 
                rfootcomps={rfooterConfig}
            />

            </div>
            
        </div>
    ,document.body);
}