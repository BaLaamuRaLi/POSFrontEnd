import { useContext, useEffect, useMemo, useState } from "react";
import CloseButton from "../Components/CloseButton";
import RightPane from "../Components/RightPane";
import Button from "../Components/Button";
import Display from "../Components/Display";
import LeftPane from "../Components/LeftPane";
import LabelInput from "../Components/LabelInput";
import DropBox from "../Components/DropBox";
import { PurchaseContext } from "../utils/PurchaseContext";
import TableMui from "../Components/TableMui";
import { roundoff } from "../utils/utils";
import axios from "axios";
import CircularBackdrop from "../Components/CircularBackdrop";
 

export default function({onClose,openWindow,invoice,setaccount}){
    const{bill,setBill,billItems,setBillItems,setSelectedItem}=useContext(PurchaseContext);
    const [checked,setChecked]=useState(new Set());
    const {date,billNo,discount,invoiceDate,gstType,Supplier}=bill;
    const {Name,gst,phone ,address,prevBalance}=Supplier||{}
    const [open,setOpen]=useState(false);

    
    useEffect(()=>{
        async function createNewPurchase(){
        const res=await axios.get('/server/purchase/new');
        const {billNo,date}=res.data
        setBill(prev=>({
            ...prev,
            billNo:billNo,
            date:date
        }));
        }
    createNewPurchase();
    },[])

    const supplier ={name:"JRK",amount:"1000.0"}
   if(invoice)
    {
        supplier.name=invoice.client;
        supplier.amount=invoice.amount;

    }


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
    {id:"Discount", Component:LabelInput,label:"Discount",type:"text",name:"discount",onChange:handleInput,value:bill?.discount||""},
    {id:"Order No", Component:LabelInput,label:"Order No",type:"text"},
    {id:"payment", Component:LabelInput,label:"Payment",type:"text"},       
    ];
    
    const rheaderConfig =[
    {id:"Date", Component:Display ,label:"Date",text:new Date(date).toLocaleDateString()},
    {id:"Purchaseno", Component:Display ,label:"Bill No",text:billNo},
    {id:"Name", Component:Display ,label:"Name",text:Name},
    {id:"GST", Component:Display ,label:"GSTIN",text:gst},
    {id:"phone", Component:Display ,label:"phone",text:phone},
    {id:"Address", Component:Display ,label:"Address",text:address},
        
    ];

function handleRemove(){
    if(billItems?.length&&checked){      

    setBillItems(prev=> prev.filter((item) => !checked.has(item.ProductCode)));
    setChecked(new Set());
 
}
}



    const rbuttonsconfig=[
        {id:"addProd", Component:Button ,text:"Search Product",onClick:()=>openWindow(["PurchaseInvoice","SearchProduct"])},
        {id:"remProd", Component:Button ,text:"Remove",onClick:handleRemove},
        
    ];


function calculateRowValues(row){
    const discount1 = parseFloat(row.discountPercent) || 0;
    const discount2 = parseFloat(row.discount2percent )|| 0;
    const discount3 = parseFloat(row.discount3percent) || 0;
    const discount4 = parseFloat(row.discount4percent) || 0;

    const rate = parseFloat(row.rate) || 0;
    const quantity = parseFloat(row.quantity) || 0;
    const gst = parseFloat(row.gstRate) || 0;

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
    {field:"ProductCode",header:"Code"},
    {field:"ProductName",header:"Product"},
    {field:"HSN",header:"HSN"},
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
    const billDiscount = parseFloat(discount)||0
    const invAmount=billItems?.reduce((sum,p)=>{
        const {total}=calculateRowValues(p);
            return sum+total;
    },0)*(1-billDiscount/100);
    return roundoff(invAmount,2);
}

function handleSave(isPending="Bill"){
    setOpen(true)
    let invalidKey=null;
    if(isPending!=="pending"){ 
        Object.entries(bill).some(([key, value]) => {
        if (!value) {
            invalidKey=key;
        }
        });
        if(invalidKey){
            window.alert(`Add ${invalidKey}`);
            setOpen(false);
            return ;
            
        }
        if(billItems?.length===0){
            window.alert("add products");
            setOpen(false);
            return ;  
        }
    }

    async function submitPurchase() {
        const {Supplier}=bill;
      const purchaseItems=billItems.map((b)=>{
    const {Expirable,HSN,ProductName,brand,category,size,type,...others}=b;
      return {...others}

      });
 
    
        const res=await axios.post('/server/purchase/add',{
            bill:{
                ...bill,
                Supplier:Supplier?.partyCode||"pending",
                status:isPending
            },
            billItems:purchaseItems,
        });
        if(res.data==="success"){
            setTimeout(()=>{
            setBill({
            gstType:"SGST",
            Supplier: '',
            invoiceNo: '',
            invoiceDate: '',
        });
            setBillItems([]);
            setOpen(false);
            onClose();
            },500);
        }else { 
        window.alert("Error occured during saving");
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



