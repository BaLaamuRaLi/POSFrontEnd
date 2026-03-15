import { useMemo } from "react";
import CloseButton from "../Components/CloseButton";
import RightPane from "../Components/RightPane";
import ResultTable from "../Components/ResultTable";
import Button from "../Components/Button";
import Display from "../Components/Display";
import LeftPane from "../Components/LeftPane";
import LabelInput from "../Components/LabelInput";
import DropBox from "../Components/DropBox";
 

export default function({onClose,openWindow,invoice,setaccount}){
    const result = useMemo(()=>[
    { id: 11, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 12, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 13, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 14, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 15, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 16, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 17, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 18, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 19, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 10, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 2, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 21, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 31, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 41, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 51, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 61, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 71, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},
    { id: 81, Product: "apple", Qty: 2000 ,Rate:234,discount:"12%",discount2:"1.5%",Profit:"10%",Amount:2000 ,GST:"18%",TaxAmount: 2000 ,Total:1064},

    ],[]);

    const supplier ={name:"JRK",amount:"1000.0"}
   if(invoice)
    {
        supplier.name=invoice.client;
        supplier.amount=invoice.amount;

    }

    const leftConfigs =[
            {id:"findSuppl", Component:Button ,text:"Search Supplier",onClick:()=>{openWindow(["PurchaseInvoice","SearchSupplier"]);setaccount("Supplier")}},
            {id:"InvoiceNo", Component:LabelInput,label:"Invoice No:",type:"text"},
            {id:"date", Component:LabelInput,label:"Date",type:"date"},
            {id:"IorSGST" ,Component:DropBox,label:"IGST/SGST",items:["SGST","IGST"],dvalue:"SGST"},

        ]
    
    
    const billconfigs=[
        {id:"Discount", Component:LabelInput,label:"Discount",type:"text"},
        {id:"Order No", Component:LabelInput,label:"Order No",type:"text"},
        {id:"payment", Component:LabelInput,label:"Payment",type:"text"},
               
    ]
    
    const rheaderConfig =[
        {id:"Date", Component:Display ,label:"Date",text:"01/01/1000"},
        {id:"Purchaseno", Component:Display ,label:"Bill No",text:"A1001"},
        {id:"Name", Component:Display ,label:"Name",text:supplier.name},
        {id:"GST", Component:Display ,label:"GSTIN",text:"GA23948324"},
        {id:"phone", Component:Display ,label:"phone",text:"98989238473"},
        {id:"Address", Component:Display ,label:"Address",text:"Delhi"},
        
    ];

    const rbuttonsconfig=[
        {id:"addProd", Component:Button ,text:"Search Product",onClick:()=>openWindow(["PurchaseInvoice","SearchProduct"])},
        
    ];

    const rcontentConfig=[
        {id:"result", Component:ResultTable ,list:result,openWindow:()=>openWindow(["PurchaseInvoice","EditPurchaseItems"])},

    ];
    const rfooterConfig =[
        {id:"balance", Component:Display ,label:"Previous Balance",text:"100.0"},
        {id:"Total", Component:Display ,label:"Amount",text:supplier.amount},
        {id:"save", Component:Button ,text:"Save",onClick:onClose},
      
        
    ];
    return(
    <div className="modal center">
            
            
        <div className="popup purchase">
            <CloseButton onClick={onClose}/>
          
            <LeftPane lheadcomps={leftConfigs}
            lbillcomps={billconfigs}
            /> 

            <RightPane rheadcomps={rheaderConfig} 
            rbuttons={rbuttonsconfig}
            rcontentcomps={rcontentConfig} 
            rfootcomps={rfooterConfig}
            />
          
            
            </div>
    </div>

    );
}



