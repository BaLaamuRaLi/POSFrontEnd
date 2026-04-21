import { useContext, useEffect } from "react";
import Button from "../Components/Button";
import CloseButton from "../Components/CloseButton";
import ComponentsExtractor from "../Components/ComponentsExtractor";
import Display from "../Components/Display";
import DropBox from "../Components/DropBox";
import LabelInput from "../Components/LabelInput";
import SidebySide from "../Components/SidebySide";
import { PurchaseContext } from "../utils/PurchaseContext";
import { roundoff } from "../utils/utils";

export default function({onClose,openWindow}){
const {selectedItem,setSelectedItem,setBillItems}=useContext(PurchaseContext);
const {ProductCode,ProductName,quantity,rate,discountPercent
   ,discount2percent,discount3percent,discount4percent,gstRate,expiry,profit
}=selectedItem;

useEffect(()=>console.log('expiry in selected item is ',expiry),[expiry])
function calculateProductDetails(){
   const formatRate=Math.max(0,Number(rate)||0);
   const qty=Math.max(0,Number(quantity)||0);
   const amount=roundoff(formatRate*qty,2);
   let remaining=amount;
    const discount1Percent= Number(discountPercent)||0;
    const discount2Percent= Number(discount2percent)||0;
    const discount3Percent= Number(discount3percent)||0;
    const discount4Percent= Number(discount4percent)||0;
   const discAmt1=roundoff((discount1Percent* remaining)/100,2);
   remaining-=discAmt1;
    const discAmt2 =roundoff(remaining* discount2Percent/100,2);
    remaining-=discAmt2;
     const discAmt3= roundoff(remaining*discount3Percent/100,2);
     remaining-=discAmt3;
    const discAmt4 =roundoff(remaining*discount4Percent/100,2);
    remaining-=discAmt4;
     const taxable= Math.max(0,roundoff(remaining,2));
      const profitMargin=Number(profit)||0;
      let cost=0,price=0;

        if(qty){ 
         cost = roundoff(taxable/qty,2);
         price=roundoff(cost *(1+profitMargin/100),2)
        }
        return {cost,price,discAmt1,discAmt2,discAmt3,discAmt4,amount,taxable}  
}

const {cost,price,amount,discAmt1,discAmt2,discAmt3,discAmt4}=calculateProductDetails();



    const lheadConfigs=[
       {id:"ProductCode" ,Component:LabelInput,label:"Product Code",readOnly:true,value:ProductCode},
       {id:"Batch" ,Component:LabelInput,label:"Batch",readOnly:true,value:""},
       {id:"ProductName" ,Component:LabelInput,label:"Product Name",readOnly:true,value:ProductName},
       {id:"tax" ,Component:DropBox,label:"Tax Category",name:"tax",items:[18,5,10,40],message:"tax category",setValue:gstRate,setClick:handleInput},
       {id:"Expiry" ,Component:Button,text:"Add Expiry"}
       
    ]

    const lfootConfigs=[
       {id:"LC" ,Component:Display,label:"Landing Cost:",text:cost},
       {id:"sp" ,Component:Display,label:"Selling Price:",text:price},
      {id:"EditProfit" ,Component:Button,text:"Edit Profit",onClick:()=>openWindow(["PurchaseInvoice","EditPurchaseItems","EditProfit"])},
    ]

function handleInput(e){
   const value = e.target.value;
  const field=e.target.name;
   setSelectedItem(prev=>{
     switch (field) {
    case "quantity":
     return { ...prev, quantity: value }
       

    case "rate":
      return { ...prev, rate: value }

    case "amount":
      const rate=value/quantity;
      return { ...prev, rate: rate }
   case "discount1":
      return {...prev,discountPercent:value}             
    case "discount2":
      return {...prev,discount2percent:value}  
    case "discount3":
      return {...prev,discount3percent:value}  
    case "discount4":
      return {...prev,discount4percent:value}
   case "tax": 
      return {...prev,gstRate:tax(value)}
   case "expiry": 
      return {...prev,expiry:value}
    default:
       return {...prev};
    }
   });
   
    
}





    const Qty = {Component:LabelInput,name:"quantity",label:"Quantity",type:"text",value:quantity,onChange:handleInput}
    const Unit ={Component:DropBox,label:"unit",items:["KG","BAG","New Unit"],dvalue:"KG",message:"--select--"}
    const Rate ={Component:LabelInput,label:"Rate",type:"text",name:"rate",value:rate,onChange:handleInput}
    const Amount ={Component:LabelInput,label:"Amount",name:"amount",type:"text",value:amount,onChange:handleInput}
    const discount1per={Component:LabelInput,label:"Discount %",name:"discount1",type:"text",onChange:handleInput,value:discountPercent||""}
    const discount1amt={Component:LabelInput,label:"Rs",type:"text",value:discAmt1,readOnly:true} 
    const discount2per={Component:LabelInput,label:"Discount2 %",type:"text",name:"discount2",onChange:handleInput,value:discount2percent||""}
    const discount2amt={Component:LabelInput,label:"Rs",type:"text",value:discAmt2,readOnly:true}
   const discount3per={Component:LabelInput,label:"Discount3 %",type:"text",name:"discount3",onChange:handleInput,value:discount3percent||""}
   const discount3amt={Component:LabelInput,label:"Rs",type:"text",value:discAmt3,readOnly:true}
   const discount4per={Component:LabelInput,label:"Discount4 %",type:"text",name:"discount4",onChange:handleInput,value:discount4percent||""}
    const discount4amt={Component:LabelInput,label:"Rs",type:"text",value:discAmt4,readOnly:true}
    
    const rheadConfigs=[
       {id:"qty-unit" ,Component:SidebySide,left:Qty,right:Unit},
       {id:"rt-Amt" ,Component:SidebySide,left:Rate,right:Amount},
       {id:"dis1" ,Component:SidebySide,left:discount1per,right:discount1amt},
       {id:"dis2" ,Component:SidebySide,left:discount2per,right:discount2amt},
       {id:"dis3" ,Component:SidebySide,left:discount3per,right:discount3amt},
       {id:"dis4" ,Component:SidebySide,left:discount4per,right:discount4amt},
        
    ]

function handleSave(){
  setBillItems(prev =>
    prev.map(p =>{
     if( p.ProductCode === ProductCode){

      return selectedItem;
     }
     return p;
    }
    )
  ); 
  onClose()
}

   const rfootConfigs=[
      {id:"save",Component:Button,text:"Save",onClick:handleSave}
   ]
    return(
    <div className="modal center">
        <div className="popup purchaseItems">
        <CloseButton onClick={onClose}/>
      
        <div className="vertical" 
        style={{gridArea:"1 / 1 / 2 / 2",padding:"20px",flexWrap:"wrap",gap:"10px",alignItems:"self-start"}}>
        <ComponentsExtractor components={lheadConfigs}/>
        </div>
        <div className="vertical" 
        style={{gridArea:"2 / 1 / 4 / 2",gap:"10px",padding:"20px",alignItems:"self-start"}}>
        <ComponentsExtractor components={lfootConfigs}/>
        </div>
        <div className="vertical" style={{gridArea:"1 / 2 / 3 / 3",padding:"20px",flexWrap:"wrap",gap:"10px",alignItems:"self-start"}}>
        <ComponentsExtractor components={rheadConfigs}/>
        </div>
        <div className="horizontal" style={{gridArea:"3 / 2 / 4 / 3",gap:"10px",justifyContent:"flex-end",padding:"0 10px 10px 0"}}>
        <ComponentsExtractor components={rfootConfigs}/> 

        </div>
        
        </div>
    </div>
    )
}