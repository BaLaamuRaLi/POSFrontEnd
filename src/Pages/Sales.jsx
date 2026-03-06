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



export default function(){
    const [WindowsOpen, setWindow] = useState([]);

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
    
    const result = useMemo(()=>[
    { id: 1, client: "Shibu", amount: 2000 },
    { id: 2, client: "Client B", amount: 3500 },
    { id: 3, client: "Client A", amount: 2000 },
    { id: 4, client: "Client B", amount: 3500 },
    { id: 5, client: "Client B", amount: 3500 },
    { id: 6, client: "Client A", amount: 2000 },
    { id: 7, client: "Client B", amount: 3500 },
    { id: 8, client: "Client B", amount: 3500 },
    { id: 9, client: "Client A", amount: 2000 },
    { id: 10, client: "Client B", amount: 3500 },
    { id: 11, client: "Client B", amount: 3500 },
    { id: 12, client: "Client A", amount: 2000 },
    { id: 13, client: "Client B", amount: 3500 },
    { id: 14, client: "Client B", amount: 3500 },
    { id: 15, client: "Client A", amount: 2000 },
    { id: 16, client: "Client B", amount: 3500 },
    { id: 17, client: "Client B", amount: 3500 },
    { id: 18, client: "Client A", amount: 2000 },
    { id: 19, client: "Client B", amount: 3500 },
    ],[]);
    const items =["last week","last one month" ,"last one year" ,
        "last 5 years", "last 10 years" ,"custom"
    ];

 

    const headerConfig =[
        {id: "add",component:AddButton ,onClick:()=>setWindow("SalesInvoice") },
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

    const agents=[
        {id:"1",Name:"Mathew",Address:"london"},
        {id:"2",Name:"shahi",Address:"Delhi"},
    ];

    return(


        <div className="SearchBarLayout">
           
            <Popup WindowsOpen={WindowsOpen} Window="SalesInvoice" >
                <SalesInvoice openWindow={setWindow} onClose={()=> setWindow([])} />
            </Popup>
             <Popup WindowsOpen={WindowsOpen} Window="SearchCustomer" >
                <SearchAccount accountType={"Customer"} onClose={()=> setWindow(["SalesInvoice"])} 
                    accounts={customers}
                    />
            </Popup>
            <Popup WindowsOpen={WindowsOpen} Window="SearchAgent" >
                <SearchAccount accountType={"Agent"} onClose={()=> setWindow(["SalesInvoice"])} 
                    accounts={agents}
                    />
            </Popup>
              <Popup WindowsOpen={WindowsOpen} Window="SearchProduct" >
                <SearchProduct onClose={()=> setWindow(["SalesInvoice"])} />
            </Popup>
            
            
           <div className="searchBar vertical">
         
            <SearchComponents components={searchConfigs} />
            
            </div> 
            <div className="content">
            
                <ContentHeader components={headerConfig} />

                <ContentFilter buttons = {filterButtons} />
                
                <div className="resultSection">
                <ResultTable list={result}/>
                </div>
            
            </div>
            
        </div>
    );
}