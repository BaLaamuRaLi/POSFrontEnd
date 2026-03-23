import ContentFilter from "../Components/ContentFilter";
import ContentHeader from "../Components/ContentHeader";
import ResultTable from "../Components/ResultTable";
import AddButton from "../Components/AddButton";
import PrintButton from "../Components/PrintButton";
import SearchBox from "../Components/SearchBox";
import SearchComponents from "../Components/ComponentsExtractor";
import DropBox from "../Components/DropBox";
import Input from "../Components/Input";
import Popup from "../Components/Popup";
import SalesInvoice from "./SalesInvoice";
import { useEffect, useMemo, useState } from "react";
import SearchAccount from "./SearchAccount";
import SearchProduct from "./SearchProduct";
import AddAccount from "./AddAccount";
import axios from "axios";
import { SalesContext } from "../utils/SalesContext";




export default function(){
    const [WindowsOpen, setWindow] = useState([]);
    const [editSales,setEditSales] =useState(null);
    const [accountType,setaccount] =useState(null);
    const [result,setResult] =useState(null)
    const [orderDetails,setOrderDetails]=useState({})
    const[orderItems,setOrderItems]=useState([]);
    

    
     //#region callbacks
    const filterButtons = [{name:"unsaved",clickHandler: fun1}, 
        {name:"Estimates",clickHandler:fun2}, 
        {name:"Bills" ,clickHandler:fun3},
        {name:"Not Paid",clickHandler:fun4}
    ];

    function fun1() {console.log("clicked unsaved");}
   function fun2() { console.log("clicked estimates");}
   function fun3() { console.log("clicked Bills");}
   function fun4() { console.log("clicked Not paid");}
//#endregion
  
useMemo(()=>{
    async function getResult(){
    try{
   const res=await axios.get("/server/sales/pending")
    setResult(res.data)
  
    }
    catch (error) {
        console.log(error)
    }
    
    }
    getResult();

    },[]);

 
useEffect(()=>{
    console.log("order Details:",orderDetails);
    console.log("order items:",orderItems);
    

},[orderDetails,orderItems])
    
    const items =["last week","last one month" ,"last one year" ,
        "last 5 years", "last 10 years" ,"custom"
    ];

 

    const headerConfig =[
        {id: "add",component:AddButton ,onClick:()=>{setWindow(["SalesInvoice"]) ,setEditSales(null)} },
        {id: "search",component:SearchBox, placeholder:"Invoice number"},
        {id: "print",component:PrintButton}
    ];
const searchConfigs =[
    {id: "Name",Component:SearchBox ,placeholder:"Customer Name"},
    {id: "Date",Component:Input, type:"date"},
    {id: "Amount",Component:SearchBox,placeholder:"Amount"},
    {id: "duration",Component:DropBox,message:"Duration", items:items ,name:"Duration"}
];



    return(


        <div className="SearchBarLayout">
            <SalesContext.Provider value={{bill: orderDetails,setBill: setOrderDetails,billItems: orderItems,setBillItems: setOrderItems}}>
            <Popup WindowsOpen={WindowsOpen} Window="SalesInvoice" >
                <SalesInvoice openWindow={setWindow} onClose={()=> setWindow([])} 
                invoice={editSales} 
                setaccount={setaccount}
                />
            </Popup>
             <Popup WindowsOpen={WindowsOpen} Window={`Search${accountType}`} >
                <SearchAccount accountType={accountType} onClose={()=> setWindow(["SalesInvoice"])} 
                    newAccount={setWindow}
                    parent="SalesInvoice"
                    context={SalesContext}
                    />
            </Popup>
            
            <Popup WindowsOpen={WindowsOpen} Window="SearchProduct" >
                <SearchProduct onClose={()=> setWindow(["SalesInvoice"])} context={SalesContext} />
            </Popup>
            </SalesContext.Provider>
            <Popup WindowsOpen={WindowsOpen} Window="AddAccount" >
                <AddAccount onClose={()=> setWindow(["SalesInvoice",`Search${accountType}`])} 
                accountType={accountType} 
                />
            </Popup>
            
           <div className="searchBar vertical">
         
            <SearchComponents components={searchConfigs} />
            
            </div> 
            <div className="content">
            
                <ContentHeader components={headerConfig} />

                <ContentFilter buttons = {filterButtons} />
                
                <div className="resultSection">
                {result&&(<ResultTable list={result} setClick={setEditSales} openWindow={()=>setWindow("SalesInvoice")}/>)}
                </div>
            
            </div>
            
        </div>
    );
}