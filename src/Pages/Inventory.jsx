import DropBox from "../Components/DropBox";
import SearchBox from "../Components/SearchBox";
import SearchComponents from "../Components/ComponentsExtractor";
import ContentHeader from "../Components/ContentHeader";
import AddButton from "../Components/AddButton";
import PrintButton from "../Components/PrintButton";
import ContentFilter from "../Components/ContentFilter";
import ResultTable from "../Components/ResultTable";



export default function(){

 const items =["last week","last one month" ,"last one year" ,
        "last 5 years", "last 10 years" ,"custom"
    ];

const searchConfigs =[
    {id: "type",Component:SearchBox ,placeholder:"type: pipe,bulb"},
    {id: "size",Component:SearchBox, placeholder:'size: 3",9W'},
    {id: "company",Component:SearchBox,placeholder:"company: Goldmedal"},
    {id: "industry",Component:SearchBox,placeholder:"industry: electrical"},
    {id: "batch",Component:SearchBox,placeholder:"Batch no"},
    {id: "duration",Component:DropBox,message:"Duration", items:items ,name:"Duration"}
];

    const headerConfig =[
                {id: "add",component:AddButton},
                {id: "search",component:SearchBox, placeholder:"Product Code"},
                {id: "print",component:PrintButton}
        ];

//#region filterButtons
 const filterButtons = [
        {name:"out of stock",clickHandler: fun1}, 
        {name:"low stock",clickHandler:fun2}, 
        {name:"No barcode",clickHandler:fun3} 
         ];
  function fun1() {console.log("clicked out of stock");}
   function fun2() { console.log("clicked low stock");}
   function fun3() { console.log("clicked No barcode");}
//#endregion
   

     const result = [
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
    ];
return(
        <div className="SearchBarLayout">
            <div className="searchBar vertical">
            <SearchComponents components={searchConfigs} />
            </div>
            <div className="content">
            <ContentHeader components={headerConfig} />
              <ContentFilter buttons = {filterButtons} />
                <ResultTable invoices={result}/>
            </div>
            
        </div>
    );
}