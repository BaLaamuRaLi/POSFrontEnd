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
import { useMemo, useState } from "react";
import SearchAccount from "./SearchAccount";
import SearchProduct from "./SearchProduct";
import AddAccount from "./AddAccount";
import axios from "axios";




export default function(){
    const [WindowsOpen, setWindow] = useState([]);
    const [editSales,setEditSales] =useState(null);
    const [accountType,setaccount] =useState(null);
    const [result,setResult] =useState(null)

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
  
useMemo(async ()=>{
    try{
   const res=await axios.get("/server/sales/pending")
    setResult(res.data)
    console.log('result inside await:',result)
   
    }
    catch (error) {
        console.log(error)
    }
    
    },[]);

    console.log("result:", result)

    
    const items =["last week","last one month" ,"last one year" ,
        "last 5 years", "last 10 years" ,"custom"
    ];

 

    const headerConfig =[
        {id: "add",component:AddButton ,onClick:()=>setWindow(["SalesInvoice"]) },
        {id: "search",component:SearchBox, placeholder:"Invoice number"},
        {id: "print",component:PrintButton}
    ];
const searchConfigs =[
    {id: "Name",Component:SearchBox ,placeholder:"Customer Name"},
    {id: "Date",Component:Input, type:"date"},
    {id: "Amount",Component:SearchBox,placeholder:"Amount"},
    {id: "duration",Component:DropBox,message:"Duration", items:items ,name:"Duration"}
];

    const customers=[
        {id:"1",Name:"john",Address:"washington"},
        {id:"2",Name:"Biju",Address:"UAE"},
    ];


    return(


        <div className="SearchBarLayout">
       
            <Popup WindowsOpen={WindowsOpen} Window="SalesInvoice" >
                <SalesInvoice openWindow={setWindow} onClose={()=> setWindow([])} 
                invoice={editSales} 
                setaccount={setaccount}
                />
            </Popup>
             <Popup WindowsOpen={WindowsOpen} Window={`Search${accountType}`} >
                <SearchAccount accountType={accountType} onClose={()=> setWindow(["SalesInvoice"])} 
                    accounts={customers}
                    newAccount={setWindow}
                    parent="SalesInvoice"
                    />
            </Popup>
            
            <Popup WindowsOpen={WindowsOpen} Window="SearchProduct" >
                <SearchProduct onClose={()=> setWindow(["SalesInvoice"])} />
            </Popup>

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