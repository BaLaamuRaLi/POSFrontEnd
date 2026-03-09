import AddButton from "../Components/AddButton";
import ContentFilter from "../Components/ContentFilter";
import ContentHeader from "../Components/ContentHeader";
import PrintButton from "../Components/PrintButton";
import ResultTable from "../Components/ResultTable";
import SearchBox from "../Components/SearchBox";
import SearchComponents from "../Components/ComponentsExtractor";
import Input from "../Components/Input";
import { useState } from "react";
import PurchaseInvoice from "./PurchaseInvoice";
import Popup from "../Components/Popup";
import SearchProduct from "./SearchProduct";
import SearchAccount from "./SearchAccount";
import AddAccount from "./AddAccount";
import PurchaseItems from "./PurchaseItems";
import EditProfit from "./EditProfit";
import AddProduct from "./AddProduct";


export default function(){
    const [WindowsOpen, setWindow] = useState([]);
    const [editPurchase,setEditPurchase] =useState(null);
    const [accountType,setaccount] =useState(null);

    const filterButtons = [
        {name:"settled",clickHandler: fun1}, 
        {name:"pending",clickHandler:fun2} 
         ];

    function fun1() {console.log("clicked settled");}
   function fun2() { console.log("clicked pending");}
 

    const result = [
    { id: 1, client: "JRK", amount: 2000 },
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
    ];

    const items =["last week","last one month" ,"last one year" ,
        "last 5 years", "last 10 years" ,"custom"
    ];

     const headerConfig =[
            {id: "add",component:AddButton,onClick:()=>setWindow(["PurchaseInvoice"])},
            {id: "search",component:SearchBox, placeholder:"Invoice number"},
            {id: "print",component:PrintButton}
    ];

const searchConfigs =[
    {id: "Code",Component:SearchBox ,placeholder:"Supplier Code"},
    {id: "Name",Component:SearchBox, placeholder:'Supplier Name'},
    {id: "Date",Component:Input,type:"date"} 
];

const suppliers=[
        {id:"1",Name:"JRK",Address:"washington"},
        {id:"2",Name:"F&F",Address:"UAE"},
    ];

    return(
        <div className="SearchBarLayout">
            <Popup WindowsOpen={WindowsOpen} Window="PurchaseInvoice" >
                <PurchaseInvoice openWindow={setWindow} onClose={()=> setWindow([])} 
                invoice={editPurchase} 
                setaccount={setaccount}
                />
            </Popup>
            <Popup WindowsOpen={WindowsOpen} Window="SearchProduct" >
                <SearchProduct openWindow={setWindow} onClose={()=> setWindow(["PurchaseInvoice"])} 
                isPurchase={true}
                />
            </Popup>
            <Popup WindowsOpen={WindowsOpen} Window={`Search${accountType}`} >
                <SearchAccount accountType={accountType} onClose={()=> setWindow(["PurchaseInvoice"])} 
                accounts={suppliers}
                newAccount={setWindow}
                parent="PurchaseInvoice"
                />
            </Popup>
             <Popup WindowsOpen={WindowsOpen} Window="AddAccount" >
                <AddAccount onClose={()=> setWindow(["PurchaseInvoice",`Search${accountType}`])} 
                accountType={accountType} />
            </Popup>
            <Popup WindowsOpen={WindowsOpen} Window="EditPurchaseItems">
                <PurchaseItems onClose={()=> setWindow(["PurchaseInvoice"])}
                    openWindow={setWindow}/>
            </Popup>
            
            <Popup WindowsOpen={WindowsOpen} Window="EditProfit">
                <EditProfit onClose={()=> setWindow(["PurchaseInvoice","EditPurchaseItems"])}/>
            </Popup>
            <Popup WindowsOpen={WindowsOpen} Window="AddProduct">
                <AddProduct onClose={()=> setWindow(["PurchaseInvoice","SearchProduct"])}/>
            </Popup>

                <div className="searchBar vertical">
         
                <SearchComponents components={searchConfigs} />
                </div> 
                <div className="content">
                    <ContentHeader components={headerConfig} />
                    <ContentFilter buttons = {filterButtons} />
                      <div className="resultSection">
                           <ResultTable list={result} setClick={setEditPurchase} openWindow={()=>setWindow("PurchaseInvoice")}/>
                        </div>
  
                </div>
                    
        </div>
    );
}