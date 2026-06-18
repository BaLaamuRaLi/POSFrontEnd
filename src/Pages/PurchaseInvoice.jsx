import { useContext, useEffect, useRef, useState } from "react";
import CloseButton from "../Components/CloseButton";
import RightPane from "../Components/RightPane";
import Button from "../Components/Button";
import Display from "../Components/Display";
import LeftPane from "../Components/LeftPane";
import LabelInput from "../Components/LabelInput";
import DropBox from "../Components/DropBox";
import { PurchaseContext } from "../utils/PurchaseContext";
import TableMui from "../Components/TableMui";
import { roundoff } from "../utils/utils.js";
import CircularBackdrop from "../Components/CircularBackdrop";
import { api } from "../services/api"; 
import { invoiceStatus } from "../utils/enums.js";

export default function({onClose,openWindow,invoice,setaccount}){
    const{bill,setBill,billItems,setBillItems,setSelectedItem}=useContext(PurchaseContext);
    const [checked,setChecked]=useState(new Set());
    const {date,billNo,discount,invoiceDate,gstType,supplier}=bill;
    const {party_id,name:Name,gst_no,phone ,address,prevBalance}=supplier||{}
    const [open,setOpen]=useState(false);


//     const supplier ={name:"JRK",amount:"1000.0"}
//    if(invoice)
//     {
//         supplier.name=invoice.client;
//         supplier.amount=invoice.amount;

//     }


function handleInput(e){
    const value = e.target.value;
  const field=e.target.name;
   setBill(prev=>{
     switch (field) {
    case "discount":
     return { ...prev, discount: value }
    case "invoiceNo":
    return { ...prev, invoiceNo: value }
    case "date":
    return { ...prev, invoiceDate: value }
      case "gstType":
    return { ...prev, gstType: value }
    default:
       return {...prev};
    }
   });
}

    const leftConfigs =[
        {id:"findSuppl", Component:Button ,text:"Search Supplier",onClick:()=>{openWindow(["PurchaseInvoice","SearchSupplier"]);setaccount("Supplier")}},
        {id:"InvoiceNo", Component:LabelInput,label:"Invoice No:",type:"text",name:"invoiceNo",onChange:handleInput,value:bill?.invoiceNo||""},
        {id:"date", Component:LabelInput,label:"Invoice Date",type:"date",name:"date",onChange:handleInput,value:invoiceDate?.split("T")[0]||""},
        {id:"IorSGST" ,Component:DropBox,label:"IGST/SGST",items:["SGST","IGST"],name:"gstType",setValue:gstType,setClick:handleInput},
    ];
    
    
    const billconfigs=[
    // {id:"Discount", Component:LabelInput,label:"Discount",type:"text",name:"discount",onChange:handleInput,value:bill?.discount||""},
    {id:"Order No", Component:LabelInput,label:"Order No",type:"text"},
    {id:"payment", Component:LabelInput,label:"Payment",type:"text"},       
    ];
    
    const rheaderConfig =[
    {id:"Date", Component:Display ,label:"Date",text:new Date(date?.split(' ')[0]).toLocaleDateString()},
    {id:"Purchaseno", Component:Display ,label:"Bill No",text:billNo},
    {id:"Name", Component:Display ,label:"Name",text:Name},
    {id:"GST", Component:Display ,label:"GSTIN",text:gst_no},
    {id:"phone", Component:Display ,label:"phone",text:phone},
    {id:"Address", Component:Display ,label:"Address",text:address},
        
    ];

function handleRemove(){
    if(billItems?.length&&checked){      

    setBillItems(prev=> prev.filter((item) => !checked.has(item.productCode)));
    setChecked(new Set());
 
}
}



    const rbuttonsconfig=[
        {id:"addProd", Component:Button ,text:"Search Product",onClick:()=>openWindow(["PurchaseInvoice","SearchProduct"])},
        {id:"remProd", Component:Button ,text:"Remove",onClick:handleRemove},
        
    ];


function calculateRowValues(row){
    const discount1 = Number(row.discountPercent) || 0;
    const discount2 = Number(row.discount2percent )|| 0;
    const discount3 = Number(row.discount3percent) || 0;
    const discount4 = Number(row.discount4percent) || 0;

    const rate = Number(row.rate) || 0;
    const quantity = Number(row.quantity) || 0;
    const gst = Number(row.gstRate) || 0;

    const amount = rate * quantity;

    const taxable = amount *
        (1 - discount1 / 100) *
        (1 - discount2 / 100) *
        (1 - discount3 / 100) *
        (1 - discount4 / 100);

    const taxAmt = taxable * gst / 100;
    const total = taxable + taxAmt;

    return {
        amount,
        taxable,
        taxAmt,
        total
    };
}

const calculatedItems=billItems.map((item)=>{
    const {amount,taxable,taxAmt,total}=calculateRowValues(item);
    const derivedItem= {
        ...item,
        amount:roundoff(amount,2),
        taxable:roundoff(taxable,2),
        taxAmt:roundoff(taxAmt,2),
        total:roundoff(total,2)
    }
    return derivedItem;
});

    const columns =[
    {field:"productCode",header:"Code"},
    {field:"productName",header:"Product"},
    {field:"hsnCode",header:"HSN"},
    {field:"expiry",header:"Expiry Date",
        render:(row)=>(row.expiry? new Date(row.expiry).toLocaleDateString():'')
        
    },
    {field:"quantity",header:"Quantity"},
    {field:"rate",header:"Rate"},
    {field:"amount",header:"Amount",},
    {field:"discountPercent",header:"Discount 1 (%)"},
    {field:"discount2percent",header:"Discount 2 (%)",},
    {field:"discount3percent",header:"Discount 3 (%)",},
    {field:"discount4percent",header:"Discount 4 (%)",},
    {field:"taxable",header:"Taxable",},
    {field:"gstRate",header:"Tax (%)"},
    {field:"taxAmt",header:"Tax (Rs)",},
     {field:"total",header:"Total",},
     ];

function handleTableClick(row){
    openWindow(["PurchaseInvoice","EditPurchaseItems"])
    setSelectedItem(row);
}
    const rcontentConfig=[
        {id:"result", Component:TableMui ,list:calculatedItems,columns:columns, selectedIds:checked, setSelectedIds:setChecked,onClick:handleTableClick},

    ];

function calcInvoiceAmt(){
    const billDiscount = Number(discount)||0
    const invAmount=billItems?.reduce((sum,p)=>{
        const {total}=calculateRowValues(p);
            return sum+total;
    },0)*(1-billDiscount/100);
    return roundoff(invAmount,2);
}

function handleSave(pendingStatus=invoiceStatus.CONFIRMED){
    setOpen(true)
    let invalidKey=null;
    if(pendingStatus!=="pending"){ 
        Object.entries(bill).some(([key, value]) => {
        if (!value) {
            invalidKey=key;
        }
        });
        if(invalidKey){
           api.showDialogBox(`Add ${invalidKey}`);
            setOpen(false);
            return ;
            
        }
        if(billItems?.length===0){
           api.showDialogBox("add products");
            setOpen(false);
            return ;  
        }
    }

    async function submitPurchase() {
    const {supplier}=bill;
    const purchaseItems=billItems.map((b)=>{
        const {productID,productName,hsnCode,quantity,rate,discountPercent,discount2percent,discount3percent,discount4percent,gstRate,profit,...others}=b;
        return {productID,productName,hsnCode,quantity,rate,discountPercent,discount2percent,discount3percent,discount4percent,gstRate,profit}
    });
 /**
  *   productID:3,
      gstRate: 18,//p
      expiry: '2026-04-16', //batch table
      cost: null, //batch table
      rate: '5', //batch
      stock: null,//batch
      quantity: '8',//batch
      discountPercent: '5',//purchase
      amount: 0,//p
      taxable: 0,//p
      taxAmt: 0,//p
      total: 0,//p
      discount2percent: '5',//p
      discount3percent: '5',//p
      discount4percent: '5'//p

*/
    
        const res=await api.submitPurchase({
            bill:{
                ...bill,
                status:pendingStatus,
                supplier:{
                    supplierId:party_id||null,//null is to bypass foreign key constraint while saving pending bill
                    supplierName:Name,
                    supplierGst:gst_no,
                    supplierAddress:address,
                }
            },
            billItems:purchaseItems,
        });
        if(res==="success"){
            setTimeout(()=>{
            setBill({
            gstType:"SGST",
            supplier: '',
            invoiceNo: '',
            invoiceDate: '',
        });
            setBillItems([]);
            setOpen(false);
            onClose();
            },500);
        }else { 
       api.showDialogBox("Error occured during saving");
        setOpen(false);
        }
    }
    submitPurchase();
   
}

    const rfooterConfig =[
        {id:"balance", Component:Display ,label:"Previous Balance",text:prevBalance},
        {id:"Total", Component:Display ,label:"Amount",text:calcInvoiceAmt()},
        {id:"save", Component:Button ,text:"Save",onClick:()=>handleSave()},
      
        
    ];

function handleClose(){
    handleSave("pending");
}

    return(
    <div className="modal center">
            
            
        <div className="popup purchase">
            <CircularBackdrop open={open}/>
            <CloseButton onClick={handleClose}/>
          
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



