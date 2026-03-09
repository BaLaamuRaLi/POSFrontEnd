import Button from "../Components/Button";
import CloseButton from "../Components/CloseButton";
import ComponentsExtractor from "../Components/ComponentsExtractor";
import Display from "../Components/Display";
import DropBox from "../Components/DropBox";
import LabelInput from "../Components/LabelInput";
import SidebySide from "../Components/SidebySide";

export default function({onClose}){

    const lheadConfigs=[
       {id:"ProductCode" ,Component:LabelInput,label:"Product Code",readOnly:true,value:"Product Code"},
       {id:"Batch" ,Component:LabelInput,label:"Batch",readOnly:true,value:"Batch No"},
       {id:"ProductName" ,Component:LabelInput,label:"Product Name",readOnly:true,value:"Product Name"},
       {id:"tax" ,Component:DropBox,label:"Tax Category",items:["18%","5%","40%"],message:"tax category",value:"18%"},
       {id:"Expiry" ,Component:LabelInput,label:"Expiry Date",type:"date"},
    ]

    const lfootConfigs=[
       {id:"LC" ,Component:Display,label:"Landing Cost:",text:"234"},
       {id:"sp" ,Component:Display,label:"Selling Price:",text:"566"},

    ]

    const qty = {Component:LabelInput,label:"Quantity",type:"text"}
    const unit ={Component:DropBox,label:"unit",items:["KG","BAG"],value:"KG",message:"--select--"}
    const rate ={Component:LabelInput,label:"Rate",type:"text"}
    const amount ={Component:LabelInput,label:"Amount",type:"text"}
    const discount1per={Component:LabelInput,label:"Discount %",type:"text"}
    const discount1amt={Component:LabelInput,label:"Rs",type:"text"} 
    const discount2per={Component:LabelInput,label:"Discount2 %",type:"text"}
    const discount2amt={Component:LabelInput,label:"Rs",type:"text"}
   const discount3per={Component:LabelInput,label:"Discount3 %",type:"text"}
   const discount3amt={Component:LabelInput,label:"Rs",type:"text"}
   const discount4per={Component:LabelInput,label:"Discount4 %",type:"text"}
    const discount4amt={Component:LabelInput,label:"Rs",type:"text"}
    
    const rheadConfigs=[
       {id:"qty-unit" ,Component:SidebySide,left:qty,right:unit},
       {id:"rt-Amt" ,Component:SidebySide,left:rate,right:amount},
       {id:"dis1" ,Component:SidebySide,left:discount1per,right:discount1amt},
       {id:"dis2" ,Component:SidebySide,left:discount2per,right:discount2amt},
       {id:"dis3" ,Component:SidebySide,left:discount3per,right:discount3amt},
       {id:"dis4" ,Component:SidebySide,left:discount4per,right:discount4amt},
        
    ]

   const rfootConfigs=[
      {id:"save",Component:Button,text:"Save",onClick:onClose}
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