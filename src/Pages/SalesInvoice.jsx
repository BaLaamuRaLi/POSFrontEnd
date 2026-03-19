import CloseButton from "../Components/CloseButton";
import LeftPane from "../Components/LeftPane";
import RightPane from "../Components/RightPane";
import DropBox from "../Components/DropBox";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Display from "../Components/Display";
import { useContext, useEffect, useMemo, useState } from "react";
import ListButton from "../Components/ListButton";
import axios from "axios";
import { SalesContext } from "../utils/SalesContext";
import TableMui from "../Components/TableMui";
import TableInput from "../Components/TableInput"
import  {roundoff} from "../utils/utils.js"



export default function({onClose ,openWindow,invoice=null,setaccount}){
    const [isSaveAs,setSaveAs]=useState(false);
    const [isPrint,setPrint]=useState(false);
    const [orderDetails,setDetails]=useState(null);// for edit sales page
    const [checked,setChecked]=useState(new Set());
    const {bill,setBill,billTtems,setBillItems} =useContext(SalesContext);
    

    
useEffect(()=> {
if(!invoice)return;    
    async function getSalesDetails (){
   const res= await axios.get(`/server/sales/orders/${invoice.id}`)
   setBill(res.data);
 }
 getSalesDetails();
},[]);


useEffect(()=>{
    if(invoice)return;
   const today= new Date().toLocaleDateString();
   
   async function getOrderNo(){
    try{
    const res=await axios.get('/server/sales/newOrder');
    setBill(prev=>(
        {
            ...prev,
            orderDate:today,
            orderNO:res.data
        }
    ));
    }
    catch (error) {
        throw new Error(error);
        
    }
   }
   getOrderNo();

},[]);





//#region left pane Config

    const items =["Buy 1 get 1","3 for 100Rs" ,"No offer" ,
    ];

    const tax =["40%","18%" ,"5%" ,
    ];



    const lheaderConfig =useMemo(()=>[
        {id:"sCustomer", Component:Button ,text:"Search Customer",onClick:()=>{openWindow(["SalesInvoice","SearchCustomer"]);setaccount("Customer")}},
        {id:"sAgent", Component:Button ,text:"Search Agent",onClick:()=>{openWindow(["SalesInvoice","SearchAgent"]);setaccount("Agent")}},
        {id:"Batch", Component:Input,type:"text",placeholder:"Batch no:"},
        {id:"Discount", Component:Input,type:"text",placeholder:"Discount %:"},     
        {id:"Unit", Component:Input,type:"text",placeholder:"Unit:"},
        {id:"Tax", Component:DropBox,message:"select Tax" ,items:tax,name:"Tax" , dvalue:"18%"},
        {id:"offer", Component:DropBox,message:"select offer" ,items:items,name:"offer" },

    ],[]);

    
    

    const lbillConfig =[
        {id:"Discount", Component:Input,type:"text",placeholder:"Total Discount:"},
        {id:"Commision", Component:Input,type:"text",placeholder:"Agent Commision:"},
        {id:"Charge", Component:Input,type:"text",placeholder:"Delivery Charge:"},
        {id:"otherCharge", Component:Input,type:"text",placeholder:"Service Charge:"},
        

    ];

//#endregion
     


//#region rightpaneConfig
    const rheaderConfig =[
        {id:"Date", Component:Display ,label:"Date",text:bill?.orderDate},
        {id:"Draft", Component:Display ,label:"Draft No",text:bill?.orderNO},
        {id:"Name", Component:Display ,label:"Name",text:bill?.Customer?.Name},
        {id:"GST", Component:Display ,label:"GSTIN",text:bill?.Customer?.gst},
        {id:"phone", Component:Display ,label:"phone",text:bill?.Customer?.phone},
        {id:"Address", Component:Display ,label:"Address",text:bill?.Customer?.address},
        {id:"Agent", Component:Display ,label:"Agent",text:bill?.Agent?.Name},
       
    ];

    const rbuttonsconfig=[
        {id:"addProd", Component:Button ,text:"Search Product",onClick:()=>openWindow(["SalesInvoice","SearchProduct"])},
        {id:"remProd", Component:Button ,text:"Remove",onClick:()=>console.log("clicked removed")},
        
    ];
    const columns =[
    {field:"ProductCode",header:"Code"},
    {field:"ProductName",header:"Product"},
    {field:"quantity",header:"Quantity",
        render:(row)=>
            (<TableInput onInputChange={handleInputChange} row={row} field={"quantity"} defaultValue=""/> )
        
    },
    {field:"unit",header:"Unit"},
    {field:"rate",header:"Rate"},
    {field:"discountPercent",header:"Discount (%)",
         render:(row)=>
            (<TableInput onInputChange={handleInputChange} row={row} field={"discountPercent"} defaultValue=""/> )
        
    },
    {field:"discountAmt",header:"Discount Amount",
         render:(row)=>
            (<TableInput onInputChange={handleInputChange} row={row} field={"discountAmt"} defaultValue=""/> )
        
    },
    {field:"taxable",header:"Taxable Amount",
        render:(row)=>(row.rate-parseFloat(row.discountAmt||0))
    },
    {field:"gstRate",header:"GST (%)"},
    {field:"taxAmt",header:"Tax Amount",
        render:(row)=> {
            const taxable=row.rate-parseFloat(row.discountAmt||0);
            return (taxable*row.gstRate/100);
        }
    },
    {field:"total",header:"Total",
        render:(row)=>{
            const taxable=row.rate-parseFloat(row.discountAmt||0);
            const taxAmt=taxable*row.gstRate/100;
            console.log("total",(taxable+taxAmt)*row.quantity)
            return ((taxable+taxAmt)*row.quantity);
        }
    },

   
   ];
function handleInputChange(e,item,field){
  
const value = e.target.value;

  setBillItems(prev =>
    prev.map(p =>{
     if( p.ProductCode === item.ProductCode){

    switch (field) {
    case "quantity":
     return { ...p, quantity: value }
       

    case "discountPercent":
      return { ...p, discountPercent: value }
        

    case "discountAmt":
      return { ...p, discountAmt: value }
        

    default:
       return p;
    }
     }
     return p;
    }
    )
  );   
    

}

    const rcontentConfig=[
        {id:"result", Component:TableMui,list:billTtems,selectedIds:checked, setSelectedIds:setChecked,columns:columns},

    ];

const SaveAsmenu=["Bill","Estimate"];
const Printmenu=["Bill","GST Bill","Estimate"];
async function handleSave(selected){
    console.log("Save As",selected);
//     const res= await axios.post("/server/sales", { bill, billTtems }); 
    
//    res.data==="Error"&&window.alert("Error occured during saving");

}
function handlePrint(selected){
    console.log("Print as ",selected)
    handleSave(selected);
}
    const rfooterConfig =[
        {id:"balance", Component:Display ,label:"Previous Balance",text:bill?.prevBalance},
        {id:"Total", Component:Display ,label:"Amount",text:bill?.Amount},
        {id:"save", Component:ListButton ,text:"Save As",items:SaveAsmenu,show:setSaveAs,isOpen:isSaveAs,onSelect:handleSave},
        {id:"print", Component:ListButton ,text:"Print",items:Printmenu,show:setPrint,isOpen:isPrint,onSelect:handlePrint},
      
    ];



   
//#endregion 
    
 function handleClose(){

    /* code for sending order details to backend */ 
   
    setBill({});
    setBillItems([]);
    onClose();
 }

    return (
        <div className="modal center">
            
            
            <div className="popup">
                
              <CloseButton onClick={handleClose} />
                
            <LeftPane lheadcomps={lheaderConfig} 
                lbillcomps={lbillConfig}
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