import { useContext } from "react";
import Button from "../Components/Button";
import CloseButton from "../Components/CloseButton";
import ComponentsExtractor from "../Components/ComponentsExtractor";
import Display from "../Components/Display";
import DropBox from "../Components/DropBox";
import LabelInput from "../Components/LabelInput";
import SidebySide from "../Components/SidebySide";
import { PurchaseContext } from "../utils/PurchaseContext";

export default function({onClose,openWindow}){
const {selectedItem,setSelectedItem,setBillItems}=useContext(PurchaseContext);
const {ProductCode,ProductName,quantity,rate,discountPercent
   ,discount2percent,discount3percent,discount4percent,gstRate
}=selectedItem;


    const lheadConfigs=[
       {id:"ProductCode" ,Component:LabelInput,label:"Product Code",readOnly:true,value:ProductCode},
       {id:"Batch" ,Component:LabelInput,label:"Batch",readOnly:true,value:""},
       {id:"ProductName" ,Component:LabelInput,label:"Product Name",readOnly:true,value:ProductName},
       {id:"tax" ,Component:DropBox,label:"Tax Category",name:"tax",items:[18,5,10,40],message:"tax category",setValue:gstRate,setClick:handleInput},
       {id:"Expiry" ,Component:LabelInput,label:"Expiry Date",type:"date"},
       
    ]

    const lfootConfigs=[
       {id:"LC" ,Component:Display,label:"Landing Cost:",text:"234"},
       {id:"sp" ,Component:Display,label:"Selling Price:",text:"566"},
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
      return {...prev,gstRate:value}
    default:
       return {...prev};
    }
   });
   
    
}

function calculateAmount(){
   const {rate,quantity}=selectedItem;
   return rate*quantity;
}
function calcDiscount(discountNo){
    const discount1Percent= discountPercent||0;
    const discount2Percent= discount2percent||0;
    const discount3Percent= discount3percent||0;
    const discount4Percent= discount4percent||0;
    const amount =calculateAmount();
   const discAmt1=(discount1Percent* amount)/100;
    const discAmt2 =(amount- discAmt1)* discount2Percent/100;
     const discAmt3= (amount- discAmt1-discAmt2)*discount3Percent/100;
    const discAmt4 =(amount- discAmt1-discAmt2-discAmt3)*discount4Percent/100;
      switch (discountNo) {
         case 1:
        
         return discAmt1
         case 2:
        
         return discAmt2;
         case 3:
       
         return discAmt3;
         case 4:
          
         return discAmt4;

         default:
            return 0;
      }
   
  
  
}

    const qty = {Component:LabelInput,name:"quantity",label:"Quantity",type:"text",value:quantity,onChange:handleInput}
    const unit ={Component:DropBox,label:"unit",items:["KG","BAG","New Unit"],dvalue:"KG",message:"--select--"}
    const Rate ={Component:LabelInput,label:"Rate",type:"text",name:"rate",value:rate,onChange:handleInput}
    const amount ={Component:LabelInput,label:"Amount",name:"amount",type:"text",value:calculateAmount(),onChange:handleInput}
    const discount1per={Component:LabelInput,label:"Discount %",name:"discount1",type:"text",onChange:handleInput,value:discountPercent||""}
    const discount1amt={Component:LabelInput,label:"Rs",type:"text",value:calcDiscount(1),readOnly:true} 
    const discount2per={Component:LabelInput,label:"Discount2 %",type:"text",name:"discount2",onChange:handleInput,value:discount2percent||""}
    const discount2amt={Component:LabelInput,label:"Rs",type:"text",value:calcDiscount(2),readOnly:true}
   const discount3per={Component:LabelInput,label:"Discount3 %",type:"text",name:"discount3",onChange:handleInput,value:discount3percent||""}
   const discount3amt={Component:LabelInput,label:"Rs",type:"text",value:calcDiscount(3),readOnly:true}
   const discount4per={Component:LabelInput,label:"Discount4 %",type:"text",name:"discount4",onChange:handleInput,value:discount4percent||""}
    const discount4amt={Component:LabelInput,label:"Rs",type:"text",value:calcDiscount(4),readOnly:true}
    
    const rheadConfigs=[
       {id:"qty-unit" ,Component:SidebySide,left:qty,right:unit},
       {id:"rt-Amt" ,Component:SidebySide,left:Rate,right:amount},
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