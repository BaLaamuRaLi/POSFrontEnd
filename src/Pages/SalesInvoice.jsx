import CloseButton from "../Components/CloseButton";
import LeftPane from "../Components/LeftPane";
import RightPane from "../Components/RightPane";
import DropBox from "../Components/DropBox";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Display from "../Components/Display";
import { useContext, useEffect, useMemo, useState } from "react";
import ListButton from "../Components/ListButton";
import { SalesContext } from "../utils/SalesContext";
import TableMui from "../Components/TableMui";
import TableInput from "../Components/TableInput"
import  {roundoff} from "../utils/utils.js"
import LabelInput from "../Components/LabelInput.jsx";
import CircularBackdrop from "../Components/CircularBackdrop.jsx"
import { api } from "../services/api.js";


export default function({onClose ,openWindow,invoice=null,setaccount}){
    const [isSaveAs,setSaveAs]=useState(false);
    const [isPrint,setPrint]=useState(false);
    const [orderDetails,setDetails]=useState(null);// for edit sales page
    const [checked,setChecked]=useState(new Set());
    const {bill,setBill,billItems,setBillItems} =useContext(SalesContext);
    const [open,setOpen]=useState(false);
    const {orderDate,orderNO,Customer,Agent}=bill;
    const{Name,gst,phone ,address,prevBalance}=Customer||{};


    
useEffect(()=> {
if(!invoice)return;    
    async function getSalesDetails (){

//    const res= await get(`/server/sales/orders/${invoice.id}`)
   setBill(res.data);
 }
 getSalesDetails();
},[]);


useEffect(()=>{
    if(invoice)return;   
   async function getOrderNo(){
    const res = await api.createOrder();
    const {billNo,date}=res;
    setBill(prev=>(
        {
            ...prev,
            orderDate:date,
            orderNO:billNo
        }
    ));

    
   }
   getOrderNo();

},[]);



function handleRemove(){
    if(billItems?.length&&checked){      

    setBillItems(prev=> prev.filter((item) => !checked.has(item.ProductCode)));
    setChecked(new Set());
 
}
}


//#region left pane Config

    const items =["Buy 1 get 1","3 for 100Rs" ,"No offer" ,
    ];

    const tax =["40%","18%" ,"5%" ,
    ];



    const lheaderConfig =useMemo(()=>[
        {id:"sCustomer", Component:Button ,text:"Search Customer",onClick:()=>{openWindow(["SalesInvoice","SearchCustomer"]);setaccount("Customer")}},
        {id:"sAgent", Component:Button ,text:"Search Agent",onClick:()=>{openWindow(["SalesInvoice","SearchAgent"]);setaccount("Agent")}},
        {id:"Batch", Component:Input,type:"text",placeholder:"Batch no:"},        
        {id:"offer", Component:DropBox,message:"select offer" ,items:items,name:"offer" },

    ],[]);

function handleDiscount(e){
    const value=e.target.value;
    setBill(prev=>({
        ...prev,
        totalDiscount:value
    }));
}
    

    const lbillConfig =[
        // {id:"Discount", Component:LabelInput,type:"text",label:"Discount %",onChange:handleDiscount,value:bill?.totalDiscount||""},
        {id:"Commision", Component:Input,type:"text",placeholder:"Agent Commision:"},
        {id:"Charge", Component:Input,type:"text",placeholder:"Delivery Charge:"},
        {id:"otherCharge", Component:Input,type:"text",placeholder:"Service Charge:"},
        
    ];

//#endregion
     


//#region rightpaneConfig
    const rheaderConfig =[
        {id:"Date", Component:Display ,label:"Date",text:new Date(orderDate).toLocaleDateString()},
        {id:"Draft", Component:Display ,label:"Draft No",text:orderNO},
        {id:"Name", Component:Display ,label:"Name",text:Name},
        {id:"GST", Component:Display ,label:"GSTIN",text:gst},
        {id:"phone", Component:Display ,label:"phone",text:phone},
        {id:"Address", Component:Display ,label:"Address",text:address},
        {id:"Agent", Component:Display ,label:"Agent",text:Agent?.Name},
       
    ];

    const rbuttonsconfig=[
        {id:"addProd", Component:Button ,text:"Search Product",onClick:()=>openWindow(["SalesInvoice","SearchProduct"])},
        {id:"remProd", Component:Button ,text:"Remove",onClick:handleRemove},
        
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
                

    default:
       return p;
    }
     }
     return p;
    }
    )
  );   
    

}

function calculateRowValues(row){
    const discount = Number(row.discountPercent) || 0;
    const rate = Number(row.rate) || 0;
    const quantity = Number(row.quantity) || 0;
    const gst = Number(row.gstRate) || 0;
    const gross = rate * quantity; 
    const discountAmt=discount *gross/100;
    const taxable = gross -discountAmt;
    const taxAmt = taxable * gst / 100;
    const total = taxable + taxAmt;

    return {
        gross,
        discountAmt,
        taxable,
        taxAmt,
        total
    };
}

const calculatedItems=billItems.map((item)=>{
    const {gross,discountAmt,taxable,taxAmt,total}=calculateRowValues(item);
    const derivedItem= {
        ...item,
        gross:gross,
        discountAmt:discountAmt,
        taxable:taxable,
        taxAmt:taxAmt,
        total:total
    }
    return derivedItem;
});

    const columns =[
    {field:"ProductCode",header:"Code"},
    {field:"ProductName",header:"Product"},
    {field:"quantity",header:"Quantity",
        render:(row)=>
            (<TableInput onInputChange={handleInputChange} row={row} field={"quantity"} defaultValue=""/> )
        
    },
    {field:"unit",header:"Unit"},
    {field:"rate",header:"Rate"},
    {field:"gross",header:"Gross"},
    {field:"discountPercent",header:"Discount (%)",
         render:(row)=>
            (<TableInput onInputChange={handleInputChange} row={row} field={"discountPercent"} defaultValue=""/> )
        
    },
    {field:"discountAmt",header:"Discount Amount",},
    {field:"taxable",header:"Taxable Amount", },
    {field:"gstRate",header:"GST (%)"},
    {field:"taxAmt",header:"Tax Amount",},
    {field:"total",header:"Total",},
   
   ];

    const rcontentConfig=[
        {id:"result", Component:TableMui,list:calculatedItems,selectedIds:checked, setSelectedIds:setChecked,columns:columns},

    ];

const SaveAsmenu=["Bill","Estimate"];
const Printmenu=["Bill","GST Bill","Estimate"];
function handleSave(status){

    if(!bill?.Customer&&status!=="pending"){
      api.showDialogBox("add Customer");
        return;
    }
    if(!billItems?.length&&status!=="pending"){
        api.showDialogBox("add products");
        return;
    }

   setOpen(true);


async function submitSalesOrder(){
      const {Customer,Agent}=bill;
      const salesItems=billItems.map((b)=>({
       ProductCode: b.ProductCode,  
        quantity: b.quantity,
        discountPercent: b.discountPercent

      }));
    const res= await api.submitSales( { 
        
       
        bill:{
        ...bill,
        Customer:Customer?.partyCode||"pending",
        Agent:Agent?.partyCode||"self",
        status:status
        }, 
        billItems :salesItems

    }); 
    
  
   if(res==="success"){
   setTimeout(()=>{
    setBill({});
    setBillItems([]);
    setOpen(false);
    onClose();
   },500);
}else { 
   api.showDialogBox("Error occured during saving");
     setOpen(false);
    }
}
submitSalesOrder();

}
function handlePrint(selected){
    console.log("Print as ",selected)
    handleSave(selected);
}

function calculateAmount(){
    const billDiscount=Number(bill?.totalDiscount)||0;
    const amount=billItems?.reduce((sum,p)=>{
        const quantity=p?.quantity||0;
        const rate=p?.rate||0;
        const discountPercent=p?.discountPercent||0;
        const gst=p?.gstRate;
        const discount=Number(discountPercent)*(rate*Number(quantity))/100;
            const taxable=rate*Number(quantity)-discount;
            const taxAmt=taxable*gst/100;
            return sum+taxable+taxAmt;
    },0)*(1-billDiscount/100) // subtracting discount applied to invoice
    
    return roundoff(amount,2);
}

    const rfooterConfig =[
        {id:"balance", Component:Display ,label:"Previous Balance",text:prevBalance},
        {id:"Total", Component:Display ,label:"Amount",text:calculateAmount()},
        {id:"save", Component:ListButton ,text:"Save As",items:SaveAsmenu,show:setSaveAs,isOpen:isSaveAs,onSelect:handleSave},
        {id:"print", Component:ListButton ,text:"Print",items:Printmenu,show:setPrint,isOpen:isPrint,onSelect:handlePrint},
      
    ];



   
//#endregion 
    
 function handleClose(){

    /* code for sending order details to backend */ 
   
   handleSave("pending");
  
 }

    return (
        <div className="modal center">
            
            
            <div className="popup">
            <CircularBackdrop open={open}/>
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