import AddButton from "../Components/AddButton";
import ContentFilter from "../Components/ContentFilter";
import ContentHeader from "../Components/ContentHeader";
import PrintButton from "../Components/PrintButton";
import SearchBox from "../Components/SearchBox";
import SearchComponents from "../Components/ComponentsExtractor";
import Input from "../Components/Input";
import { useEffect, useState } from "react";
import PurchaseInvoice from "./PurchaseInvoice";
import Popup from "../Components/Popup";
import SearchProduct from "./SearchProduct";
import SearchAccount from "./SearchAccount";
import AddAccount from "./AddAccount";
import PurchaseItems from "./PurchaseItems";
import EditProfit from "./EditProfit";
import AddProduct from "./AddProduct";
import {PurchaseContext} from "../utils/PurchaseContext"
import TableMui from "../Components/TableMui";
import { api } from "../services/api";

export default function(){
    const [WindowsOpen, setWindow] = useState([]);
    const [editPurchase,setEditPurchase] =useState(null);
    const [accountType,setaccount] =useState(null);
    const[purchaseBill,setPurchaseBill]=useState({
        gstType:"SGST",
        supplier: '',
        invoiceNo: '',
        invoiceDate: '',
    });
    const [purchaseItems,setPurchaseItems]=useState([]);
    const [selectedItem,setSelectedItem]=useState({});
    const [checked,setChecked]=useState(new Set());

    const filterButtons = [
        {name:"settled",clickHandler: fun1}, 
        {name:"pending",clickHandler:fun2} 
         ];

    function fun1() {console.log("clicked settled");}
   function fun2() { console.log("clicked pending");}

 useEffect(()=>{
    console.log("Purchase Bill:",purchaseBill);
    console.log("Purchase items:",purchaseItems);
    

},[purchaseBill,purchaseItems]);

   const result = [
  { id: 1, client: "ClientC", amount: 2000, amount2: 2000, amount3: 2000, amount4: 2000, amount5: 2000, amount6: 2000, amount7: 2000, amount8: 2000, amount9: 2000, amount10: 2000, amount11: 2000, amount12: 2000, amount13: 2000, amount14: 2000, amount15: 2000, amount16: 2000, amount17: 2000, amount18: 2000, amount19: 2000, amount20: 2000 },
  { id: 2, client: "Client B", amount: 3500, amount2: 2000, amount3: 2000, amount4: 2000, amount5: 2000, amount6: 2000, amount7: 2000, amount8: 2000, amount9: 2000, amount10: 2000, amount11: 2000, amount12: 2000, amount13: 2000, amount14: 2000, amount15: 2000, amount16: 2000, amount17: 2000, amount18: 2000, amount19: 2000, amount20: 2000 },
  { id: 3, client: "Client A", amount: 2000, amount2: 2000, amount3: 2000, amount4: 2000, amount5: 2000, amount6: 2000, amount7: 2000, amount8: 2000, amount9: 2000, amount10: 2000, amount11: 2000, amount12: 2000, amount13: 2000, amount14: 2000, amount15: 2000, amount16: 2000, amount17: 2000, amount18: 2000, amount19: 2000, amount20: 2000 },
  { id: 4, client: "Client B", amount: 3500, amount2: 2000, amount3: 2000, amount4: 2000, amount5: 2000, amount6: 2000, amount7: 2000, amount8: 2000, amount9: 2000, amount10: 2000, amount11: 2000, amount12: 2000, amount13: 2000, amount14: 2000, amount15: 2000, amount16: 2000, amount17: 2000, amount18: 2000, amount19: 2000, amount20: 2000 },
  { id: 5, client: "Client B", amount: 3500, amount2: 2000, amount3: 2000, amount4: 2000, amount5: 2000, amount6: 2000, amount7: 2000, amount8: 2000, amount9: 2000, amount10: 2000, amount11: 2000, amount12: 2000, amount13: 2000, amount14: 2000, amount15: 2000, amount16: 2000, amount17: 2000, amount18: 2000, amount19: 2000, amount20: 2000 },
  { id: 6, client: "Client A", amount: 2000, amount2: 2000, amount3: 2000, amount4: 2000, amount5: 2000, amount6: 2000, amount7: 2000, amount8: 2000, amount9: 2000, amount10: 2000, amount11: 2000, amount12: 2000, amount13: 2000, amount14: 2000, amount15: 2000, amount16: 2000, amount17: 2000, amount18: 2000, amount19: 2000, amount20: 2000 },
  { id: 7, client: "Client B", amount: 3500, amount2: 2000, amount3: 2000, amount4: 2000, amount5: 2000, amount6: 2000, amount7: 2000, amount8: 2000, amount9: 2000, amount10: 2000, amount11: 2000, amount12: 2000, amount13: 2000, amount14: 2000, amount15: 2000, amount16: 2000, amount17: 2000, amount18: 2000, amount19: 2000, amount20: 2000 },
  { id: 8, client: "Client B", amount: 3500, amount2: 2000, amount3: 2000, amount4: 2000, amount5: 2000, amount6: 2000, amount7: 2000, amount8: 2000, amount9: 2000, amount10: 2000, amount11: 2000, amount12: 2000, amount13: 2000, amount14: 2000, amount15: 2000, amount16: 2000, amount17: 2000, amount18: 2000, amount19: 2000, amount20: 2000 },
  { id: 9, client: "Client A", amount: 2000, amount2: 2000, amount3: 2000, amount4: 2000, amount5: 2000, amount6: 2000, amount7: 2000, amount8: 2000, amount9: 2000, amount10: 2000, amount11: 2000, amount12: 2000, amount13: 2000, amount14: 2000, amount15: 2000, amount16: 2000, amount17: 2000, amount18: 2000, amount19: 2000, amount20: 2000 },
  { id: 10, client: "Client B", amount: 3500, amount2: 2000, amount3: 2000, amount4: 2000, amount5: 2000, amount6: 2000, amount7: 2000, amount8: 2000, amount9: 2000, amount10: 2000, amount11: 2000, amount12: 2000, amount13: 2000, amount14: 2000, amount15: 2000, amount16: 2000, amount17: 2000, amount18: 2000, amount19: 2000, amount20: 2000 }
];

    const items =["last week","last one month" ,"last one year" ,
        "last 5 years", "last 10 years" ,"custom"
    ];

async function handleAddPurchase(){
   
    try {
         const res=await api.createPurchase();
            console.log('res is ',res)
            const {purchaseID,billNo,date}=res;
            setPurchaseBill(prev=>({
                ...prev,
                purchaseID:purchaseID,
                billNo:billNo,
                date:date
            }));
    } catch (error) {
        throw error;
        
    }
}

     const headerConfig =[
            {id: "add",component:AddButton,onClick:()=>{setWindow(["PurchaseInvoice"]);handleAddPurchase()}},
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

const columns=[
    {field:"id",header:"Bill No"},
    {field:"client",header:"Supplier"},
    {field:"amount",header:"Amount"},
    {field:"amount2",header:"Amount"},
    {field:"amount3",header:"Amount"},
    {field:"amount4",header:"Amount"},
    {field:"amount5",header:"Amount"},
    {field:"amount6",header:"Amount"},
    {field:"amount7",header:"Amount"},
    {field:"amount8",header:"Amount"},
    {field:"amount9",header:"Amount"},
    {field:"amount10",header:"Amount"},
    {field:"amount11",header:"Amount"},
    {field:"amount12",header:"Amount"},
    {field:"amount13",header:"Amount"},
    {field:"amount14",header:"Amount"},
    {field:"amount15",header:"Amount"},
    {field:"amount16",header:"Amount"},
    {field:"amount17",header:"Amount"},
    {field:"amount18",header:"Amount"},
    {field:"amount19",header:"Amount"},
    {field:"amount20",header:"Amount"},
];

    return(
        <div className="SearchBarLayout">
        <PurchaseContext.Provider value={{bill: purchaseBill,setBill: setPurchaseBill,billItems: purchaseItems,setBillItems: setPurchaseItems,selectedItem,setSelectedItem}}>
            <Popup WindowsOpen={WindowsOpen} Window="PurchaseInvoice" >
                <PurchaseInvoice openWindow={setWindow} onClose={()=> setWindow([])} 
                invoice={editPurchase} 
                setaccount={setaccount}
                />
            </Popup>
            <Popup WindowsOpen={WindowsOpen} Window="SearchProduct" >
                <SearchProduct openWindow={setWindow} onClose={()=> setWindow(["PurchaseInvoice"])} 
                isPurchase={true} context={PurchaseContext}
                />
            </Popup>
            <Popup WindowsOpen={WindowsOpen} Window={`Search${accountType}`} >
                <SearchAccount accountType={accountType} onClose={()=> setWindow(["PurchaseInvoice"])} 
                accounts={suppliers}
                newAccount={setWindow}
                parent="PurchaseInvoice"
                context={PurchaseContext}
                />
            </Popup>
            
            <Popup WindowsOpen={WindowsOpen} Window="EditPurchaseItems">
                <PurchaseItems onClose={()=> setWindow(["PurchaseInvoice"])}
                    openWindow={setWindow}/>
            </Popup>
            
            <Popup WindowsOpen={WindowsOpen} Window="EditProfit">
                <EditProfit onClose={()=> setWindow(["PurchaseInvoice","EditPurchaseItems"])}/>
            </Popup>
        </PurchaseContext.Provider>
            <Popup WindowsOpen={WindowsOpen} Window="AddProduct">
                <AddProduct onClose={()=> setWindow(["PurchaseInvoice","SearchProduct"])}/>
            </Popup>
            <Popup WindowsOpen={WindowsOpen} Window="AddAccount" >
                <AddAccount onClose={()=> setWindow(["PurchaseInvoice",`Search${accountType}`])} 
                accountType={accountType} />
            </Popup>

                <div className="searchBar vertical">
         
                <SearchComponents components={searchConfigs} />
                </div> 
                <div className="content">
                    <ContentHeader components={headerConfig} />
                    <ContentFilter buttons = {filterButtons} />
                    <div className="resultSection">
                        <TableMui list={result} columns={columns} selectedIds={checked} setSelectedIds={setChecked} />       
                    </div>
  
                </div>
                    
        </div>
    );
}